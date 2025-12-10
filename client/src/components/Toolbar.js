import React, { useState } from 'react';
import api from '../services/api';
import { exportToCode } from '../services/codeExporter';

const Toolbar = ({ components, onSave, onLoad, onExport, onToggleWorkflow, showWorkflow }) => {
  const [projectName, setProjectName] = useState('');
  const [savedProjects, setSavedProjects] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportedCode, setExportedCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!projectName.trim()) {
      setMessage('Please enter a project name');
      return;
    }

    try {
      const project = {
        name: projectName,
        components,
        createdAt: new Date().toISOString(),
      };
      const response = await api.saveProject(project);
      setMessage('Project saved successfully!');
      onSave(response.data);
      setShowSaveModal(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving project: ' + error.message);
    }
  };

  const handleLoadProjects = async () => {
    try {
      const response = await api.getProjects();
      setSavedProjects(response.data);
      setShowLoadModal(true);
    } catch (error) {
      setMessage('Error loading projects: ' + error.message);
    }
  };

  const handleLoadProject = async (projectId) => {
    try {
      const response = await api.getProject(projectId);
      onLoad(response.data);
      setShowLoadModal(false);
      setMessage('Project loaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error loading project: ' + error.message);
    }
  };

  const handleExport = () => {
    const code = exportToCode(components);
    setExportedCode(code);
    setShowExportModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportedCode);
    setMessage('Code copied to clipboard!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSaveModal(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            💾 Save
          </button>
          <button
            onClick={handleLoadProjects}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            📂 Load
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            📤 Export Code
          </button>
          <button
            onClick={onToggleWorkflow}
            className={`px-4 py-2 rounded transition-colors ${
              showWorkflow
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📊 {showWorkflow ? 'Hide' : 'Show'} Workflow
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Components: {components.length}
        </div>
      </div>

      {message && (
        <div className="mt-2 p-2 bg-blue-100 text-blue-700 rounded text-sm">
          {message}
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Save Project</h3>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Load Project</h3>
            <div className="max-h-96 overflow-y-auto">
              {savedProjects.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No saved projects</p>
              ) : (
                <div className="space-y-2">
                  {savedProjects.map((project) => (
                    <div
                      key={project._id}
                      className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleLoadProject(project._id)}
                    >
                      <div className="font-semibold">{project.name}</div>
                      <div className="text-sm text-gray-500">
                        {project.components?.length || 0} components
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowLoadModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Exported Code</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm font-mono mb-4">
              {exportedCode}
            </pre>
            <div className="flex justify-end space-x-2">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                📋 Copy to Clipboard
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
