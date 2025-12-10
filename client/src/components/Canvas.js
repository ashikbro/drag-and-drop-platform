import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import ComponentRenderer from './ComponentRenderer';

const Canvas = ({ components, onUpdateComponent, onDeleteComponent }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: () => ({}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex-1 flex">
      <div
        ref={drop}
        className={`flex-1 p-8 canvas-container ${
          isOver ? 'bg-blue-50' : 'bg-white'
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Canvas</h2>
        <div className="space-y-4">
          {components.map((component) => (
            <div
              key={component.id}
              className={`border-2 rounded p-2 ${
                selectedComponent === component.id
                  ? 'border-blue-500'
                  : 'border-gray-300'
              } hover:border-blue-400 cursor-pointer transition-colors`}
              onClick={() => setSelectedComponent(component.id)}
            >
              <ComponentRenderer component={component} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteComponent(component.id);
                }}
                className="mt-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          {components.length === 0 && (
            <div className="text-center text-gray-400 py-20">
              <p className="text-lg">Drop components here to start building</p>
            </div>
          )}
        </div>
      </div>

      {selectedComponent && (
        <div className="w-80 bg-gray-50 p-4 border-l border-gray-200 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Properties</h3>
          <ComponentPropertiesEditor
            component={components.find((c) => c.id === selectedComponent)}
            onUpdate={(updates) =>
              onUpdateComponent(selectedComponent, updates)
            }
            onClose={() => setSelectedComponent(null)}
          />
        </div>
      )}
    </div>
  );
};

const ComponentPropertiesEditor = ({ component, onUpdate, onClose }) => {
  if (!component) return null;

  const handlePropChange = (propKey, value) => {
    onUpdate({
      props: {
        ...component.props,
        [propKey]: value,
      },
    });
  };

  return (
    <div>
      <button
        onClick={onClose}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        Close
      </button>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <input
            type="text"
            value={component.type}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>
        {Object.entries(component.props || {}).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {key}
            </label>
            {typeof value === 'string' && value.length < 100 ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handlePropChange(key, e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            ) : Array.isArray(value) ? (
              <textarea
                value={value.join('\n')}
                onChange={(e) =>
                  handlePropChange(key, e.target.value.split('\n'))
                }
                className="w-full px-3 py-2 border rounded"
                rows="4"
              />
            ) : (
              <textarea
                value={JSON.stringify(value, null, 2)}
                onChange={(e) => {
                  try {
                    handlePropChange(key, JSON.parse(e.target.value));
                  } catch (err) {
                    // Invalid JSON, ignore
                  }
                }}
                className="w-full px-3 py-2 border rounded font-mono text-sm"
                rows="4"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
