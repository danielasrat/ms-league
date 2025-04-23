import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/forum',
});

// Attach token if needed
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// POST
export const createPost = (data) => API.post('/', data);
export const likePost = (postId) => API.post(`/${postId}/like`);
export const addComment = (postId, data) => API.post(`/${postId}/comment`, data);

// GET
export const getPosts = () => API.get('/');

// PATCH
export const updatePost = (id, data) => API.patch(`/${id}`, data);
export const updateComment = (id, data) => API.patch(`/comment/${id}`, data);

// DELETE
export const deletePost = (id) => API.delete(`/${id}`);
export const deleteComment = (id) => API.delete(`/comment/${id}`);
