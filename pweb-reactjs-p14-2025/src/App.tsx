// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Import halaman-halaman
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './pages/AddBook';
import BooksList from './pages/BooksList';
import BookDetail from './pages/BookDetail';
import Checkout from './pages/Checkout';
import TransactionList from './pages/TransactionList';
import TransactionDetail from './pages/TransactionDetail';


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
        <Route index element={<BooksList />} /> 
        <Route path="/books/:id" element={<BookDetail />} />
        
        {/* Rute yang HANYA bisa diakses setelah login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transactions/:id" element={<TransactionDetail />} />
        </Route>

        {/* Rute jika halaman tidak ditemukan */}
        <Route path="*" element={
          <div style={{padding: '20px'}}>404 Not Found</div>
        } />
      </Route>
    </Routes>
  );
}

export default App;