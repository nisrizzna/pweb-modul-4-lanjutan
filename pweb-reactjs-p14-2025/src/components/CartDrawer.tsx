// src/components/CartDrawer.tsx
import { useCart } from "../context/CartContext";
import  poster  from "../services/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { cart, clearCart } = useCart();
  const token = localStorage.getItem("token");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!token) {
      alert("Harap login untuk checkout.");
      return;
    }

    try {
      // 1. Format data untuk API
      const items = cart.map((item) => ({
        book_id: item.id,
        qty: item.qty,
      }));

      // 2. Panggil API
      await poster("/transactions", { items }, token);

      // 3. Jika sukses
      alert("Checkout sukses! Transaksi sedang diproses.");
      clearCart();
      onClose();
    } catch (err: any) {
      alert(`Checkout gagal: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50" 
      onClick={onClose}
    >
      {/* Drawer */}
      <div
        className="bg-white w-full max-w-md ml-auto h-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Mencegah drawer tertutup saat diklik
      >
        <h2 className="text-2xl font-bold mb-4">Keranjang ({cart.length})</h2>
        
        {cart.length === 0 ? (
          <p>Keranjang kosong.</p>
        ) : (
          <>
            {/* Daftar Item */}
            <div className="flex-grow overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between border-b py-2">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm">
                      Rp {item.price.toLocaleString()} × {item.qty}
                    </p>
                  </div>
                  <p className="font-bold">
                    Rp {(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Total & Checkout */}
            <div className="mt-6 border-t pt-4">
              <p className="text-xl font-bold flex justify-between">
                <span>Total:</span>
                <span>Rp {total.toLocaleString()}</span>
              </p>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded mt-4 hover:bg-green-700"
              >
                Checkout Sekarang
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}