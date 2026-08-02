import pathlib
import json
import unittest


ROOT = pathlib.Path(__file__).resolve().parents[1]


class ViewerContentTests(unittest.TestCase):
    def test_page_headers_come_from_structured_content(self):
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        self.assertEqual(source.count("pageHeader("), 1)
        self.assertIn("pageHeaderFor(pageId)", source)

    def test_product_specific_copy_stays_out_of_generic_pages(self):
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        generic_pages = source.split("function productsPage", maxsplit=1)[0]
        forbidden_terms = (
            "开听",
            "开卷",
            "开刮",
            "封面",
            "黑胶",
            "歌词",
            "书页",
            "漫画",
            "阅读器",
            "海报",
            "剧照",
            "刮削",
        )

        for term in forbidden_terms:
            with self.subTest(term=term):
                self.assertNotIn(term, generic_pages)

    def test_skin_switching_never_replaces_the_product_accent(self):
        source = (ROOT / "viewer" / "src" / "theme.ts").read_text()
        self.assertIn("const viewerAccent = accent.accent;", source)
        self.assertNotIn(
            'resolved === "default" ? tokens.primitives.basePalette.primary',
            source,
        )

    def test_overview_stays_practical(self):
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        overview = source.split("function overview(): string", maxsplit=1)[1]
        overview = overview.split("function colorPage", maxsplit=1)[0]

        for term in ("内容校验", "当前版本", "成熟度", "设计原则"):
            with self.subTest(term=term):
                self.assertNotIn(term, overview)
        self.assertIn("make validate test build check", overview)
        self.assertNotIn("getting-started", source)

    def test_mobile_navigation_has_an_explicit_entry(self):
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        self.assertIn('id="mobile-nav-toggle"', source)
        self.assertIn('aria-controls="site-navigation"', source)
        self.assertIn('event.key === "Escape"', source)

    def test_platform_foundation_has_a_dedicated_page(self):
        content = json.loads(
            (ROOT / "spec" / "viewer-content.json").read_text(encoding="utf-8")
        )
        self.assertIn("platforms", content["pages"])
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        self.assertIn("function platformsPage()", source)
        self.assertIn('case "platforms"', source)

    def test_typography_page_reads_component_profiles(self):
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        self.assertIn("tokens.primitives.componentProfiles", source)
        self.assertIn("typeRoleLabels", source)
        for role in ("inputText", "listTitle", "gridTitle"):
            with self.subTest(role=role):
                self.assertIn(f'{role}:', source)
        self.assertIn("metricLabels", source)

    def test_viewer_can_preview_every_platform_profile(self):
        main = (ROOT / "viewer" / "src" / "main.ts").read_text()
        theme = (ROOT / "viewer" / "src" / "theme.ts").read_text()
        self.assertIn('id="platform"', main)
        self.assertIn("applyPlatformProfile(state.platform)", main)
        self.assertIn("root.dataset.platformProfile", theme)
        self.assertIn("root.dataset.componentProfile", theme)
        self.assertIn("--viewer-metric-", theme)
        self.assertIn("--viewer-type-${name}-weight", theme)
        self.assertIn("--viewer-type-${name}-tracking", theme)

    def test_viewer_uses_app_structures_instead_of_generic_pages(self):
        content = json.loads(
            (ROOT / "spec" / "viewer-content.json").read_text(encoding="utf-8")
        )
        pages = set(content["pages"])
        self.assertTrue(
            {"components", "content-browser", "task-workspace", "status-system"}
            <= pages
        )
        self.assertFalse(
            {"platform-components", "surfaces", "collections", "details", "search", "tasks", "states"} & pages
        )

    def test_status_system_shows_real_recovery_cases(self):
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        status_page = source.split(
            "function statusSystemPage()", maxsplit=1
        )[1].split("function productsPage", maxsplit=1)[0]
        for term in ("首次使用为空", "搜索无结果", "部分完成", "重试失败项"):
            with self.subTest(term=term):
                self.assertIn(term, status_page)

    def test_platform_component_map_contains_visual_specimens(self):
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        specimen = source.split(
            "function componentSpecimen(", maxsplit=1
        )[1].split("function buttonsPage", maxsplit=1)[0]

        for visual in (
            "device-phone",
            "ios-tab-bar",
            "device-window",
            "kai-windowbar",
            "desktop-body",
        ):
            with self.subTest(visual=visual):
                self.assertIn(visual, specimen)

    def test_component_foundation_merges_the_three_old_entries(self):
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        page = source.split(
            "function componentsOverview()", maxsplit=1
        )[1].split("function componentSpecimen", maxsplit=1)[0]
        self.assertIn("component-family-grid", page)
        self.assertIn("surface-demo", page)
        self.assertIn("component-catalog", page)
        self.assertIn('componentSpecimen("mobile"', page)
        self.assertIn('componentSpecimen("desktop"', page)

    def test_every_component_page_is_a_visual_acceptance_page(self):
        source = (ROOT / "viewer" / "src" / "main.ts").read_text()
        template = source.split("const componentPage =", maxsplit=1)[1].split(
            "function componentsOverview", maxsplit=1
        )[0]
        self.assertIn('sectionHeader("预览"', template)
        self.assertIn("component-stage", template)
        self.assertNotIn("component-specs", template)
        self.assertNotIn("tokenTable", template)
        self.assertNotIn("contract.usage", template)


if __name__ == "__main__":
    unittest.main()
