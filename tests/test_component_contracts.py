from __future__ import annotations

import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class ComponentContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.contracts = json.loads(
            (ROOT / "contracts" / "components.json").read_text(encoding="utf-8")
        )["components"]

    def test_all_generic_component_pages_have_contracts(self) -> None:
        self.assertEqual(
            set(self.contracts),
            {
                "surfaces",
                "buttons",
                "inputs",
                "selection",
                "navigation",
                "list-rows",
                "feedback",
                "dialogs",
                "menus",
                "data-display",
            },
        )

    def test_contracts_cover_implementation_requirements(self) -> None:
        for component_id, contract in self.contracts.items():
            with self.subTest(component=component_id):
                self.assertEqual(
                    set(contract),
                    {
                        "name",
                        "summary",
                        "variants",
                        "states",
                        "accessibility",
                        "usage",
                        "tokens",
                    },
                )
                self.assertGreaterEqual(len(contract["variants"]), 2)
                self.assertGreaterEqual(len(contract["states"]), 4)
                self.assertGreaterEqual(len(contract["accessibility"]), 2)
                self.assertGreaterEqual(len(contract["usage"]), 2)
                self.assertGreaterEqual(len(contract["tokens"]), 2)
                for row in contract["variants"]:
                    self.assertEqual(set(row), {"name", "description"})
                for row in contract["states"]:
                    self.assertEqual(set(row), {"name", "description", "required"})
                for row in contract["tokens"]:
                    self.assertEqual(set(row), {"name", "token", "value"})
                    self.assertTrue(all(value.strip() for value in row.values()))

    def test_interactive_components_define_common_states(self) -> None:
        interactive = {
            "buttons",
            "inputs",
            "selection",
            "navigation",
            "list-rows",
            "dialogs",
            "menus",
        }
        for component_id in interactive:
            states = {
                row["name"]
                for row in self.contracts[component_id]["states"]
                if row["required"]
            }
            with self.subTest(component=component_id):
                self.assertTrue({"默认", "键盘聚焦", "禁用"} <= states)


if __name__ == "__main__":
    unittest.main()
