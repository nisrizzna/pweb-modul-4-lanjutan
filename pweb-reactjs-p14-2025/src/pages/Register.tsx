// src/pages/Register.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; // Import api service kita (Langkah 4)

const Register = () => {
  // Sesuai dokumentasimu, kita butuh name, email, password
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 1. Validasi client-side
    if (!email || !password || !name) {
      setError('Nama, email, dan password tidak boleh kosong');
      setLoading(false);
      return;
    }
    // Validasi format email sederhana
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Format email tidak valid');
        setLoading(false);
        return;
    }

    try {
      // 2. Panggil API (sesuai dokumentasimu)
      await api.post('/auth/register', {
        name: name,
        email: email,
        password: password,
      });

      // 3. Jika sukses, arahkan ke halaman Login
      navigate('/auth/login');
    
    } catch (err: any) {
      // Tampilkan error state
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Ambil pesan error dari API
      } else {
        setError('Registrasi gagal. Coba lagi.');
      }
      console.error(err);
    } finally {
      // Tampilkan loading state
      setLoading(false);
    }
  };

  // Styling (bisa disamakan dengan Login)
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px 0' }}>
          <label>Nama:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        
        {/* Tampilkan error jika ada */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {/* Tombol Register (nonaktif saat loading) */}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
      <p style={{marginTop: '15px'}}>
        Sudah punya akun? <Link to="/auth/login">Login di sini</Link>
      </p>
    </div>
  );
};

export default Register;