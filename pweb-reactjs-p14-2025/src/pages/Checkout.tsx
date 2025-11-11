// src/pages/Checkout.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { poster } from '../services/api';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hitung total harga
  const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setError('Keranjang kosong. Tambahkan buku terlebih dahulu.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Format data sesuai API: items: [{ bookId, quantity }]
      const items = cart.map(item => ({
        bookId: item.id,
        quantity: item.qty
      }));

      // Kirim ke API
      await poster('/transactions', { items });

      // Jika sukses, kosongkan cart dan redirect
      clearCart();
      alert('Transaksi berhasil dibuat!');
      navigate('/transactions');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Gagal membuat transaksi. Coba lagi.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Keranjang Belanja</h2>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Keranjang Anda kosong</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Mulai Belanja
          </button>
        </div>
      ) : (
        <>
          {/* List Item di Keranjang */}
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.writer}</p>
                  <p className="text-lg">Rp {Number(item.price).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Jumlah: {item.qty}</p>
                  <p className="font-bold text-lg">
                    Subtotal: Rp {(Number(item.price) * item.qty).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Tombol Checkout */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Total Pembayaran:</h3>
              <p className="text-3xl font-bold text-blue-600">
                Rp {totalPrice.toLocaleString()}
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Buat Transaksi'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
