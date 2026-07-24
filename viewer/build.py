#!/usr/bin/env python3
"""Generate the design-spec viewer.

Outputs two copies:
- viewer/index.html (repo-local preview)
- docs/index.html   (GitHub Pages entry point)

Reads token JSON files and injects them into template.html.
Re-run after any change under tokens/:

    python3 viewer/build.py
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent
TOKENS = REPO / "tokens"
TEMPLATE = ROOT / "template.html"
OUTPUTS = [ROOT / "index.html", REPO / "docs" / "index.html"]
MARKER = "/*__SPEC_JSON__*/"


def load(name: str):
    return json.loads((TOKENS / name).read_text(encoding="utf-8"))


def main() -> None:
    spec = {
        "primitives": load("primitives.json"),
        "skins": load("skins.json"),
        "accents": load("accents.json"),
    }
    template = TEMPLATE.read_text(encoding="utf-8")
    if MARKER not in template:
        raise SystemExit(f"marker {MARKER} not found in {TEMPLATE}")
    payload = json.dumps(spec, ensure_ascii=False)
    for out in OUTPUTS:
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(template.replace(MARKER, payload), encoding="utf-8")
    print(f"wrote {OUTPUTS[0]} (specVersion {spec['primitives']['specVersion']})")
    print(f"wrote {OUTPUTS[1]} (specVersion {spec['primitives']['specVersion']})")


if __name__ == "__main__":
    main()
