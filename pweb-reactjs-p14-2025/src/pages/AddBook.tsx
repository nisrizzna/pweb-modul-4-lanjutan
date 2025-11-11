// src/pages/AddBook.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import EmptyState from '../components/EmptyState';

// Tipe data untuk Genre (sesuai API /genres)
interface Genre {
  id: string; // atau number, sesuaikan dengan API-mu
  name: string;
}

// Tipe data untuk state form
interface BookFormData {
  title: string;
  writer: string; // API menggunakan 'writer' bukan 'author'
  description: string;
  price: number;
  stock: number;
  genreId: string; // ID genre yang dipilih
  
  // Field opsional (dari prompt)
  publisher: string;
  publication_year: number;
  isbn: string;
}

const AddBook = () => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    writer: '',
    description: '',
    price: 0,
    stock: 0,
    genreId: '', // Default kosong
    publisher: '',
    publication_year: new Date().getFullYear(), // Default tahun ini
    isbn: '',
  });
  
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading untuk submit form
  const [genreLoading, setGenreLoading] = useState(true); // Loading untuk fetch genres
  
  const navigate = useNavigate();

  // 1. Fetch data genres untuk dropdown saat halaman dibuka
  useEffect(() => {
    const fetchGenres = async () => {
      setGenreLoading(true);
      setError('');
      try {
        // Panggil endpoint /genres (sesuai dokumentasimu)
        const response = await api.get('/genres');
        
        // Ambil data dari response.data.data
        if (response.data && response.data.data) {
          setGenres(response.data.data);
        } else {
          setGenres([]); // Empty state
        }
      } catch (err) {
        console.error('Gagal fetch genres:', err);
        setError('Gagal memuat data genre. Coba refresh halaman.');
      } finally {
        setGenreLoading(false);
      }
    };

    fetchGenres();
  }, []); // [] = hanya jalan sekali saat halaman di-load

  // 2. Handle perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Konversi ke number jika tipenya number
      [name]: e.target.type === 'number' ? Number(value) : value,
    }));
  };

  // 3. Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validasi client-side
    const { title, writer, description, price, stock, genreId } = formData;
    if (!title || !writer || !description || !genreId || price <= 0 || stock < 0) {
      setError('Field wajib (Title, Writer, Description, Genre, Price, Stock) harus diisi dengan benar.');
      setLoading(false);
      return;
    }

    try {
      // Kirim data ke API (sesuai dokumentasimu)
      await api.post('/books', {
        title: formData.title,
        writer: formData.writer,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        genreId: formData.genreId, // Pastikan tipe datanya sesuai (string/number)
        
        // Kirim field opsional jika diisi
        publisher: formData.publisher || undefined,
        publication_year: formData.publication_year || undefined,
        isbn: formData.isbn || undefined,
      });

      // Jika sukses, arahkan ke halaman utama
      navigate('/');
    
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Ambil pesan error dari API
      } else {
        setError('Gagal menambahkan buku. Coba lagi.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="form-container">
      <h2 className="page-header">Tambah Buku Baru</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Field Wajib */}
        <div className="form-group">
          <label>Judul Buku (Title):*</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Penulis (Writer):*</label> 
          <input type="text" name="writer" value={formData.writer} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Deskripsi:*</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
        </div>
        <div className="form-group">
          <label>Harga (Price):*</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" />
        </div>
        <div className="form-group">
          <label>Stok (Stock):*</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" />
        </div>
        
        {/* Dropdown Genre */}
        <div className="form-group">
          <label>Genre:*</label>
          {genreLoading ? (
            <LoadingSpinner />
          ) : (
            <select name="genreId" value={formData.genreId} onChange={handleChange} required>
              <option value="" disabled>Pilih Genre</option>
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))
              ) : (
                <EmptyState message="Tidak ada genre tersedia" />
              )}
            </select>
          )}
        </div>

        {/* Field Opsional */}
        <hr style={{margin: '20px 0'}}/>
        <h3>Data Opsional</h3>

        <div className="form-group">
          <label>Penerbit (Publisher):</label>
          <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Tahun Publikasi:</label>
          <input type="number" name="publication_year" value={formData.publication_year} onChange={handleChange} max={new Date().getFullYear()} />
        </div>
        <div className="form-group">
          <label>ISBN:</label>
          <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} />
        </div>
        
        {/* Error message */}
        {error && <AlertMessage message={error} type="error" />}
        
        <button type="submit" disabled={loading || genreLoading} className="form-button">
          {loading ? 'Menyimpan...' : 'Simpan Buku'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;