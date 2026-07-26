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
                "buttons",
                "inputs",
                "selection",
                "navigation",
                "list-rows",
                "feedback",
                "dialogs",
                "menus",
            },
        )

    def test_contracts_have_actionable_usage_and_token_rows(self) -> None:
        for component_id, contract in self.contracts.items():
            with self.subTest(component=component_id):
                self.assertGreaterEqual(len(contract["usage"]), 2)
                self.assertGreaterEqual(len(contract["tokens"]), 2)
                for row in contract["tokens"]:
                    self.assertEqual(set(row), {"name", "token", "value"})
                    self.assertTrue(all(value.strip() for value in row.values()))


if __name__ == "__main__":
    unittest.main()
