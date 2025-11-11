// src/pages/TransactionDetail.tsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

// Tipe data detail (sesuai API response)
interface OrderItem {
  id: string;
  quantity: number;
  books: {
    title: string;
    price: string;
    genre: {
      name: string;
    }
  }
}

interface TransactionDetail {
  id: string;
  created_at: string;
  user_id: string;
  order_items: OrderItem[];
}

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>(); // Ambil 'id' dari URL
  const [tx, setTx] = useState<TransactionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTxDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/transactions/${id}`);
        if (response.data && response.data.data) {
          setTx(response.data.data);
        } else {
          setError('Transaksi tidak ditemukan.');
        }
      } catch (err) {
        setError('Gagal memuat data transaksi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTxDetail();
    }
  }, [id]);

  if (loading) return (
    <div className="container mx-auto p-4">
      <p className="text-xl">⏳ Loading data transaksi...</p>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
      <Link to="/transactions" className="text-blue-600 hover:underline mt-4 inline-block">
        ← Kembali ke Riwayat
      </Link>
    </div>
  );
  
  if (!tx) return (
    <div className="container mx-auto p-4">
      <p>Transaksi tidak ditemukan.</p>
      <Link to="/transactions" className="text-blue-600 hover:underline mt-4 inline-block">
        ← Kembali ke Riwayat
      </Link>
    </div>
  );

  // Hitung total amount
  const totalAmount = tx.order_items?.reduce((sum, item) => {
    return sum + (Number(item.books.price) * item.quantity);
  }, 0) || 0;

  return (
    <div className="container mx-auto p-4">
      <Link to="/transactions" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Kembali ke Riwayat
      </Link>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Detail Transaksi</h2>
        <div className="space-y-2">
          <p><strong>ID Transaksi:</strong> {tx.id}</p>
          <p><strong>Tanggal:</strong> {new Date(tx.created_at).toLocaleString('id-ID')}</p>
          <p className="text-xl font-bold text-green-600 mt-4">
            Total Pembayaran: Rp {totalAmount.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Item yang Dibeli:</h3>
        {tx.order_items && tx.order_items.length > 0 ? (
          <div className="space-y-4">
            {tx.order_items.map((item) => {
              const itemPrice = Number(item.books.price);
              const subtotal = itemPrice * item.quantity;
              
              return (
                <div key={item.id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold text-lg">{item.books.title}</p>
                      <p className="text-gray-600">Genre: {item.books.genre.name}</p>
                      <p className="text-gray-600">Harga Satuan: Rp {itemPrice.toLocaleString('id-ID')}</p>
                      <p className="text-gray-600">Kuantitas: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        Rp {subtotal.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">Tidak ada item dalam transaksi ini.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionDetail;