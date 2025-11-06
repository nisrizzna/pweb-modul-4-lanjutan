// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';

// Tipe data untuk user (sesuaikan dengan API-mu)
// Pastikan ini cocok dengan data user yang dikirim API-mu saat login
interface User {
  id: number;
  email: string;
  name: string; 
  // Mungkin ada field lain?
}

// Tipe data untuk Context
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Buat Context-nya
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Buat Provider (pembungkus)
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

  // Cek token & user di local storage saat aplikasi pertama kali load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Gagal parse data user:", error);
        // Jika data user korup, hapus
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    // Simpan ke local storage
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Hapus dari local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  // Cek apakah user sudah terautentikasi (login)
  const isAuthenticated = !!token; // '!!' mengubah string/null menjadi boolean

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Buat Custom Hook (untuk mempermudah pemakaian)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};