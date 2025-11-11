// src/pages/BookDetail.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getter } from "../services/api";
import { useCart } from "../context/CartContext";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>(); // Ambil ID dari URL
  const { addToCart } = useCart();
  
  const [book, setBook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const response = await getter(`/books/${id}`);
        // getter sudah return response.data.data, jadi langsung set
        setBook(response);
      } catch (err: any) {
        setError(err.message || 'Gagal memuat detail buku');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id]); // Ambil ulang data jika ID berubah

  if (isLoading) return <p>Loading detail buku...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!book) return <p>Buku tidak ditemukan.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
      <p className="text-2xl text-gray-700 mb-4">{book.writer}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl font-semibold mb-4">Rp {book.price.toLocaleString()}</p>
          <p className="mb-2"><strong>Penerbit:</strong> {book.publisher}</p>
          <p className="mb-2"><strong>Tahun Terbit:</strong> {book.publication_year}</p>
          <p className="mb-2"><strong>Genre:</strong> {book.genre?.name || 'N/A'}</p>
          <p className="mb-2"><strong>Stok:</strong> {book.stock_quantity}</p>
          <p className="mt-4 text-gray-800">{book.description || "Tidak ada deskripsi."}</p>
        </div>
        
        <div>
          <div className="border p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Beli Buku</h3>
            <button
              onClick={() => addToCart(book)}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              + Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}