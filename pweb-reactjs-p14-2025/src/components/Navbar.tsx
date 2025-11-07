// src/components/Navbar.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import hook kita

const Navbar = () => {
  // Ambil state dan fungsi dari AuthContext
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fungsi ini akan dipanggil saat tombol Logout diklik
  const handleLogout = () => {
    logout(); // Ini akan menghapus token dari local storage (sesuai Langkah 5)
    
    // Arahkan user kembali ke halaman login (sesuai Langkah 6)
    navigate('/auth/login'); 
  };

  return (
    <nav className="navbar">
      {/* Link di sisi kiri */}
      <div>
        <Link to="/" className="navbar-brand">
          IT Literature Shop
        </Link>
      </div>

      {/* Menu navigasi */}
      <div className="navbar-nav">
        {/* Tampilkan link ini HANYA jika sudah login */}
        {isAuthenticated && (
          <>
            <Link to="/transactions" className="nav-link">
              Transaksi
            </Link>
            <Link to="/add-book" className="nav-link">
              Tambah Buku
            </Link>
          </>
        )}

        {/* Info user di sisi kanan */}
        {isAuthenticated ? (
          // === JIKA SUDAH LOGIN ===
          <>
            <span className="nav-link">
              Hi, {user?.email}
            </span>
            <button onClick={handleLogout} className="form-button" style={{ width: 'auto', padding: '8px 16px' }}>
              Logout
            </button>
          </>
        ) : (
          // === JIKA BELUM LOGIN ===
          <>
            <Link to="/auth/login" className="nav-link">
              Login
            </Link>
            <Link to="/auth/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;