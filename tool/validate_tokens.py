"""Dependency-free semantic validation for Kai brand token sources."""

from __future__ import annotations

import re
from typing import Any

from generate_product_tokens import parse_color


VERSION = re.compile(r"^\d+\.\d+\.\d+$")
PLATFORM_PROFILE_IDS = (
    "appleMobile",
    "androidMobile",
    "macDesktop",
    "windowsDesktop",
    "linuxDesktop",
)
TYPE_STYLE_IDS = (
    "displayLarge",
    "pageTitle",
    "sectionTitle",
    "title",
    "body",
    "bodySecondary",
    "label",
    "caption",
    "captionSmall",
)
COMPONENT_TYPE_STYLE_IDS = ("listTitle", "inputText", "gridTitle")
COMPONENT_MAPPING_COMPONENT_IDS = (
    "surfaces",
    "buttons",
    "inputs",
    "selection",
    "navigation",
    "list-rows",
    "feedback",
    "dialogs",
    "menus",
    "icons",
    "app-bars",
    "data-display",
)
PROFILE_METRIC_IDS = (
    "minimumInteractiveTarget",
    "controlHeight",
    "compactControlHeight",
    "listRowSingle",
    "listRowDouble",
    "pageGutter",
    "sectionGap",
    "controlGap",
    "iconTextGap",
)


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


def relative_luminance(value: str) -> float:
    red, green, blue, _ = parse_color(value)
    channels = []
    for channel in (red, green, blue):
        normalized = channel / 255
        channels.append(
            normalized / 12.92
            if normalized <= 0.04045
            else ((normalized + 0.055) / 1.055) ** 2.4
        )
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722


def contrast_ratio(foreground: str, background: str) -> float:
    lighter, darker = sorted(
        (relative_luminance(foreground), relative_luminance(background)),
        reverse=True,
    )
    return (lighter + 0.05) / (darker + 0.05)


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


def validate_typography_roles(typography: dict) -> None:
    require_keys(
        typography,
        ("fontPolicy", "weights", "semanticRoles", "componentMappings", "componentRoles"),
        "primitives.typography",
    )
    roles = typography["semanticRoles"]
    if not isinstance(roles, dict) or not roles:
        raise TokenValidationError("primitives.typography.semanticRoles: expected object")
    for role_id, role in roles.items():
        path = f"primitives.typography.semanticRoles.{role_id}"
        require_keys(role, ("description", "intent", "allowedWeights"), path)
        if not isinstance(role["description"], str) or not role["description"].strip():
            raise TokenValidationError(f"{path}.description: expected text")
        if not isinstance(role["intent"], str) or not role["intent"].strip():
            raise TokenValidationError(f"{path}.intent: expected text")
        weights = role["allowedWeights"]
        if not isinstance(weights, list) or not weights or any(
            weight not in (400, 500, 600) for weight in weights
        ):
            raise TokenValidationError(f"{path}.allowedWeights: expected 400, 500, or 600")
        if "baseRole" in role and role["baseRole"] not in roles:
            raise TokenValidationError(f"{path}.baseRole: unknown role {role['baseRole']}")
        if role_id not in TYPE_STYLE_IDS and not role.get("baseRole"):
            raise TokenValidationError(f"{path}: component roles require baseRole")
        if role_id not in TYPE_STYLE_IDS and not role.get("rationale"):
            raise TokenValidationError(f"{path}.rationale: required for component roles")

    mappings = typography["componentMappings"]
    if not isinstance(mappings, dict) or not mappings:
        raise TokenValidationError("primitives.typography.componentMappings: expected object")
    unknown_components = set(mappings) - set(COMPONENT_MAPPING_COMPONENT_IDS)
    if unknown_components:
        raise TokenValidationError(
            "primitives.typography.componentMappings: unknown components "
            + ", ".join(sorted(unknown_components))
        )
    for component_id, slots in mappings.items():
        if not isinstance(slots, dict) or not slots:
            raise TokenValidationError(
                f"primitives.typography.componentMappings.{component_id}: expected object"
            )
        for slot_id, mapping in slots.items():
            path = f"primitives.typography.componentMappings.{component_id}.{slot_id}"
            require_keys(mapping, ("role",), path)
            if mapping["role"] not in roles:
                raise TokenValidationError(f"{path}.role: unknown role {mapping['role']}")
            if "profileOverrides" in mapping:
                overrides = mapping["profileOverrides"]
                if not isinstance(overrides, dict):
                    raise TokenValidationError(f"{path}.profileOverrides: expected object")
                if not isinstance(mapping.get("rationale"), str) or not mapping["rationale"].strip():
                    raise TokenValidationError(f"{path}.rationale: required when profileOverrides is present")
                for profile_id, style in overrides.items():
                    if profile_id not in ("mobile", "desktop"):
                        raise TokenValidationError(f"{path}.profileOverrides: unknown profile {profile_id}")
                    validate_text_style(
                        style,
                        f"{path}.profileOverrides.{profile_id}",
                        roles[mapping["role"]]["allowedWeights"],
                    )

    component_roles = typography["componentRoles"]
    if not isinstance(component_roles, dict) or not component_roles:
        raise TokenValidationError("primitives.typography.componentRoles: expected object")
    for component, style_id in component_roles.items():
        if style_id not in roles:
            raise TokenValidationError(
                f"primitives.typography.componentRoles.{component}: unknown role {style_id}"
            )


