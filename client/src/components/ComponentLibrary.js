import React from 'react';
import { useDrag } from 'react-dnd';

const ComponentItem = ({ component, onAddComponent }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: component,
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        onAddComponent(component);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`component-item p-3 mb-2 bg-white rounded-lg shadow cursor-move border-2 border-gray-200 hover:border-blue-400 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center">
        <span className="text-2xl mr-2">{component.icon}</span>
        <div>
          <div className="font-semibold text-sm">{component.name}</div>
          <div className="text-xs text-gray-500">{component.description}</div>
        </div>
      </div>
    </div>
  );
};

const ComponentLibrary = ({ onAddComponent }) => {
  const availableComponents = [
    {
      type: 'button',
      name: 'Button',
      icon: '🔘',
      description: 'Interactive button',
      defaultProps: { text: 'Click Me', color: 'blue' },
    },
    {
      type: 'text',
      name: 'Text',
      icon: '📝',
      description: 'Text content',
      defaultProps: { content: 'Sample Text', size: 'medium' },
    },
    {
      type: 'input',
      name: 'Input',
      icon: '✏️',
      description: 'Text input field',
      defaultProps: { placeholder: 'Enter text...', type: 'text' },
    },
    {
      type: 'image',
      name: 'Image',
      icon: '🖼️',
      description: 'Image component',
      defaultProps: { src: 'https://via.placeholder.com/150', alt: 'Image' },
    },
    {
      type: 'container',
      name: 'Container',
      icon: '📦',
      description: 'Layout container',
      defaultProps: { padding: '4', background: 'white' },
    },
    {
      type: 'header',
      name: 'Header',
      icon: '📰',
      description: 'Page header',
      defaultProps: { title: 'Header', level: 'h1' },
    },
    {
      type: 'form',
      name: 'Form',
      icon: '📋',
      description: 'Form container',
      defaultProps: { action: '', method: 'POST' },
    },
    {
      type: 'list',
      name: 'List',
      icon: '📃',
      description: 'List component',
      defaultProps: { items: ['Item 1', 'Item 2', 'Item 3'] },
    },
  ];

  return (
    <div className="w-64 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Component Library</h2>
      <p className="text-sm text-gray-600 mb-4">Drag components to canvas</p>
      {availableComponents.map((component) => (
        <ComponentItem
          key={component.type}
          component={component}
          onAddComponent={onAddComponent}
        />
      ))}
    </div>
  );
};

export default ComponentLibrary;
