#!/usr/bin/env python3
"""Render product-consumable token source.

This module contains format renderers used by tool/kai_design.py. The direct
cross-repository CLI remains temporarily for compatibility; new workflows
must use `python3 tool/kai_design.py build|check|sync`.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path


REPO = Path(__file__).resolve().parent.parent
TOKENS = REPO / "tokens"
PRODUCTS = REPO / "products"


def load_product_tokens() -> dict[str, dict]:
    return {
        product: json.loads((PRODUCTS / product / "tokens.json").read_text(encoding="utf-8"))
        for product in ("kaiting", "kaijuan", "kaigua")
    }


def load_tokens() -> tuple[dict, dict, dict, dict[str, dict], str]:
    primitives = json.loads((TOKENS / "primitives.json").read_text(encoding="utf-8"))
    skins = json.loads((TOKENS / "skins.json").read_text(encoding="utf-8"))
    accents = json.loads((TOKENS / "accents.json").read_text(encoding="utf-8"))
    product_tokens = load_product_tokens()
    canonical = json.dumps(
        {
            "primitives": primitives,
            "skins": skins,
            "accents": accents,
            "productTokens": product_tokens,
        },
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    ).encode()
    return primitives, skins, accents, product_tokens, hashlib.sha256(canonical).hexdigest()


def camel(value: str) -> str:
    parts = re.split(r"[^a-zA-Z0-9]+", value)
    first, *rest = [part for part in parts if part]
    return first[0].lower() + first[1:] + "".join(
        part[0].upper() + part[1:] for part in rest
    )


def dart_number(value: int | float) -> str:
    return f"{value}.0" if isinstance(value, int) else str(value)


def parse_color(value: str) -> tuple[int, int, int, float]:
    if value == "transparent":
        return 0, 0, 0, 0
    base, _, alpha_text = value.partition("@")
    alpha = float(alpha_text) if alpha_text else 1.0
    if base == "black":
        return 0, 0, 0, alpha
    if base == "white":
        return 255, 255, 255, alpha
    if not re.fullmatch(r"#[0-9A-Fa-f]{6}", base):
        raise ValueError(f"unsupported color token: {value}")
    return (
        int(base[1:3], 16),
        int(base[3:5], 16),
        int(base[5:7], 16),
        alpha,
    )


def dart_color(value: str) -> str:
    red, green, blue, alpha = parse_color(value)
    alpha_byte = int(alpha * 255 + 0.5)
    return f"Color(0x{alpha_byte:02X}{red:02X}{green:02X}{blue:02X})"


def css_color(value: str) -> str:
    red, green, blue, alpha = parse_color(value)
    if alpha == 0:
        return "transparent"
    if alpha == 1:
        return f"#{red:02x}{green:02x}{blue:02x}"
    return f"rgb({red} {green} {blue} / {alpha:g})"


def render_dart(
    product: str,
    primitives: dict,
    skins: dict,
    accents: dict,
    product_tokens: dict[str, dict],
    digest: str,
) -> str:
    base_palette = primitives["basePalette"]
    spacing = primitives["spacing"]
    radii = primitives["radii"]
    layout = primitives["layoutMetrics"]
    typography = primitives["typography"]
    product_accents = accents["products"][product]
    status = primitives["derivedAlphas"]["status"]

    lines = [
        "// GENERATED FILE — DO NOT EDIT.",
        "// Source: kai-brand-design/tokens/*.json",
        f"// specVersion: {primitives['specVersion']} · sha256: {digest}",
        "",
        "import 'package:flutter/material.dart';",
        "",
        f"const kaiBrandSpecVersion = '{primitives['specVersion']}';",
        f"const kaiBrandTokenDigest = '{digest}';",
        "",
        "abstract final class KaiBrandBasePalette {",
        f"  static const mainBackground = {dart_color(base_palette['mainBackground'])};",
        f"  static const sideBackground = {dart_color(base_palette['sideBackground'])};",
        f"  static const primary = {dart_color(base_palette['primary'])};",
        "}",
        "",
        "abstract final class KaiBrandSpacing {",
    ]
    for key in ("x1", "x2", "x3", "x4", "x6", "x8"):
        lines.append(f"  static const double {key} = {dart_number(spacing[key])};")
    lines += ["}", "", "abstract final class KaiBrandRadii {"]
    for key in ("control", "card", "menu", "sheet", "dialog", "pill", "checkbox", "tooltip"):
        lines.append(f"  static const double {key} = {dart_number(radii[key])};")
    lines += [
        "}",
        "",
        "abstract final class KaiBrandLayout {",
        f"  static const double compactGutter = {dart_number(layout['pageGutter']['compact'])};",
        f"  static const double mediumGutter = {dart_number(layout['pageGutter']['medium'])};",
        f"  static const double wideGutter = {dart_number(layout['pageGutter']['wide'])};",
        f"  static const double mobileBottomPadding = {dart_number(layout['contentBottomPadding']['mobileShell'])};",
        f"  static const double desktopBottomPadding = {dart_number(layout['contentBottomPadding']['desktop'])};",
        f"  static const double mediumSidebarWidth = {dart_number(layout['sidebarWidth']['medium'])};",
        f"  static const double wideSidebarWidth = {dart_number(layout['sidebarWidth']['wide'])};",
        f"  static const double macOSTitlebarInset = {dart_number(layout['titlebarInset']['macOS'])};",
        f"  static const double windowsTitlebarInset = {dart_number(layout['titlebarInset']['windows'])};",
        f"  static const double desktopBreakpoint = 1100.0;",
        f"  static const double mobileWideBreakpoint = 1000.0;",
        f"  static const double mobileShellWidth = 820.0;",
        f"  static const double compactWidth = 600.0;",
        f"  static const double compactHeight = 600.0;",
        f"  static const double compactPageTitle = {dart_number(typography['sizes']['pageTitle'][0])};",
        f"  static const double regularPageTitle = {dart_number(typography['sizes']['pageTitle'][1])};",
        f"  static const double defaultWindowWidth = {dart_number(layout['desktopWindow']['defaultWidth'])};",
        f"  static const double defaultWindowHeight = {dart_number(layout['desktopWindow']['defaultHeight'])};",
        f"  static const double minWindowWidth = {dart_number(layout['desktopWindow']['minWidth'])};",
        f"  static const double minWindowHeight = {dart_number(layout['desktopWindow']['minHeight'])};",
        "}",
        "",
        "abstract final class KaiBrandStatusColors {",
        f"  static const warningLight = {dart_color(status['warning']['light'])};",
        f"  static const warningDark = {dart_color(status['warning']['dark'])};",
        "}",
    ]

    for skin in skins["presets"]:
        class_name = f"KaiBrand{camel(skin['id'])[0].upper() + camel(skin['id'])[1:]}Skin"
        lines += ["", f"abstract final class {class_name} {{"]
        for key in ("canvas", "surface", "elevated", "overlay"):
            lines.append(f"  static const {key} = {dart_color(skin[key])};")
        for key, value in skin["glass"].items():
            name = f"glass{key[0].upper()}{key[1:]}"
            if isinstance(value, str):
                lines.append(f"  static const {name} = {dart_color(value)};")
            else:
                lines.append(f"  static const double {name} = {dart_number(value)};")
        for key, value in skin["effects"].items():
            name = f"effect{key[0].upper()}{key[1:]}"
            if key in ("motionDurationS", "paletteTransitionMs"):
                lines.append(f"  static const int {name} = {value};")
            else:
                lines.append(f"  static const double {name} = {dart_number(value)};")
        lines.append("}")

    lines += [
        "",
        "abstract final class KaiProductAccents {",
        f"  static const defaultId = '{product_accents['default']}';",
    ]
    for preset in product_accents["presets"]:
        name = camel(preset["id"])
        lines.append(f"  static const {name}Id = '{preset['id']}';")
        lines.append(f"  static const {name}Label = '{preset['name']}';")
        lines.append(f"  static const {name} = {dart_color(preset['accent'])};")
        if "hover" in preset:
            lines.append(f"  static const {name}Hover = {dart_color(preset['hover'])};")
        if "pressed" in preset:
            lines.append(f"  static const {name}Pressed = {dart_color(preset['pressed'])};")
    lines += ["}", "", "abstract final class KaiProductTokens {"]
    for path, token in product_tokens[product]["tokens"].items():
        name = camel(path)
        token_type = token["type"]
        value = token["value"]
        if token_type == "color":
            rendered = dart_color(value)
        elif token_type == "dimension":
            rendered = dart_number(value)
        elif token_type == "duration":
            rendered = str(value)
        else:
            rendered = dart_number(value) if isinstance(value, (int, float)) else repr(value)
        declaration = "int" if token_type == "duration" else ("double" if token_type in ("dimension", "number") else None)
        type_text = f" {declaration}" if declaration else ""
        lines.append(f"  static const{type_text} {name} = {rendered};")
    lines += ["}", ""]
    return "\n".join(lines)


def render_css(
    primitives: dict,
    skins: dict,
    accents: dict,
    product_tokens: dict[str, dict],
    digest: str,
) -> str:
    base_palette = primitives["basePalette"]
    radii = primitives["radii"]
    layout = primitives["layoutMetrics"]
    derived = primitives["derivedAlphas"]
    product = accents["products"]["kaigua"]
    selectors = {"default": ":root,\n[data-skin=\"default\"]", "pure": "[data-skin=\"pure\"]", "deep-night": "[data-skin=\"deep-night\"]"}
    blocks = [
        "/* GENERATED FILE — DO NOT EDIT.",
        " * Source: kai-brand-design/tokens/*.json",
        f" * specVersion: {primitives['specVersion']} · sha256: {digest}",
        " */",
        "",
    ]
    for skin in skins["presets"]:
        glass = skin["glass"]
        effects = skin["effects"]
        dark = skin["brightness"] == "dark"
        chrome = glass["strongSurface"] if glass["blur"] == 0 else (
            "#202024@0.80" if dark else "#FFFFFF@0.80"
        )
        values = {
            "canvas": skin["canvas"],
            "surface": skin["surface"],
            "elevated": skin["elevated"],
            "overlay": skin["overlay"],
            "canvas-highlight": glass["canvasHighlight"],
            "chrome": chrome,
            "chrome-strong": chrome,
            "text-primary": glass["primaryText"],
            "text-secondary": glass["secondaryText"],
            "text-muted": glass["mutedText"],
            "glass-border": glass["border"],
            "glass-strong": glass["strongSurface"],
            "hairline": derived["hairline"]["dark" if dark else "light"],
            "border": derived["border"]["dark" if dark else "light"],
            "subtle-fill": derived["subtleFill"]["dark" if dark else "light"],
            "barrier": derived["barrier"]["dialogDark" if dark else "dialogLight"],
            "warning": derived["status"]["warning"]["dark" if dark else "light"],
        }
        blocks.append(f"{selectors[skin['id']]} {{")
        blocks.append(f"  color-scheme: {'dark' if dark else 'light'};")
        for key, value in values.items():
            blocks.append(f"  --kg-{key}: {css_color(value)};")
        blocks.append(f"  --kg-glass-blur: {glass['blur']}px;")
        shadow = css_color(glass["shadow"])
        blocks.append(
            "  --kg-glass-shadow: none;"
            if effects["shadowScale"] == 0
            else f"  --kg-glass-shadow: 0 8px 28px {shadow};"
        )
        blocks.append("}")
        blocks.append("")

    blocks += [
        ":root {",
        f"  --kg-main-background: {css_color(base_palette['mainBackground'])};",
        f"  --kg-side-background: {css_color(base_palette['sideBackground'])};",
        f"  --kg-brand-primary: {css_color(base_palette['primary'])};",
        f"  --kg-radius-control: {radii['control']}px;",
        f"  --kg-radius-menu: {radii['menu']}px;",
        f"  --kg-radius-card: {radii['card']}px;",
        f"  --kg-radius-sheet: {radii['sheet']}px;",
        f"  --kg-radius-dialog: {radii['dialog']}px;",
        f"  --kg-radius-pill: {radii['pill']}px;",
        f"  --kg-radius-tooltip: {radii['tooltip']}px;",
        f"  --kg-sidebar-width: {layout['sidebarWidth']['medium']}px;",
        f"  --kg-page-gutter: {layout['pageGutter']['medium']}px;",
        f"  --kg-content-bottom-padding: {layout['contentBottomPadding']['desktop']}px;",
        f"  --kg-settings-max: {primitives['breakpoints']['settingsMaxContentWidth']}px;",
    ]
    for path, token in product_tokens["kaigua"]["tokens"].items():
        name = path.replace(".", "-")
        value = token["value"]
        if token["type"] == "color":
            rendered = css_color(value)
        elif token["type"] == "dimension":
            rendered = f"{value}px"
        elif token["type"] == "duration":
            rendered = f"{value}ms"
        else:
            rendered = str(value)
        blocks.append(f"  --kg-product-{name}: {rendered};")
    blocks += ["}", ""]
    for index, preset in enumerate(product["presets"]):
        selector = ":root,\n" if index == 0 else ""
        selector += f"[data-accent=\"{preset['id']}\"]"
        red, green, blue, _ = parse_color(preset["accent"])
        blocks += [
            f"{selector} {{",
            f"  --kg-accent: {css_color(preset['accent'])};",
            f"  --kg-accent-09: rgb({red} {green} {blue} / 0.09);",
            f"  --kg-accent-10: rgb({red} {green} {blue} / 0.10);",
            f"  --kg-accent-14: rgb({red} {green} {blue} / 0.14);",
            f"  --kg-accent-16: rgb({red} {green} {blue} / 0.16);",
            "}",
            "",
        ]
    blocks += [
        "[data-window-class=\"medium\"] {",
        f"  --kg-sidebar-width: {layout['sidebarWidth']['medium']}px;",
        f"  --kg-page-gutter: {layout['pageGutter']['medium']}px;",
        "}",
        "",
        "[data-window-class=\"wide\"] {",
        f"  --kg-sidebar-width: {layout['sidebarWidth']['wide']}px;",
        f"  --kg-page-gutter: {layout['pageGutter']['wide']}px;",
        "}",
        "",
    ]
    return "\n".join(blocks)


def write_or_check(path: Path, content: str, check: bool) -> bool:
    if check:
        actual = path.read_text(encoding="utf-8") if path.exists() else ""
        if actual != content:
            print(f"stale generated tokens: {path}", file=sys.stderr)
            return False
        print(f"ok {path}")
        return True
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"wrote {path}")
    return True


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    parser.add_argument(
        "--only",
        choices=("all", "kaijuan", "kaiting", "kaigua"),
        default="all",
    )
    parser.add_argument("--kaijuan-root", type=Path, default=REPO.parent / "kaijuan")
    parser.add_argument("--kaiting-root", type=Path, default=REPO.parent / "kaiting")
    parser.add_argument("--kaigua-root", type=Path, default=REPO.parent / "kaigua")
    args = parser.parse_args()
    primitives, skins, accents, product_tokens, digest = load_tokens()
    targets = {
        "kaijuan": (
            args.kaijuan_root / "lib/core/theme/brand_tokens.g.dart",
            render_dart("kaijuan", primitives, skins, accents, product_tokens, digest),
        ),
        "kaiting": (
            args.kaiting_root / "lib/core/brand_tokens.g.dart",
            render_dart("kaiting", primitives, skins, accents, product_tokens, digest),
        ),
        "kaigua": (
            args.kaigua_root / "desktop/src/styles/brand.generated.css",
            render_css(primitives, skins, accents, product_tokens, digest),
        ),
    }
    selected = targets if args.only == "all" else {args.only: targets[args.only]}
    ok = all(write_or_check(path, content, args.check) for path, content in selected.values())
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main()
