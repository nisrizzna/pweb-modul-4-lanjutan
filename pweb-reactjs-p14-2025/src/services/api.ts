// src/services/api.ts

import axios from 'axios';

// GANTI DENGAN URL API-mu yang dari Modul 3
const API_URL = 'http://localhost:3000'; // <--- SESUAIKAN INI

const api = axios.create({
  baseURL: API_URL,
});

// Ini bagian penting: Interceptor
// Kode ini akan berjalan SETIAP KALI ada request API
api.interceptors.request.use(
  (config) => {
    // Ambil token dari local storage
    const token = localStorage.getItem('authToken');
    
    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;