# Drag-and-Drop Platform

A validated low-code workflow foundation for composing components and
exporting deterministic JSON definitions.

## Current status

The repository includes component registration, connection validation, and
stable workflow export. A visual editor, component runtime, and production
front-end code generation are not implemented yet.

## Development

```sh
python -m venv .venv
.venv/bin/pip install pytest
PYTHONPATH=src .venv/bin/pytest
```
