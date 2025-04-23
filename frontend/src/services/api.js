import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Your NestJS backend
});

export const registerAdmin = (data) => API.post('/admin/register', data);
export const loginAdmin = (data) => API.post('/admin/login', data);
