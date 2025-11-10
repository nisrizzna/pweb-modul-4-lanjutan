// src/pages/BooksList.tsx
import { useState, useEffect } from "react";
import { getter } from "../services/api";
import BookCard from "../components/BookCard";

export default function BooksList() {
  const [books, setBooks] = useState([]);
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
      params.append("search", searchTerm);
      params.append("sort", sortBy);
      params.append("page", page.toString());

      const response = await getter(`/books?${params.toString()}`);
      
      // Asumsi API mengembalikan { data: [..], totalPages: X }
      setBooks(response.data); 
      setTotalPages(response.totalPages);
    } catch (err: any) {
      setError(err.message);
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
      {isLoading && <p>Loading buku...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

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