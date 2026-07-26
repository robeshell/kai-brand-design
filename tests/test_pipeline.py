from __future__ import annotations

import copy
import json
import sys
import unittest
from pathlib import Path


REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO / "tool"))

from generate_product_tokens import dart_color, load_tokens  # noqa: E402
from kai_design import DIST, distribution_outputs, render_manifest  # noqa: E402
from validate_tokens import TokenValidationError, validate  # noqa: E402


class TokenPipelineTest(unittest.TestCase):
    def setUp(self) -> None:
        self.primitives, self.skins, self.accents, self.product_tokens, self.digest = load_tokens()

    def test_sources_validate(self) -> None:
        validate(self.primitives, self.skins, self.accents, self.product_tokens)

    def test_color_alpha_rounding_is_stable(self) -> None:
        self.assertEqual(dart_color("black@0.09"), "Color(0x17000000)")
        self.assertEqual(dart_color("white@0.70"), "Color(0xB3FFFFFF)")

    def test_duplicate_skin_id_is_rejected(self) -> None:
        skins = copy.deepcopy(self.skins)
        skins["presets"].append(copy.deepcopy(skins["presets"][0]))
        with self.assertRaises(TokenValidationError):
            validate(self.primitives, skins, self.accents, self.product_tokens)

    def test_unknown_default_accent_is_rejected(self) -> None:
        accents = copy.deepcopy(self.accents)
        accents["products"]["kaijuan"]["default"] = "missing"
        with self.assertRaises(TokenValidationError):
            validate(self.primitives, self.skins, accents, self.product_tokens)

    def test_incomplete_base_palette_is_rejected(self) -> None:
        primitives = copy.deepcopy(self.primitives)
        del primitives["basePalette"]["sideBackground"]
        with self.assertRaises(TokenValidationError):
            validate(primitives, self.skins, self.accents, self.product_tokens)

    def test_product_token_requires_supported_type(self) -> None:
        product_tokens = copy.deepcopy(self.product_tokens)
        product_tokens["kaijuan"]["tokens"]["cover.radius"]["type"] = "shadow"
        with self.assertRaises(TokenValidationError):
            validate(self.primitives, self.skins, self.accents, product_tokens)

    def test_product_tokens_are_emitted_per_product(self) -> None:
        outputs, _, _ = distribution_outputs()
        kaiting = outputs[DIST / "flutter" / "kaiting" / "brand_tokens.g.dart"]
        kaijuan = outputs[DIST / "flutter" / "kaijuan" / "brand_tokens.g.dart"]
        self.assertIn("KaiProductTokens", kaiting)
        self.assertIn("sourceWebDav", kaiting)
        self.assertIn("coverRadius", kaijuan)
        self.assertNotIn("sourceWebDav", kaijuan)

    def test_distribution_manifest_covers_every_artifact(self) -> None:
        outputs, spec_version, digest = distribution_outputs()
        manifest = json.loads(render_manifest(outputs, spec_version, digest))
        artifacts = {
            str(path.relative_to(DIST))
            for path in outputs
        }
        self.assertEqual(set(manifest["files"]), artifacts)
        self.assertEqual(manifest["tokenDigest"], self.digest)


if __name__ == "__main__":
    unittest.main()
