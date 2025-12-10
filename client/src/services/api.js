import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  // Projects
  saveProject: (project) => axios.post(`${API_URL}/projects`, project),
  getProjects: () => axios.get(`${API_URL}/projects`),
  getProject: (id) => axios.get(`${API_URL}/projects/${id}`),
  updateProject: (id, project) => axios.put(`${API_URL}/projects/${id}`, project),
  deleteProject: (id) => axios.delete(`${API_URL}/projects/${id}`),
};

export default api;
