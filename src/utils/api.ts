import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  getByCategory: (category: string) => api.get(`/products/category/${category}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  get: (userId: string) => api.get(`/cart/${userId}`),
  addItem: (userId: string, data: any) => api.post(`/cart/${userId}/add`, data),
  removeItem: (userId: string, data: any) => api.post(`/cart/${userId}/remove`, data),
  clear: (userId: string) => api.post(`/cart/${userId}/clear`),
};

// Wishlist API
export const wishlistAPI = {
  get: (userId: string) => api.get(`/wishlist/${userId}`),
  addItem: (userId: string, data: any) => api.post(`/wishlist/${userId}/add`, data),
  removeItem: (userId: string, data: any) => api.post(`/wishlist/${userId}/remove`, data),
};

// Orders API
export const ordersAPI = {
  getByUser: (userId: string) => api.get(`/orders/user/${userId}`),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (data: any) => api.post('/orders', data),
  update: (id: string, data: any) => api.put(`/orders/${id}`, data),
};

// Subscriptions API
export const subscriptionsAPI = {
  getAll: () => api.get('/subscriptions'),
  getByUser: (userId: string) => api.get(`/subscriptions/user/${userId}`),
  create: (data: any) => api.post('/subscriptions', data),
  update: (id: string, data: any) => api.put(`/subscriptions/${id}`, data),
  cancel: (id: string) => api.post(`/subscriptions/${id}/cancel`),
};

// Authentication API
export const authAPI = {
  signIn: (email: string, password: string) => 
    api.post('/auth/signin', { email, password }),
  signUp: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    city?: string;
    zipCode?: string;
  }) => api.post('/auth/signup', data),
  getMe: (token: string) => 
    api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
};

export default api;