def validate_text_style(
    style: dict,
    path: str,
    allowed_weights: list[int] | None = None,
) -> None:
    require_keys(style, ("fontSize", "lineHeight", "fontWeight", "letterSpacing"), path)
    if style["fontSize"] <= 0 or style["lineHeight"] < style["fontSize"]:
        raise TokenValidationError(f"{path}: lineHeight must be >= positive fontSize")
    if style["fontWeight"] not in (400, 500, 600):
        raise TokenValidationError(f"{path}.fontWeight: expected 400, 500, or 600")
    if allowed_weights is not None and style["fontWeight"] not in allowed_weights:
        allowed = ", ".join(str(weight) for weight in allowed_weights)
        raise TokenValidationError(f"{path}.fontWeight: expected one of {allowed}")


def validate_platform_profiles(primitives: dict) -> None:
    typography = primitives.get("typography", {})
    validate_typography_roles(typography)

    profiles = primitives.get("platformProfiles", {})
    require_keys(profiles, PLATFORM_PROFILE_IDS, "primitives.platformProfiles")
    for profile_id in PLATFORM_PROFILE_IDS:
        profile = profiles[profile_id]
        path = f"primitives.platformProfiles.{profile_id}"
        require_keys(
            profile,
            (
                "label",
                "platforms",
                "unit",
                "inputMode",
                "fontFamily",
                "scaling",
                "reference",
                "typeScale",
                "metrics",
            ),
            path,
        )
        if not isinstance(profile["platforms"], list) or not profile["platforms"]:
            raise TokenValidationError(f"{path}.platforms: expected non-empty list")
        reference = profile["reference"]
        require_keys(reference, ("name", "url"), f"{path}.reference")
        if not isinstance(reference["url"], str) or not reference["url"].startswith("https://"):
            raise TokenValidationError(f"{path}.reference.url: expected https URL")

        type_scale = profile["typeScale"]
        require_keys(type_scale, TYPE_STYLE_IDS, f"{path}.typeScale")
        for style_id in TYPE_STYLE_IDS:
            style = type_scale[style_id]
            style_path = f"{path}.typeScale.{style_id}"
            require_keys(
                style,
                ("fontSize", "lineHeight", "fontWeight", "letterSpacing"),
                style_path,
            )
            if style["fontSize"] <= 0 or style["lineHeight"] < style["fontSize"]:
                raise TokenValidationError(
                    f"{style_path}: lineHeight must be >= positive fontSize"
                )
            if style["fontWeight"] not in (400, 500, 600):
                raise TokenValidationError(
                    f"{style_path}.fontWeight: expected 400, 500, or 600"
                )

        validate_number_scale(profile["metrics"], PROFILE_METRIC_IDS, f"{path}.metrics")
        metrics = profile["metrics"]
        if metrics["compactControlHeight"] > metrics["controlHeight"]:
            raise TokenValidationError(
                f"{path}.metrics.compactControlHeight: cannot exceed controlHeight"
            )
        if profile["inputMode"] == "touch" and (
            metrics["controlHeight"] < metrics["minimumInteractiveTarget"]
        ):
            raise TokenValidationError(
                f"{path}.metrics.controlHeight: touch controls must meet the target"
            )
        if metrics["listRowDouble"] <= metrics["listRowSingle"]:
            raise TokenValidationError(
                f"{path}.metrics.listRowDouble: must exceed listRowSingle"
            )

    component_profiles = primitives.get("componentProfiles", {})
    require_keys(component_profiles, ("mobile", "desktop"), "primitives.componentProfiles")
    for profile_id in ("mobile", "desktop"):
        profile = component_profiles[profile_id]
        path = f"primitives.componentProfiles.{profile_id}"
        require_keys(
            profile,
            (
                "label",
                "platforms",
                "unit",
                "inputMode",
                "fontFamily",
                "scaling",
                "reference",
                "typeScale",
                "metrics",
            ),
            path,
        )
        component_style_ids = TYPE_STYLE_IDS + COMPONENT_TYPE_STYLE_IDS
        require_keys(profile["typeScale"], component_style_ids, f"{path}.typeScale")
        for style_id in component_style_ids:
            style = profile["typeScale"][style_id]
            style_path = f"{path}.typeScale.{style_id}"
            validate_text_style(
                style,
                style_path,
                typography["semanticRoles"][style_id]["allowedWeights"],
            )
        validate_number_scale(profile["metrics"], PROFILE_METRIC_IDS, f"{path}.metrics")
        metrics = profile["metrics"]
        if metrics["compactControlHeight"] > metrics["controlHeight"]:
            raise TokenValidationError(
                f"{path}.metrics.compactControlHeight: cannot exceed controlHeight"
            )
        if metrics["listRowDouble"] <= metrics["listRowSingle"]:
            raise TokenValidationError(
                f"{path}.metrics.listRowDouble: must exceed listRowSingle"
            )

    if component_profiles["mobile"]["metrics"]["minimumInteractiveTarget"] < 48:
        raise TokenValidationError("mobile component target must satisfy Android 48dp")
    if component_profiles["mobile"]["typeScale"]["body"]["fontSize"] < 17:
        raise TokenValidationError("mobile component body must satisfy iOS 17pt")

    if profiles["appleMobile"]["typeScale"]["body"]["fontSize"] < 17:
        raise TokenValidationError("appleMobile body must follow the 17pt iOS default")
    if profiles["appleMobile"]["metrics"]["minimumInteractiveTarget"] < 44:
        raise TokenValidationError("appleMobile target must be at least 44pt")
    if profiles["androidMobile"]["metrics"]["minimumInteractiveTarget"] < 48:
        raise TokenValidationError("androidMobile target must be at least 48dp")


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
    iconography = primitives.get("iconography", {})
    require_keys(iconography, ("policy", "sizes", "opticalStroke"), "primitives.iconography")
    validate_number_scale(
        iconography["sizes"],
        ("compact", "regular", "large", "display"),
        "primitives.iconography.sizes",
    )
    if not (
        iconography["sizes"]["compact"]
        < iconography["sizes"]["regular"]
        < iconography["sizes"]["large"]
        < iconography["sizes"]["display"]
    ):
        raise TokenValidationError("primitives.iconography.sizes: expected ascending scale")
    validate_platform_profiles(primitives)
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
            "contentWidth",
            "splitView",
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
    content_width = primitives["layoutMetrics"]["contentWidth"]
    validate_number_scale(
        content_width,
        ("reading", "form", "standard", "wide"),
        "primitives.layoutMetrics.contentWidth",
    )
    if not (
        content_width["reading"]
        <= content_width["form"]
        <= content_width["standard"]
        <= content_width["wide"]
    ):
        raise TokenValidationError("layoutMetrics.contentWidth: expected ascending scale")
    require_keys(
        primitives.get("componentMetrics", {}),
        ("dialog", "sheet", "menu", "table"),
        "primitives.componentMetrics",
    )
    status = primitives.get("derivedAlphas", {}).get("status", {})
    require_keys(status, ("success", "warning", "error", "info"), "primitives.derivedAlphas.status")
    for role in ("success", "warning", "error", "info"):
        require_keys(status[role], ("light", "dark"), f"primitives.derivedAlphas.status.{role}")
        if contrast_ratio(status[role]["light"], "#FFFFFF") < 4.5:
            raise TokenValidationError(f"status.{role}.light: contrast must be at least 4.5:1")
        if contrast_ratio(status[role]["dark"], "#0D0D0F") < 4.5:
            raise TokenValidationError(f"status.{role}.dark: contrast must be at least 4.5:1")

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
