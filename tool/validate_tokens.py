"""Dependency-free semantic validation for Kai brand token sources."""

from __future__ import annotations

import re
from typing import Any

from generate_product_tokens import parse_color


VERSION = re.compile(r"^\d+\.\d+\.\d+$")


class TokenValidationError(ValueError):
    pass


def require_keys(value: dict[str, Any], keys: tuple[str, ...], path: str) -> None:
    missing = [key for key in keys if key not in value]
    if missing:
        raise TokenValidationError(f"{path}: missing {', '.join(missing)}")


def validate_number_scale(value: dict[str, Any], keys: tuple[str, ...], path: str) -> None:
    require_keys(value, keys, path)
    for key in keys:
        item = value[key]
        if not isinstance(item, (int, float)) or item < 0:
            raise TokenValidationError(f"{path}.{key}: expected non-negative number")


def validate_color(value: str, path: str) -> None:
    try:
        _, _, _, alpha = parse_color(value)
    except (TypeError, ValueError) as error:
        raise TokenValidationError(f"{path}: {error}") from error
    if not 0 <= alpha <= 1:
        raise TokenValidationError(f"{path}: alpha must be between 0 and 1")


def walk_colors(value: Any, path: str = "$") -> None:
    if isinstance(value, dict):
        for key, item in value.items():
            child = f"{path}.{key}"
            if isinstance(item, str) and (
                item.startswith("#")
                or item.startswith("black@")
                or item.startswith("white@")
                or item == "transparent"
            ):
                validate_color(item, child)
            else:
                walk_colors(item, child)
    elif isinstance(value, list):
        for index, item in enumerate(value):
            walk_colors(item, f"{path}[{index}]")


def validate_product_tokens(product_tokens: dict[str, dict]) -> None:
    for product_id in ("kaiting", "kaijuan", "kaigua"):
        if product_id not in product_tokens:
            raise TokenValidationError(f"productTokens: missing {product_id}")
        source = product_tokens[product_id]
        path = f"productTokens.{product_id}"
        require_keys(source, ("product", "productSpecVersion", "tokens"), path)
        if source["product"] != product_id:
            raise TokenValidationError(f"{path}.product: expected {product_id}")
        if not VERSION.fullmatch(source["productSpecVersion"]):
            raise TokenValidationError(f"{path}.productSpecVersion: invalid semantic version")
        if not isinstance(source["tokens"], dict):
            raise TokenValidationError(f"{path}.tokens: expected object")
        for token_name, token in source["tokens"].items():
            token_path = f"{path}.tokens.{token_name}"
            require_keys(token, ("type", "value", "description"), token_path)
            token_type = token["type"]
            value = token["value"]
            if token_type not in ("color", "dimension", "number", "duration"):
                raise TokenValidationError(f"{token_path}.type: unsupported {token_type}")
            if token_type == "color":
                validate_color(value, f"{token_path}.value")
            elif not isinstance(value, (int, float)) or value < 0:
                raise TokenValidationError(f"{token_path}.value: expected non-negative number")
            if not isinstance(token["description"], str) or not token["description"].strip():
                raise TokenValidationError(f"{token_path}.description: expected text")


def validate(
    primitives: dict,
    skins: dict,
    accents: dict,
    product_tokens: dict[str, dict],
) -> None:
    for name, data in (
        ("primitives", primitives),
        ("skins", skins),
        ("accents", accents),
    ):
        version = data.get("specVersion")
        if not isinstance(version, str) or not VERSION.fullmatch(version):
            raise TokenValidationError(f"{name}.specVersion: invalid semantic version")

    validate_number_scale(
        primitives.get("spacing", {}),
        ("x1", "x2", "x3", "x4", "x6", "x8"),
        "primitives.spacing",
    )
    validate_number_scale(
        primitives.get("radii", {}),
        ("control", "card", "menu", "sheet", "dialog", "pill", "checkbox", "tooltip"),
        "primitives.radii",
    )
    require_keys(
        primitives.get("basePalette", {}),
        ("mainBackground", "sideBackground", "primary"),
        "primitives.basePalette",
    )
    require_keys(
        primitives.get("layoutMetrics", {}),
        (
            "pageGutter",
            "contentBottomPadding",
            "sidebarWidth",
            "titlebarInset",
            "desktopWindow",
        ),
        "primitives.layoutMetrics",
    )
    desktop_window = primitives["layoutMetrics"]["desktopWindow"]
    require_keys(
        desktop_window,
        ("defaultWidth", "defaultHeight", "minWidth", "minHeight"),
        "primitives.layoutMetrics.desktopWindow",
    )
    if desktop_window["defaultWidth"] < desktop_window["minWidth"]:
        raise TokenValidationError("desktopWindow.defaultWidth must be >= minWidth")
    if desktop_window["defaultHeight"] < desktop_window["minHeight"]:
        raise TokenValidationError("desktopWindow.defaultHeight must be >= minHeight")

    presets = skins.get("presets")
    if not isinstance(presets, list) or not presets:
        raise TokenValidationError("skins.presets: expected non-empty list")
    skin_ids: set[str] = set()
    required_skin = (
        "id",
        "name",
        "description",
        "brightness",
        "canvas",
        "surface",
        "elevated",
        "overlay",
        "glass",
        "effects",
    )
    required_glass = (
        "canvasHighlight",
        "surface",
        "strongSurface",
        "border",
        "innerHighlight",
        "shadow",
        "primaryText",
        "secondaryText",
        "mutedText",
        "blur",
        "strongBlur",
    )
    for index, preset in enumerate(presets):
        path = f"skins.presets[{index}]"
        require_keys(preset, required_skin, path)
        if preset["id"] in skin_ids:
            raise TokenValidationError(f"{path}.id: duplicate {preset['id']}")
        skin_ids.add(preset["id"])
        if preset["brightness"] not in ("light", "dark"):
            raise TokenValidationError(f"{path}.brightness: expected light or dark")
        require_keys(preset["glass"], required_glass, f"{path}.glass")

    products = accents.get("products")
    if not isinstance(products, dict) or not products:
        raise TokenValidationError("accents.products: expected non-empty object")
    for product_id, product in products.items():
        path = f"accents.products.{product_id}"
        require_keys(product, ("displayName", "default", "presets"), path)
        presets = product["presets"]
        if not isinstance(presets, list) or not presets:
            raise TokenValidationError(f"{path}.presets: expected non-empty list")
        ids = [preset.get("id") for preset in presets]
        if len(ids) != len(set(ids)):
            raise TokenValidationError(f"{path}.presets: duplicate id")
        if product["default"] not in ids:
            raise TokenValidationError(f"{path}.default: not found in presets")
        for index, preset in enumerate(presets):
            require_keys(preset, ("id", "name", "accent"), f"{path}.presets[{index}]")

    walk_colors({"skins": skins, "accents": accents, "primitives": primitives})
    validate_product_tokens(product_tokens)
