// src/context/CartContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

// Tipe untuk item di keranjang (Buku + kuantitas)
type CartItem = any & { qty: number };

// Tipe untuk nilai context
type CartContextType = {
  cart: CartItem[];
  addToCart: (book: any) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook kustom untuk memakai context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus dipakai di dalam CartProvider");
  }
  return context;
}

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Logika untuk menambah item ke keranjang
  const addToCart = (book: any) => {
    setCart((prevCart) => {
      // Cek apakah buku sudah ada di keranjang
      const existingItem = prevCart.find((item) => item.id === book.id);

      if (existingItem) {
        // Jika ada, tambah kuantitasnya
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        // Jika tidak ada, tambahkan sebagai item baru
        return [...prevCart, { ...book, qty: 1 }];
      }
    });
    alert(`${book.title} ditambahkan ke keranjang!`);
  };

  // Logika untuk mengosongkan keranjang (setelah checkout)
  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}