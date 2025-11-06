// src/components/Layout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px' }}>
        {/* Konten halaman (Login, Register, List Buku) akan dirender di sini */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;