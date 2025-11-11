// src/pages/TransactionList.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import EmptyState from '../components/EmptyState';

// Tipe data Transaksi (sesuai API response)
interface Transaction {
  id: string;
  created_at: string;
  user_id: string;
  order_items: Array<{
    id: string;
    quantity: number;
    books: {
      title: string;
      price: string;
    }
  }>;
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
        // Sort params (backend might not support, so we'll sort client-side)
        // params.append('sort', sort);

        // Panggil API (Otomatis pakai token)
        const response = await api.get('/transactions', { params });

        if (response.data && response.data.data) {
          let txData = response.data.data;
          
          // Client-side sorting karena API mungkin tidak support
          const [orderBy, order] = sort.split('-');
          if (orderBy === 'createdAt') {
            txData = [...txData].sort((a, b) => {
              const dateA = new Date(a.created_at).getTime();
              const dateB = new Date(b.created_at).getTime();
              return order === 'desc' ? dateB - dateA : dateA - dateB;
            });
          } else if (orderBy === 'amount') {
            txData = [...txData].sort((a, b) => {
              const amountA = a.order_items?.reduce((sum: number, item: any) => 
                sum + (Number(item.books.price) * item.quantity), 0) || 0;
              const amountB = b.order_items?.reduce((sum: number, item: any) => 
                sum + (Number(item.books.price) * item.quantity), 0) || 0;
              return order === 'desc' ? amountB - amountA : amountA - amountB;
            });
          }
          
          setTransactions(txData);
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
            {transactions.map((tx) => {
              // Hitung total amount dari order_items
              const totalAmount = tx.order_items?.reduce((sum, item) => {
                return sum + (Number(item.books.price) * item.quantity);
              }, 0) || 0;

              return (
                <tr key={tx.id}>
                  <td style={tableCell}>{tx.id}</td>
                  <td style={tableCell}>{new Date(tx.created_at).toLocaleString('id-ID')}</td>
                  <td style={tableCell}>Rp {totalAmount.toLocaleString('id-ID')}</td>
                  <td style={tableCell}>
                    <Link to={`/transactions/${tx.id}`}>Lihat Detail</Link>
                  </td>
                </tr>
              );
            })}
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