// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Import halaman-halaman (NANTI KITA BUAT)
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './pages/AddBook';

// Placeholder untuk halaman Orang 2 & 3 (biar tidak error)
// Nanti ini akan diganti file asli oleh mereka
const BookList = () => <div style={{padding: '20px'}}>Halaman List Buku (Tugas Orang 2)</div>;
const BookDetail = () => <div style={{padding: '20px'}}>Halaman Detail Buku (Tugas Orang 2)</div>;
const TransactionList = () => <div style={{padding: '20px'}}>Halaman List Transaksi (Tugas Orang 3)</div>;
const TransactionDetail = () => <div style={{padding: '20px'}}>Halaman Detail Transaksi (Tugas Orang 3)</div>;


function App() {
  return (
    <Routes>
      {/* Rute Publik (Login, Register) */}
      {/* Halaman ini tidak pakai Navbar */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      {/* Rute yang menggunakan Layout (punya Navbar) */}
      <Route path="/" element={<Layout />}>
        {/* Halaman utama langsung di '/' */}
        <Route index element={<BookList />} /> 
        <Route path="/books/:id" element={<BookDetail />} />
        
        {/* Rute yang HANYA bisa diakses setelah login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transactions/:id" element={<TransactionDetail />} />
        </Route>
      </Route>
      
      {/* Rute jika halaman tidak ditemukan */}
      <Route path="*" element={
        <Layout>
          <div style={{padding: '20px'}}>404 Not Found</div>
        </Layout>
      } /> 
    </Routes>
  );
}

export default App;