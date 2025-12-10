import React from 'react';

const ComponentRenderer = ({ component }) => {
  const { type, props } = component;

  // Color mappings for TailwindCSS classes
  const buttonColorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    red: 'bg-red-500 hover:bg-red-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    gray: 'bg-gray-500 hover:bg-gray-600',
  };

  const renderComponent = () => {
    switch (type) {
      case 'button':
        const colorClass = buttonColorClasses[props.color] || buttonColorClasses.blue;
        return (
          <button
            className={`px-4 py-2 ${colorClass} text-white rounded transition-colors`}
          >
            {props.text || 'Button'}
          </button>
        );

      case 'text':
        const sizeClasses = {
          small: 'text-sm',
          medium: 'text-base',
          large: 'text-lg',
          xlarge: 'text-xl',
        };
        return (
          <p className={`${sizeClasses[props.size] || 'text-base'} text-gray-800`}>
            {props.content || 'Text'}
          </p>
        );

      case 'input':
        return (
          <input
            type={props.type || 'text'}
            placeholder={props.placeholder || 'Enter text...'}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
          />
        );

      case 'image':
        return (
          <img
            src={props.src || 'https://via.placeholder.com/150'}
            alt={props.alt || 'Image'}
            className="max-w-full h-auto rounded shadow"
          />
        );

      case 'container':
        const paddingClasses = {
          '2': 'p-2',
          '4': 'p-4',
          '6': 'p-6',
          '8': 'p-8',
        };
        const backgroundClasses = {
          white: 'bg-white',
          gray: 'bg-gray-50',
          blue: 'bg-blue-50',
        };
        const paddingClass = paddingClasses[props.padding] || paddingClasses['4'];
        const bgClass = backgroundClasses[props.background] || backgroundClasses.white;
        return (
          <div
            className={`${paddingClass} ${bgClass} rounded border border-gray-200`}
          >
            <p className="text-gray-600">Container Component</p>
            {props.children && <div>{props.children}</div>}
          </div>
        );

      case 'header':
        const HeaderTag = props.level || 'h1';
        const headerSizes = {
          h1: 'text-4xl',
          h2: 'text-3xl',
          h3: 'text-2xl',
          h4: 'text-xl',
          h5: 'text-lg',
          h6: 'text-base',
        };
        return React.createElement(
          HeaderTag,
          { className: `${headerSizes[HeaderTag]} font-bold text-gray-800` },
          props.title || 'Header'
        );

      case 'form':
        return (
          <form className="space-y-4 p-4 border border-gray-300 rounded bg-gray-50">
            <p className="font-semibold">Form Component</p>
            <p className="text-sm text-gray-600">
              Method: {props.method || 'POST'}
            </p>
          </form>
        );

      case 'list':
        return (
          <ul className="list-disc list-inside space-y-2 p-4 bg-gray-50 rounded">
            {(props.items || ['Item 1', 'Item 2', 'Item 3']).map(
              (item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              )
            )}
          </ul>
        );

      default:
        return (
          <div className="p-4 bg-gray-100 rounded text-gray-600">
            Unknown component type: {type}
          </div>
        );
    }
  };

  return <div className="component-wrapper">{renderComponent()}</div>;
};

export default ComponentRenderer;
