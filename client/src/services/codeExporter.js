export const exportToCode = (components) => {
  const generateComponentCode = (component) => {
    const { type, props } = component;

    switch (type) {
      case 'button':
        return `<button className="px-4 py-2 bg-${props.color || 'blue'}-500 text-white rounded hover:bg-${props.color || 'blue'}-600">
  ${props.text || 'Button'}
</button>`;

      case 'text':
        const sizeClasses = {
          small: 'text-sm',
          medium: 'text-base',
          large: 'text-lg',
          xlarge: 'text-xl',
        };
        return `<p className="${sizeClasses[props.size] || 'text-base'} text-gray-800">
  ${props.content || 'Text'}
</p>`;

      case 'input':
        return `<input
  type="${props.type || 'text'}"
  placeholder="${props.placeholder || 'Enter text...'}"
  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
/>`;

      case 'image':
        return `<img
  src="${props.src || 'https://via.placeholder.com/150'}"
  alt="${props.alt || 'Image'}"
  className="max-w-full h-auto rounded shadow"
/>`;

      case 'container':
        return `<div className="p-${props.padding || '4'} bg-${props.background || 'white'} rounded border border-gray-200">
  {/* Container content */}
</div>`;

      case 'header':
        const headerSizes = {
          h1: 'text-4xl',
          h2: 'text-3xl',
          h3: 'text-2xl',
          h4: 'text-xl',
          h5: 'text-lg',
          h6: 'text-base',
        };
        const level = props.level || 'h1';
        return `<${level} className="${headerSizes[level]} font-bold text-gray-800">
  ${props.title || 'Header'}
</${level}>`;

      case 'form':
        return `<form className="space-y-4 p-4 border border-gray-300 rounded bg-gray-50" method="${props.method || 'POST'}">
  {/* Form fields */}
</form>`;

      case 'list':
        const items = props.items || ['Item 1', 'Item 2', 'Item 3'];
        return `<ul className="list-disc list-inside space-y-2 p-4 bg-gray-50 rounded">
  ${items.map(item => `<li className="text-gray-700">${item}</li>`).join('\n  ')}
</ul>`;

      default:
        return `<div className="p-4 bg-gray-100 rounded">{/* ${type} component */}</div>`;
    }
  };

  const componentCode = components
    .map((comp) => generateComponentCode(comp))
    .join('\n\n');

  return `import React from 'react';

function GeneratedApp() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        ${componentCode.split('\n').join('\n        ')}
      </div>
    </div>
  );
}

export default GeneratedApp;
`;
};
