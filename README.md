# Drag & Drop Platform

A powerful low-code platform for building web applications using an intuitive drag-and-drop interface. Create dynamic web apps visually, visualize workflows with D3.js, and export production-ready code.

## Features

- 🎨 **Drag & Drop Interface**: Intuitive component-based UI builder
- 📦 **Component Library**: Pre-built React components (Buttons, Forms, Images, Lists, etc.)
- 📊 **Workflow Visualization**: D3.js-powered interactive workflow diagrams
- 💾 **Save & Load**: Persist projects to MongoDB database
- 📤 **Code Export**: Generate production-ready React code with TailwindCSS
- 🎯 **Real-time Preview**: See changes instantly as you build
- ⚡ **Fast & Modern**: Built with React.js, Node.js, and TailwindCSS

## Tech Stack

### Frontend
- **React.js 19** - UI library for building dynamic components
- **TailwindCSS 4** - Utility-first CSS framework for styling
- **D3.js 7** - Data visualization for workflow diagrams
- **react-dnd** - Drag and drop functionality
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database for storing app configurations
- **Mongoose** - MongoDB object modeling

## Project Structure

```
drag-and-drop-platform/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Canvas.js
│   │   │   ├── ComponentLibrary.js
│   │   │   ├── ComponentRenderer.js
│   │   │   ├── Toolbar.js
│   │   │   └── WorkflowVisualization.js
│   │   ├── services/      # API and utility services
│   │   │   ├── api.js
│   │   │   └── codeExporter.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── server/                # Backend Node.js application
    ├── models/            # MongoDB models
    │   └── Project.js
    ├── routes/            # API routes
    │   └── projects.js
    ├── index.js           # Server entry point
    ├── package.json
    └── .env.example       # Environment variables template
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/ashikbro/drag-and-drop-platform.git
cd drag-and-drop-platform
```

### 2. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:
```bash
cd server
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/drag-drop-platform
NODE_ENV=development
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# For Linux/Mac
mongod

# For Windows
net start MongoDB
```

### 5. Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```
The server will start at `http://localhost:5000`

#### Start Frontend (in a new terminal)
```bash
cd client
npm start
```
The client will start at `http://localhost:3000`

## Usage

### Building Your First App

1. **Drag Components**: From the left sidebar, drag components (buttons, text, images, etc.) onto the canvas
2. **Configure Properties**: Click on any component to edit its properties in the right panel
3. **Visualize Workflow**: Click "Show Workflow" to see a D3.js visualization of component relationships
4. **Save Project**: Click "Save" and enter a project name to store your work
5. **Load Project**: Click "Load" to retrieve previously saved projects
6. **Export Code**: Click "Export Code" to generate production-ready React code

### Available Components

- **Button**: Interactive buttons with customizable colors and text
- **Text**: Text content with multiple size options
- **Input**: Form input fields with different types
- **Image**: Image components with custom sources
- **Container**: Layout containers for organizing content
- **Header**: Page headers (H1-H6)
- **Form**: Form containers for collecting user input
- **List**: Bulleted or numbered lists

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Development

### Frontend Development
```bash
cd client
npm start
```

### Backend Development (with auto-reload)
```bash
cd server
npm run dev
```

### Building for Production

#### Frontend
```bash
cd client
npm run build
```

#### Backend
```bash
cd server
npm start
```

## Features in Detail

### 1. Drag & Drop Interface
Built with `react-dnd`, allowing seamless drag-and-drop of components from the library to the canvas.

### 2. Component Library
8 pre-built components ready to use, each with customizable properties.

### 3. Workflow Visualization
Interactive D3.js diagrams showing component relationships with draggable nodes and connecting arrows.

### 4. Code Export
Generates clean, production-ready React code with TailwindCSS classes that you can copy and use in your projects.

### 5. Database Integration
MongoDB stores all your project configurations, making it easy to save, load, and manage multiple projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Built with ❤️ for the drag-and-drop platform community
