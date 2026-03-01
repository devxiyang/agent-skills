# make — Build Automation

## Run targets

```bash
make                                 # run default target
make build                           # run "build" target
make test lint                       # run multiple targets
make -n build                        # dry run (print commands, don't execute)
make -j4 build test                  # run targets in parallel
```

## Makefile basics

```makefile
# Variables
NODE = node
SRC = src
DIST = dist

# Default target (runs when you type `make`)
.DEFAULT_GOAL := build

# Targets
build:
	npm run build

test:
	npm test

lint:
	npx eslint $(SRC)

clean:
	rm -rf $(DIST)

# Run build before test
test: build
	npm test
```

**Important:** Indentation must be a **tab**, not spaces.

## Phony targets

Mark targets that don't produce files:

```makefile
.PHONY: build test lint clean dev install
```

Without `.PHONY`, make skips a target if a file with that name exists.

## Practical Makefile for a Node project

```makefile
.PHONY: install dev build test lint clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

test:
	npm test

lint:
	npx eslint src --fix

clean:
	rm -rf dist node_modules

# Shortcut: full CI check
ci: install lint test build
```

## Practical Makefile for a Python project

```makefile
.PHONY: install dev test lint clean

VENV = .venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip

install:
	python3 -m venv $(VENV)
	$(PIP) install -r requirements.txt

test:
	$(PYTHON) -m pytest

lint:
	$(PYTHON) -m ruff check .

clean:
	rm -rf $(VENV) __pycache__ .pytest_cache
```

## Variables

```makefile
# Static variable
NAME = my-app

# Shell command result
VERSION := $(shell git describe --tags --always)
DATE := $(shell date +%Y-%m-%d)

build:
	echo "Building $(NAME) v$(VERSION) on $(DATE)"
```

## Conditional logic

```makefile
OS := $(shell uname)

ifeq ($(OS), Darwin)
  OPEN = open
else
  OPEN = xdg-open
endif

docs:
	$(OPEN) docs/index.html
```
