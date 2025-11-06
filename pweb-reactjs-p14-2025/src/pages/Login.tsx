// src/pages/Login.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; // Import api service kita (Langkah 4)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Ambil fungsi login dari context (Langkah 5)
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 1. Validasi client-side
    if (!email || !password) {
      setError('Email dan password tidak boleh kosong');
      setLoading(false);
      return;
    }

    try {
      // 2. Panggil API (sesuai dokumentasimu)
      const response = await api.post('/auth/login', {
        email: email,
        password: password,
      });

      // 3. Ambil data dari respons API (SESUAI DOKUMENTASIMU)
      // Kita ambil 'data' dari 'response.data'
      const responseData = response.data.data; 
      
      // Kita asumsikan 'responseData' berisi 'user' dan 'token'
      // Jika key-nya beda (misal 'user' dan 'accessToken'), sesuaikan di sini
      const { user, token } = responseData; 

      // 4. Simpan ke context dan local storage
      login(user, token);

      // 5. Arahkan ke halaman utama (list buku)
      navigate('/'); 
    
    } catch (err: any) {
      // Tampilkan error state
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Ambil pesan error dari API
      } else {
        setError('Login gagal. Cek kembali email dan password Anda.');
      }
      console.error(err);
    } finally {
      // Tampilkan loading state
      setLoading(false);
    }
  };

  // Styling sederhana
  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  return (
    <div style={formStyle}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px 0' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%' }}
            required // Tambahan validasi HTML5
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%' }}
            required // Tambahan validasi HTML5
          />
        </div>
        
        {/* Tampilkan error jika ada */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {/* Tombol Login (nonaktif saat loading) */}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p style={{marginTop: '15px'}}>
        Belum punya akun? <Link to="/auth/register">Register di sini</Link>
      </p>
    </div>
  );
};

export default Login;