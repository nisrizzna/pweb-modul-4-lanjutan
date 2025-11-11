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

// Types
export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  writer: string; // API menggunakan 'writer' bukan 'author'
  price: string | number;
  stock_quantity: number;
  description: string;
  genreId: string;
  publisher?: string;
  publication_year?: number;
  genre?: Genre;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CartItem {
  bookId: number;
  quantity: number;
}

export interface Transaction {
  id: string;
  created_at: string;
  user_id: string;
  order_items: Array<{
    id: string;
    quantity: number;
    books: {
      title: string;
      price: string;
      genre: {
        name: string;
      }
    }
  }>;
}

// Helper functions untuk API calls
export const getter = async (endpoint: string) => {
  const response = await api.get(endpoint);
  return response.data.data; // Sesuai format respons API
};

export const poster = async (endpoint: string, data: any) => {
  const response = await api.post(endpoint, data);
  return response.data.data;
};

export const patcher = async (endpoint: string, data: any) => {
  const response = await api.patch(endpoint, data);
  return response.data.data;
};

export const deleter = async (endpoint: string) => {
  const response = await api.delete(endpoint);
  return response.data.data;
};

export default api;