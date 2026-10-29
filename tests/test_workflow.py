import json
import pytest

from lowcode import Workflow


def test_workflow_export_is_deterministic():
    workflow = Workflow()
    workflow.add("form", "Form", {"title": "Contact"})
    workflow.add("api", "ApiRequest", {"method": "POST"})
    workflow.connect("form", "api")
    exported = json.loads(workflow.export_json())
    assert exported["connections"] == [{"source": "form", "target": "api"}]
    assert [item["id"] for item in exported["components"]] == ["api", "form"]


def test_invalid_workflow_edges_are_rejected():
    workflow = Workflow()
    workflow.add("form", "Form")
    with pytest.raises(KeyError):
        workflow.connect("form", "missing")
    with pytest.raises(ValueError):
        workflow.connect("form", "form")
