// src/components/ProtectedRoute.tsx

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth(); // Ambil status login dari context

    // Jika user sudah login (authenticated), tampilkan konten (Outlet).
    // Jika belum, lempar (redirect) ke halaman /auth/login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;