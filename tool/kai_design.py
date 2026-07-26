#!/usr/bin/env python3
"""Build, validate, check, and synchronize the Kai design system."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path

from generate_product_tokens import load_tokens, render_css, render_dart
from validate_tokens import TokenValidationError, validate


REPO = Path(__file__).resolve().parent.parent
DIST = REPO / "dist"
VIEWER = REPO / "viewer"


def sha256(content: str) -> str:
    return hashlib.sha256(content.encode()).hexdigest()


def primitive_contract_value(primitives: dict, token: str) -> str | None:
    """Return the display value for primitive-backed component references."""
    parts = token.split(".")
    current: object = primitives
    for part in parts:
        if not isinstance(current, dict) or part not in current:
            return None
        current = current[part]
    if isinstance(current, (int, float)):
        unit = "px" if parts[0] in {"radii", "tapTargets", "typography"} else ""
        return f"{current:g}{unit}"
    if isinstance(current, dict) and "durationMs" in current:
        return f"{current['durationMs']:g}ms"
    if token == "layoutMetrics.sidebarWidth" and isinstance(current, dict):
        values = [value for value in current.values() if isinstance(value, (int, float))]
        return " / ".join(f"{value:g}" for value in values) + "px"
    return None


def distribution_outputs() -> tuple[dict[Path, str], str, str]:
    primitives, skins, accents, product_tokens, digest = load_tokens()
    validate(primitives, skins, accents, product_tokens)
    release = json.loads((REPO / "release.json").read_text(encoding="utf-8"))
    if release.get("version") != primitives["specVersion"]:
        raise TokenValidationError(
            "release.version must match tokens/primitives.json specVersion"
        )
    if release.get("tag") != f"v{primitives['specVersion']}":
        raise TokenValidationError("release.tag must be v<specVersion>")
    release_lock = {
        "repository": release["repository"],
        "ref": release["tag"],
        "specVersion": primitives["specVersion"],
        "tokenDigest": digest,
    }
    viewer_content = json.loads(
        (REPO / "spec" / "viewer-content.json").read_text(encoding="utf-8")
    )
    component_contracts = json.loads(
        (REPO / "contracts" / "components.json").read_text(encoding="utf-8")
    )
    required_pages = {
        "overview", "getting-started", "color", "typography", "spacing", "motion", "components", "surfaces",
        "buttons", "inputs", "selection", "navigation", "list-rows", "feedback",
        "dialogs", "menus", "data-display", "app-shell", "overlays", "settings", "products",
        "delivery", "qa",
    }
    if set(viewer_content.get("pages", {})) != required_pages:
        raise TokenValidationError("viewerContent.pages: page catalog is incomplete")
    for page_id, copy in viewer_content["pages"].items():
        if not isinstance(copy, list) or len(copy) != 3 or not all(
            isinstance(value, str) and value.strip() for value in copy
        ):
            raise TokenValidationError(
                f"viewerContent.pages.{page_id}: expected [group, title, description]"
            )
    component_ids = {
        "surfaces", "buttons", "inputs", "selection", "navigation",
        "list-rows", "feedback", "dialogs", "menus", "data-display",
    }
    if set(component_contracts.get("components", {})) != component_ids:
        raise TokenValidationError("componentContracts.components: catalog is incomplete")
    for component_id, contract in component_contracts["components"].items():
        required_contract_fields = {
            "name", "summary", "variants", "states",
            "accessibility", "usage", "tokens",
        }
        if set(contract) != required_contract_fields:
            raise TokenValidationError(
                f"componentContracts.components.{component_id}: contract fields are incomplete"
            )
        for field in ("variants", "states", "accessibility", "usage", "tokens"):
            if not contract[field]:
                raise TokenValidationError(
                    f"componentContracts.components.{component_id}.{field}: cannot be empty"
                )
        for row in contract["tokens"]:
            expected = primitive_contract_value(primitives, row["token"])
            if expected is not None and row["value"] != expected:
                raise TokenValidationError(
                    f"componentContracts.components.{component_id}.{row['token']}: "
                    f"expected {expected}, got {row['value']}"
                )
    bundle = json.dumps(
        {
            "primitives": primitives,
            "skins": skins,
            "accents": accents,
            "productTokens": product_tokens,
            "viewerContent": viewer_content,
            "componentContracts": component_contracts,
        },
        ensure_ascii=False,
        sort_keys=True,
        indent=2,
    ) + "\n"
    outputs = {
        DIST / "tokens" / "kai.tokens.json": bundle,
        DIST / "tokens" / "kai.meta.json": (
            json.dumps(
                {
                    "specVersion": primitives["specVersion"],
                    "tokenDigest": digest,
                },
                ensure_ascii=False,
                sort_keys=True,
                indent=2,
            )
            + "\n"
        ),
        DIST / "release" / "kai-design.lock.json": (
            json.dumps(release_lock, ensure_ascii=False, sort_keys=True, indent=2)
            + "\n"
        ),
        DIST / "spec" / "spec" / "viewer-content.json": (
            json.dumps(viewer_content, ensure_ascii=False, sort_keys=True, indent=2)
            + "\n"
        ),
        DIST / "spec" / "contracts" / "components.json": (
            json.dumps(component_contracts, ensure_ascii=False, sort_keys=True, indent=2)
            + "\n"
        ),
        DIST / "flutter" / "kaijuan" / "brand_tokens.g.dart": render_dart(
            "kaijuan", primitives, skins, accents, product_tokens, digest
        ),
        DIST / "flutter" / "kaiting" / "brand_tokens.g.dart": render_dart(
            "kaiting", primitives, skins, accents, product_tokens, digest
        ),
        DIST / "css" / "kaigua" / "brand.generated.css": render_css(
            primitives, skins, accents, product_tokens, digest
        ),
    }
    normative_sources = [REPO / "README.md", REPO / "DESIGN.md"]
    for directory in ("foundations", "components", "patterns", "products", "implementation", "spec"):
        normative_sources.extend(sorted((REPO / directory).rglob("*.md")))
    for source in normative_sources:
        outputs[DIST / "spec" / source.relative_to(REPO)] = source.read_text(
            encoding="utf-8"
        )
    return outputs, primitives["specVersion"], digest


def render_manifest(
    outputs: dict[Path, str], spec_version: str, digest: str
) -> str:
    manifest_files = {
        str(path.relative_to(DIST)): {
            "sha256": sha256(content),
            "bytes": len(content.encode()),
        }
        for path, content in outputs.items()
        if path.is_relative_to(DIST) and path != DIST / "manifest.json"
    }
    manifest = {
        "name": "kai-brand-design",
        "specVersion": spec_version,
        "tokenDigest": digest,
        "files": manifest_files,
    }
    return json.dumps(manifest, ensure_ascii=False, sort_keys=True, indent=2) + "\n"


def build_viewer() -> dict[Path, str]:
    if not (VIEWER / "node_modules").exists():
        raise SystemExit(
            "viewer dependencies missing; run `npm install --prefix viewer` first"
        )
    subprocess.run(
        ["npm", "run", "build"],
        cwd=VIEWER,
        check=True,
    )
    build_dir = VIEWER / "build"
    outputs: dict[Path, str] = {}
    for source in sorted(path for path in build_dir.rglob("*") if path.is_file()):
        relative = source.relative_to(build_dir)
        content = source.read_text(encoding="utf-8")
        outputs[DIST / "viewer" / relative] = content
        outputs[REPO / "docs" / relative] = content
    return outputs


def write_outputs(outputs: dict[Path, str]) -> None:
    for path, content in outputs.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
        print(f"wrote {path.relative_to(REPO)}")


def check_outputs(outputs: dict[Path, str]) -> bool:
    ok = True
    for path, expected in outputs.items():
        actual = path.read_text(encoding="utf-8") if path.exists() else None
        if actual != expected:
            print(f"stale or missing: {path.relative_to(REPO)}", file=sys.stderr)
            ok = False
        else:
            print(f"ok {path.relative_to(REPO)}")
    return ok


def build_all() -> dict[Path, str]:
    base, spec_version, digest = distribution_outputs()
    write_outputs(base)
    viewer = build_viewer()
    outputs = {**base, **viewer}
    outputs[DIST / "manifest.json"] = render_manifest(
        outputs, spec_version, digest
    )
    write_outputs({**viewer, DIST / "manifest.json": outputs[DIST / "manifest.json"]})
    return outputs


def check_all(skip_viewer: bool = False) -> bool:
    base, spec_version, digest = distribution_outputs()
    if not check_outputs(base):
        print("base outputs are stale; run `make build`", file=sys.stderr)
        return False
    if skip_viewer:
        return True
    viewer = build_viewer()
    outputs = {**base, **viewer}
    outputs[DIST / "manifest.json"] = render_manifest(
        outputs, spec_version, digest
    )
    return check_outputs(
        {**viewer, DIST / "manifest.json": outputs[DIST / "manifest.json"]}
    )


def sync_products(args: argparse.Namespace) -> None:
    build_all()
    mappings = {
        "kaijuan": (
            DIST / "flutter" / "kaijuan" / "brand_tokens.g.dart",
            args.kaijuan_root / "lib/core/theme/brand_tokens.g.dart",
        ),
        "kaiting": (
            DIST / "flutter" / "kaiting" / "brand_tokens.g.dart",
            args.kaiting_root / "lib/core/brand_tokens.g.dart",
        ),
        "kaigua": (
            DIST / "css" / "kaigua" / "brand.generated.css",
            args.kaigua_root / "desktop/src/styles/brand.generated.css",
        ),
    }
    selected = mappings if args.only == "all" else {args.only: mappings[args.only]}
    for source, target in selected.values():
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
        print(f"synced {source.relative_to(REPO)} -> {target}")
    lock_source = DIST / "release" / "kai-design.lock.json"
    roots = {
        "kaijuan": args.kaijuan_root,
        "kaiting": args.kaiting_root,
        "kaigua": args.kaigua_root,
    }
    for product in selected:
        lock_target = roots[product] / "kai-design.lock.json"
        shutil.copyfile(lock_source, lock_target)
        print(f"synced {lock_source.relative_to(REPO)} -> {lock_target}")


def main() -> None:
    parser = argparse.ArgumentParser(prog="kai-design")
    subparsers = parser.add_subparsers(dest="command", required=True)
    subparsers.add_parser("validate", help="validate token structure and semantics")
    subparsers.add_parser("build", help="build dist and viewer outputs")
    check = subparsers.add_parser(
        "check", help="fail when committed outputs are stale"
    )
    check.add_argument(
        "--skip-viewer",
        action="store_true",
        help="check token/spec outputs only (for downstream product CI)",
    )
    sync = subparsers.add_parser("sync", help="copy built snapshots into product repos")
    sync.add_argument("--only", choices=("all", "kaijuan", "kaiting", "kaigua"), default="all")
    sync.add_argument("--kaijuan-root", type=Path, default=REPO.parent / "kaijuan")
    sync.add_argument("--kaiting-root", type=Path, default=REPO.parent / "kaiting")
    sync.add_argument("--kaigua-root", type=Path, default=REPO.parent / "kaigua")
    args = parser.parse_args()
    try:
        if args.command == "validate":
            primitives, skins, accents, product_tokens, _ = load_tokens()
            validate(primitives, skins, accents, product_tokens)
            print("tokens valid")
        elif args.command == "build":
            build_all()
        elif args.command == "check":
            raise SystemExit(0 if check_all(args.skip_viewer) else 1)
        else:
            sync_products(args)
    except TokenValidationError as error:
        print(f"token validation failed: {error}", file=sys.stderr)
        raise SystemExit(1) from error


if __name__ == "__main__":
    main()
