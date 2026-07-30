from __future__ import annotations

import copy
import contextlib
import io
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock


REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO / "tool"))

from generate_product_tokens import dart_color, load_tokens  # noqa: E402
import kai_design  # noqa: E402
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

    def test_platform_profiles_match_official_baselines(self) -> None:
        profiles = self.primitives["platformProfiles"]
        self.assertEqual(
            set(profiles),
            {
                "appleMobile",
                "androidMobile",
                "macDesktop",
                "windowsDesktop",
                "linuxDesktop",
            },
        )
        self.assertEqual(profiles["appleMobile"]["typeScale"]["body"]["fontSize"], 17)
        self.assertEqual(profiles["appleMobile"]["metrics"]["minimumInteractiveTarget"], 44)
        self.assertEqual(profiles["androidMobile"]["typeScale"]["body"]["lineHeight"], 24)
        self.assertEqual(profiles["androidMobile"]["metrics"]["minimumInteractiveTarget"], 48)
        self.assertEqual(profiles["macDesktop"]["typeScale"]["body"]["fontSize"], 13)
        self.assertEqual(profiles["windowsDesktop"]["typeScale"]["body"]["fontSize"], 14)

    def test_mobile_profile_cannot_shrink_below_platform_baseline(self) -> None:
        primitives = copy.deepcopy(self.primitives)
        primitives["platformProfiles"]["appleMobile"]["typeScale"]["body"]["fontSize"] = 13
        with self.assertRaises(TokenValidationError):
            validate(primitives, self.skins, self.accents, self.product_tokens)

    def test_components_use_one_mobile_and_one_desktop_profile(self) -> None:
        profiles = self.primitives["componentProfiles"]
        self.assertEqual(set(profiles), {"mobile", "desktop"})
        self.assertEqual(profiles["mobile"]["typeScale"]["body"]["fontSize"], 17)
        self.assertEqual(profiles["mobile"]["metrics"]["controlHeight"], 48)
        self.assertEqual(profiles["desktop"]["typeScale"]["body"]["fontSize"], 14)
        self.assertEqual(profiles["desktop"]["metrics"]["controlHeight"], 36)

    def test_status_text_color_requires_accessible_contrast(self) -> None:
        primitives = copy.deepcopy(self.primitives)
        primitives["derivedAlphas"]["status"]["warning"]["light"] = "#D9B978"
        with self.assertRaises(TokenValidationError):
            validate(primitives, self.skins, self.accents, self.product_tokens)

    def test_platform_profiles_are_generated_for_flutter_and_css(self) -> None:
        outputs, _, _ = distribution_outputs()
        dart = outputs[DIST / "flutter" / "kaiting" / "brand_tokens.g.dart"]
        css = outputs[DIST / "css" / "kaigua" / "brand.generated.css"]
        self.assertIn("abstract final class KaiBrandAppleMobileType", dart)
        self.assertIn("static const double bodySize = 17.0;", dart)
        self.assertIn("abstract final class KaiBrandAndroidMobileMetrics", dart)
        self.assertIn("static const double minimumInteractiveTarget = 48.0;", dart)
        self.assertIn("abstract final class KaiBrandMobileType", dart)
        self.assertIn("abstract final class KaiBrandDesktopMetrics", dart)
        self.assertIn('[data-component-profile="mobile"]', css)
        self.assertIn("--kg-type-body-size: 17px;", css)
        self.assertIn("abstract final class KaiBrandIcons", dart)
        self.assertIn("static const double regular = 20.0;", dart)
        self.assertIn("abstract final class KaiBrandComponentMetrics", dart)
        self.assertIn("static const successLight", dart)
        self.assertIn("--kg-content-standard-max: 920px;", css)
        self.assertIn("--kg-success:", css)

    def test_distribution_manifest_covers_every_artifact(self) -> None:
        outputs, spec_version, digest = distribution_outputs()
        manifest = json.loads(render_manifest(outputs, spec_version, digest))
        artifacts = {
            str(path.relative_to(DIST))
            for path in outputs
        }
        self.assertEqual(set(manifest["files"]), artifacts)
        self.assertEqual(manifest["tokenDigest"], self.digest)

    def test_distribution_check_rejects_obsolete_generated_files(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            dist = Path(directory)
            expected = dist / "tokens" / "expected.json"
            expected.parent.mkdir(parents=True)
            expected.write_text("{}\n", encoding="utf-8")
            obsolete = dist / "spec" / "patterns" / "obsolete.md"
            obsolete.parent.mkdir(parents=True)
            obsolete.write_text("old\n", encoding="utf-8")
            with mock.patch.object(kai_design, "DIST", dist):
                with contextlib.redirect_stderr(io.StringIO()):
                    self.assertFalse(
                        kai_design.check_unexpected_dist_files({expected: "{}\n"})
                    )
                obsolete.unlink()
                self.assertTrue(
                    kai_design.check_unexpected_dist_files({expected: "{}\n"})
                )


if __name__ == "__main__":
    unittest.main()
