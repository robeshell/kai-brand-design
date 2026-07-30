from __future__ import annotations

import json
import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class SpecificationCoverageTests(unittest.TestCase):
    def test_foundation_and_component_catalog_is_complete(self) -> None:
        foundation_files = {path.name for path in (ROOT / "foundations").glob("*.md")}
        self.assertEqual(
            foundation_files,
            {
                "color.md",
                "platform-profiles.md",
                "typography.md",
                "iconography.md",
                "layout-and-density.md",
                "shape-and-motion.md",
            },
        )
        component_files = {path.name for path in (ROOT / "components").glob("*.md")}
        self.assertEqual(
            component_files,
            {
                "_template.md",
                "surfaces.md",
                "buttons.md",
                "inputs.md",
                "choice-chips.md",
                "navigation.md",
                "list-rows.md",
                "feedback.md",
                "dialogs.md",
                "sheets-and-menus.md",
                "icons.md",
                "app-bars-and-tabs.md",
                "data-display.md",
                "platform-component-map.md",
            },
        )

    def test_app_patterns_stay_small_and_practical(self) -> None:
        structure_files = {
            path.name for path in (ROOT / "patterns" / "structures").glob("*.md")
        }
        self.assertEqual(
            structure_files,
            {
                "content-browser.md",
                "task-workspace.md",
            },
        )
        self.assertFalse((ROOT / "patterns" / "pages").exists())
        self.assertTrue((ROOT / "patterns" / "status-system.md").is_file())
        for name in (
            "app-shell.md",
            "overlays.md",
            "forms-and-validation.md",
            "settings-page.md",
        ):
            self.assertTrue((ROOT / "patterns" / name).is_file(), name)

    def test_component_map_separates_visuals_from_platform_behavior(self) -> None:
        source = (ROOT / "components" / "platform-component-map.md").read_text(
            encoding="utf-8"
        )
        for profile in ("`mobile`", "`desktop`"):
            self.assertIn(profile, source)
        for platform in ("iOS", "Android", "macOS", "Windows", "Linux"):
            self.assertIn(platform, source)
        self.assertIn("平台适配层", source)
        self.assertIn("Flutter", source)

    def test_every_product_has_normal_and_special_page_specs(self) -> None:
        expected = {
            "kaiting": {
                "now-playing.md",
                "library-and-search.md",
                "album-detail.md",
            },
            "kaijuan": {
                "bookshelf.md",
                "reader.md",
                "collections-and-import.md",
            },
            "kaigua": {
                "media-library.md",
                "media-detail-and-match.md",
                "batch-tasks-and-renamer.md",
            },
        }
        for product, files in expected.items():
            actual = {
                path.name
                for path in (ROOT / "products" / product / "patterns").glob("*.md")
            }
            with self.subTest(product=product):
                self.assertEqual(actual, files)

    def test_product_readme_version_matches_generated_source(self) -> None:
        for product_dir in (ROOT / "products").iterdir():
            if not product_dir.is_dir():
                continue
            tokens = json.loads(
                (product_dir / "tokens.json").read_text(encoding="utf-8")
            )
            readme = (product_dir / "README.md").read_text(encoding="utf-8")
            match = re.search(r"productSpecVersion: ([0-9.]+)", readme)
            self.assertIsNotNone(match)
            self.assertEqual(match.group(1), tokens["productSpecVersion"])


if __name__ == "__main__":
    unittest.main()
