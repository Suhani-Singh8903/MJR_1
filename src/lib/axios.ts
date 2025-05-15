// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // <-- Update with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
