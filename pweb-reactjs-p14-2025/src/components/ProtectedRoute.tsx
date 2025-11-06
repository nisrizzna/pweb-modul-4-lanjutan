// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth(); // Ambil status login dari context

    // Jika user sudah login (authenticated), tampilkan konten (Outlet).
    // Jika belum, lempar (redirect) ke halaman /login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;