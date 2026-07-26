.PHONY: build check test validate sync visual-update visual-check

build:
	python3 tool/kai_design.py build

check:
	python3 tool/kai_design.py check

test:
	python3 -m unittest discover -s tests -v

validate:
	python3 tool/kai_design.py validate

sync:
	python3 tool/kai_design.py sync

visual-update: build
	python3 tool/visual_regression.py --update

visual-check: build
	python3 tool/visual_regression.py
