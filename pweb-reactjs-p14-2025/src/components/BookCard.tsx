// src/components/BookCard.tsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import  deleter  from "../services/api";

type Props = {
  book: any;
  onDeleteSuccess: () => void; // Fungsi untuk refresh list
};

export default function BookCard({ book, onDeleteSuccess }: Props) {
  const { addToCart } = useCart();

  const handleDelete = async () => {
    // 1. Konfirmasi
    if (!window.confirm(`Yakin ingin menghapus "${book.title}"?`)) {
      return;
    }

    try {
      // 2. Ambil token
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda harus login untuk menghapus buku.");
        return;
      }

      // 3. Panggil API
      await deleter(`/books/${book.id}`); // ✅ BENAR, Interceptor akan menangani token
      
      // 4. Beri tahu parent (BooksList) untuk refresh
      alert("Buku berhasil dihapus.");
      onDeleteSuccess();
    } catch (err: any) {
      alert(`Gagal menghapus: ${err.message}`);
    }
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <Link to={`/books/${book.id}`}>
          <h3 className="font-bold text-lg truncate">{book.title}</h3>
        </Link>
        <p className="text-gray-600">{book.writer}</p>
        <p className="text-xl font-semibold">Rp {book.price.toLocaleString()}</p>
        <p className="text-sm">Stok: {book.stock_quantity}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => addToCart(book)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
        >
          + Keranjang
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}