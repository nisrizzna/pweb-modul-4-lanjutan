import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// Definisikan tipe props agar bisa menerima 'children'
type LayoutProps = {
  children?: React.ReactNode;
};

// Terima { children } sebagai prop
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Konten Halaman */}
      <main>
        {children ? children : <Outlet />}
      </main>
    </div>
  );
};

export default Layout;