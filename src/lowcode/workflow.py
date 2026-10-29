"""Validated workflow graph and deterministic JSON export."""

from dataclasses import dataclass, asdict
import json


@dataclass(frozen=True)
class Component:
    id: str
    type: str
    properties: dict[str, str]


class Workflow:
    def __init__(self):
        self.components: dict[str, Component] = {}
        self.connections: set[tuple[str, str]] = set()

    def add(self, component_id: str, component_type: str, properties: dict[str, str] | None = None) -> Component:
        if not component_id.strip() or not component_type.strip():
            raise ValueError("component_id and component_type are required")
        if component_id in self.components:
            raise ValueError(f"component already exists: {component_id}")
        component = Component(component_id, component_type, dict(properties or {}))
        self.components[component_id] = component
        return component

    def connect(self, source_id: str, target_id: str) -> None:
        if source_id not in self.components or target_id not in self.components:
            raise KeyError("connections require existing components")
        if source_id == target_id:
            raise ValueError("a component cannot connect to itself")
        self.connections.add((source_id, target_id))

    def export_json(self) -> str:
        payload = {
            "components": [
                asdict(self.components[key]) for key in sorted(self.components)
            ],
            "connections": [
                {"source": source, "target": target}
                for source, target in sorted(self.connections)
            ],
        }
        return json.dumps(payload, indent=2, sort_keys=True)
