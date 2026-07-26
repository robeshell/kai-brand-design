import pathlib
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


if __name__ == "__main__":
    unittest.main()
