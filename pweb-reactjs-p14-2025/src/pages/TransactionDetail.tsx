// src/pages/TransactionDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

// Tipe data detail (termasuk item buku)
interface TransactionItem {
  id: string;
  quantity: number;
  book: { // Asumsi API mengembalikan data buku
    id: string;
    title: string;
    price: number;
  }
}

interface TransactionDetail {
  id: string;
  amount: number;
  createdAt: string;
  items: TransactionItem[]; // Array berisi buku yang dibeli
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

  if (loading) return <p>Loading data transaksi...</p>; // Nanti dipercantik
  if (error) return <p style={{ color: 'red' }}>{error}</p>; // Nanti dipercantik
  if (!tx) return <p>Transaksi tidak ditemukan.</p>; // Empty state

  return (
    <div>
      <Link to="/transactions">{"< Kembali ke Riwayat"}</Link>
      <h2>Detail Transaksi: {tx.id}</h2>
      <p>Tanggal: {new Date(tx.createdAt).toLocaleString('id-ID')}</p>
      <h3>Total Pembayaran: Rp {tx.amount.toLocaleString('id-ID')}</h3>

      <hr />

      <h3>Item yang Dibeli:</h3>
      {tx.items.length > 0 ? (
        tx.items.map(item => (
          <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <p><strong>Buku:</strong> {item.book.title}</p>
            <p><strong>Harga:</strong> Rp {item.book.price.toLocaleString('id-ID')}</p>
            <p><strong>Kuantitas:</strong> {item.quantity}</p>
            <p><strong>Subtotal:</strong> Rp {(item.book.price * item.quantity).toLocaleString('id-ID')}</p>
          </div>
        ))
      ) : (
        <p>Tidak ada item dalam transaksi ini.</p>
      )}
    </div>
  );
};

export default TransactionDetail;