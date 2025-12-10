import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComponentLibrary from './components/ComponentLibrary';
import Canvas from './components/Canvas';
import WorkflowVisualization from './components/WorkflowVisualization';
import Toolbar from './components/Toolbar';
import './App.css';

function App() {
  const [components, setComponents] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const addComponent = (component) => {
    const newComponent = {
      ...component,
      id: `${component.type}-${Date.now()}`,
      props: component.defaultProps || {},
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (id, updates) => {
    setComponents(components.map(comp =>
      comp.id === id ? { ...comp, ...updates } : comp
    ));
  };

  const deleteComponent = (id) => {
    setComponents(components.filter(comp => comp.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">Drag & Drop Web App Builder</h1>
        </header>
        
        <Toolbar
          components={components}
          onSave={setSelectedProject}
          onLoad={(project) => {
            setComponents(project.components || []);
            setSelectedProject(project);
          }}
          onExport={() => {}}
          onToggleWorkflow={() => setShowWorkflow(!showWorkflow)}
          showWorkflow={showWorkflow}
        />

        <div className="flex h-screen">
          <ComponentLibrary onAddComponent={addComponent} />
          
          <div className="flex-1 flex flex-col">
            <Canvas
              components={components}
              onUpdateComponent={updateComponent}
              onDeleteComponent={deleteComponent}
            />
            
            {showWorkflow && (
              <WorkflowVisualization components={components} />
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
