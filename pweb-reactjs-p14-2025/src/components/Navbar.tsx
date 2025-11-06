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

  // Styling sederhana
  const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ccc',
  };

  const linkStyle: React.CSSProperties = {
    margin: '0 10px',
    textDecoration: 'none',
    color: 'blue',
  };

  return (
    <nav style={navStyle}>
      {/* Link di sisi kiri */}
      <div>
        <Link to="/" style={linkStyle}>
          IT Literature Shop
        </Link>
        
        {/* Tampilkan link ini HANYA jika sudah login */}
        {isAuthenticated && (
          <>
            <Link to="/transactions" style={linkStyle}>
              Transaksi
            </Link>
            <Link to="/add-book" style={linkStyle}>
              Tambah Buku
            </Link>
          </>
        )}
      </div>

      {/* Info user di sisi kanan */}
      <div>
        {/* Gunakan conditional rendering */}
        {isAuthenticated ? (
          // === JIKA SUDAH LOGIN ===
          <>
            <span style={{ marginRight: '15px' }}>
              Hi, {user?.email} {/* Menampilkan email user */}
            </span>
            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          // === JIKA BELUM LOGIN ===
          <>
            <Link to="/auth/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/auth/register" style={linkStyle}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;