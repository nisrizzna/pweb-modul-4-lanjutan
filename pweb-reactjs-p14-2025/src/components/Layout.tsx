import React from 'react';
import { Outlet } from 'react-router-dom'; // 1. Import Outlet

// 2. Definisikan tipe props agar bisa menerima 'children'
//    Kita buat opsional (pakai '?') karena rute utama tidak mengirim 'children'
type LayoutProps = {
  children?: React.ReactNode;
};

// 3. Terima { children } sebagai prop
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      {/* Navbar Anda bisa ditaruh di sini */}
      <nav style={{ padding: '10px', background: '#eee' }}>
        Ini Navbar (dari Layout)
      </nav>

      {/* Konten Halaman */}
      <main>
        {/* 4. Tampilkan 'children' JIKA ADA (ini untuk halaman 404 Anda)
             JIKA TIDAK, tampilkan <Outlet /> (ini untuk rute nested seperti BookList)
        */}
        {children ? children : <Outlet />}
      </main>
    </div>
  );
};

export default Layout;