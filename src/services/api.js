import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // your json-server backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
