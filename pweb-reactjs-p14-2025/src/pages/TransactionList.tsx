// src/pages/TransactionList.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import EmptyState from '../components/EmptyState';

// Tipe data Transaksi (sesuai API-mu)
interface Transaction {
  id: string; // atau number
  amount: number; // Ini adalah total harga
  createdAt: string; // atau Date
}

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State untuk Search & Sort (Sesuai Prompt)
  const [searchId, setSearchId] = useState('');
  const [sort, setSort] = useState('createdAt-desc');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchId) params.append('id', searchId);

        // API Doc-mu tidak bilang support sort, jadi ini mungkin perlu
        // penyesuaian di backend atau sorting manual di frontend
        const [orderBy, order] = sort.split('-');
        params.append('orderBy', orderBy);
        params.append('order', order);

        // Panggil API (Otomatis pakai token)
        const response = await api.get('/transactions', { params });

        if (response.data && response.data.data) {
          setTransactions(response.data.data);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        setError('Gagal memuat riwayat transaksi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [searchId, sort]); // Akan re-fetch jika searchId atau sort berubah

  // Tampilan state
  if (loading) return <LoadingSpinner />;
  if (error) return <AlertMessage message={error} type="error" />;

  return (
    <div className="page-container">
      <h2 className="page-header">Riwayat Transaksi</h2>

      {/* Kontrol Search & Sort */}
      <div className="form-group" style={{ flexDirection: 'row', gap: '15px' }}>
        <input 
          type="text"
          placeholder="Cari berdasarkan ID Transaksi..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="form-control"
        />
        <select 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
          className="form-control"
        >
          <option value="createdAt-desc">Terbaru</option>
          <option value="createdAt-asc">Terlama</option>
          <option value="amount-desc">Total Termahal</option>
          <option value="amount-asc">Total Termurah</option>
        </select>
      </div>

      {/* Tampilan List Transaksi */}
      {transactions.length === 0 ? (
        <EmptyState message="Belum ada riwayat transaksi." />
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableCell}>ID Transaksi</th>
              <th style={tableCell}>Tanggal</th>
              <th style={tableCell}>Total Harga</th>
              <th style={tableCell}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td style={tableCell}>{tx.id}</td>
                <td style={tableCell}>{new Date(tx.createdAt).toLocaleString('id-ID')}</td>
                <td style={tableCell}>Rp {tx.amount.toLocaleString('id-ID')}</td>
                <td style={tableCell}>
                  <Link to={`/transactions/${tx.id}`}>Lihat Detail</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styling untuk tabel
const tableCell: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left'
};

export default TransactionList;