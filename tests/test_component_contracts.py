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
        self.primitives = json.loads(
            (ROOT / "tokens" / "primitives.json").read_text(encoding="utf-8")
        )

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
                "icons",
                "app-bars",
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
                    self.assertTrue({"name", "token", "value"} <= set(row))
                    self.assertTrue(all(value.strip() for value in row.values()))
                    if ".typeScale." in row["token"]:
                        self.assertEqual(row["layer"], "semantic")
                        self.assertIn(row["role"], self.primitives["typography"]["semanticRoles"])
                        component, slot = row["mapping"].split(".", 1)
                        self.assertIn(component, self.primitives["typography"]["componentMappings"])
                        self.assertIn(
                            slot,
                            self.primitives["typography"]["componentMappings"][component],
                        )

    def test_interactive_components_define_common_states(self) -> None:
        interactive = {
            "buttons",
            "inputs",
            "selection",
            "navigation",
            "list-rows",
            "dialogs",
            "menus",
            "icons",
            "app-bars",
        }
        for component_id in interactive:
            states = {
                row["name"]
                for row in self.contracts[component_id]["states"]
                if row["required"]
            }
            with self.subTest(component=component_id):
                self.assertTrue({"默认", "键盘聚焦", "禁用"} <= states)

    def test_component_contract_paths_exist_in_profiles(self) -> None:
        references = {
            row["token"]
            for contract in self.contracts.values()
            for row in contract["tokens"]
            if row["token"].startswith("componentProfiles.")
        }
        for reference in references:
            parts = reference.removeprefix("componentProfiles.").split(".")
            profile_ids = (
                self.primitives["componentProfiles"]
                if parts[0] == "*"
                else (parts[0],)
            )
            suffix = parts[1:]
            for profile_id in profile_ids:
                profile = self.primitives["componentProfiles"][profile_id]
                value = profile
                for part in suffix:
                    with self.subTest(reference=reference, profile=profile_id):
                        self.assertIn(part, value)
                    value = value[part]


if __name__ == "__main__":
    unittest.main()
