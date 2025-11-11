// src/pages/BooksList.tsx
import { useState, useEffect } from "react";
import { getter } from "../services/api";
import BookCard from "../components/BookCard";

export default function BooksList() {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk fitur
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title_asc"); // title_asc, title_desc, date_asc, date_desc
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fungsi untuk refresh data setelah delete
  const refreshBooks = () => {
    // Memaksa useEffect untuk jalan lagi
    setPage(1); // Reset ke halaman 1
    fetchBooks(); // Panggil fetchBooks secara manual
  };

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Buat query string
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (sortBy) params.append("sort", sortBy);
      params.append("page", page.toString());

      const response = await getter(`/books?${params.toString()}`);
      
      // Response structure: { books: [...], pagination: {...} }
      // getter() sudah return response.data.data
      console.log('API Response:', response); // Debug
      
      if (response.books && Array.isArray(response.books)) {
        // Struktur: { books: [...], pagination: {...} }
        setBooks(response.books);
        setTotalPages(response.pagination?.totalPages || 1);
      } else if (Array.isArray(response)) {
        // Jika langsung array
        setBooks(response);
        setTotalPages(1);
      } else {
        console.error('Unexpected response structure:', response);
        setBooks([]);
        setTotalPages(1);
      }
    } catch (err: any) {
      console.error('Error fetching books:', err);
      let errorMessage = 'Gagal memuat data buku. ';
      
      if (err.response) {
        // Error dari API (4xx, 5xx)
        const status = err.response.status;
        const apiMessage = err.response.data?.message;
        const contentType = err.response.headers?.['content-type'];
        
        // Cek apakah response adalah HTML (backend yang salah)
        if (contentType && contentType.includes('text/html')) {
          errorMessage = '❌ BACKEND YANG SALAH SEDANG RUNNING! Response dari port 3000 adalah HTML (kemungkinan Angular/frontend lain), bukan JSON API. Lihat SOLUSI_BACKEND_SALAH.md';
        } else if (status === 500) {
          errorMessage += '❌ Server Error (500). Kemungkinan: Database belum jalan, migration belum dijalankan, atau backend crash. Cek terminal backend!';
        } else if (status === 404) {
          errorMessage += '❌ Endpoint tidak ditemukan. Pastikan backend API running di port 3000.';
        } else {
          errorMessage += apiMessage || `Error ${status}`;
        }
      } else if (err.request) {
        // Request dibuat tapi tidak ada response
        errorMessage += '❌ Backend tidak merespons. Pastikan Express API server di http://localhost:3000 sudah jalan!';
      } else {
        // Error lainnya
        errorMessage += err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect untuk mengambil data saat state filter/sort/page berubah
  useEffect(() => {
    fetchBooks();
  }, [searchTerm, sortBy, page]); // Dependency array

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Katalog Buku</h1>

      {/* Fitur Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari judul buku..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="title_asc">Judul (A-Z)</option>
          <option value="title_desc">Judul (Z-A)</option>
          <option value="date_asc">Terbit (Terlama)</option>
          <option value="date_desc">Terbit (Terbaru)</option>
        </select>
      </div>

      {/* Loading & Error State */}
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-xl">⏳ Loading buku...</p>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 mb-6 rounded">
          <p className="font-bold text-lg mb-2">⚠️ Terjadi Kesalahan</p>
          <p className="mb-4">{error}</p>
          <div className="bg-white p-4 rounded border border-red-300">
            <p className="font-semibold mb-2">🔧 Langkah debugging:</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Pastikan backend API running di <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:3000</code></li>
              <li>Cek database sudah jalan (PostgreSQL/MySQL)</li>
              <li>Jalankan migration: <code className="bg-gray-200 px-2 py-1 rounded">npm run migrate</code></li>
              <li>Jalankan seeder: <code className="bg-gray-200 px-2 py-1 rounded">npm run seed</code></li>
              <li>Cek log backend untuk error detail</li>
            </ol>
          </div>
          <button 
            onClick={fetchBooks}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            🔄 Coba Lagi
          </button>
        </div>
      )}

      {/* List Buku */}
      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.length > 0 ? (
              books.map((book: any) => (
                <BookCard key={book.id} book={book} onDeleteSuccess={refreshBooks} />
              ))
            ) : (
              <p>Tidak ada buku yang ditemukan.</p> // Empty State
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span className="self-center">
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Berikutnya
            </button>
          </div>
        </>
      )}
    </div>
  );
}