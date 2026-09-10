/**
 * Contexto del carrito de compras.
 * Persiste en localStorage para mantener el carrito entre visitas
 * (solo en este navegador; no se sincroniza entre dispositivos).
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product } from '@/data/products';
import { WHATSAPP_NUMBER } from '@/data/products';

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutWhatsApp: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'smartbuy-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  // Persistir carrito en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
    );
  };

  const clear = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.qty * i.product.price, 0);

  /** Construye el mensaje pre-formateado y abre WhatsApp */
  const checkoutWhatsApp = () => {
    const lines = items
      .map(
        (i) =>
          `• ${i.qty}x ${i.product.name} - $${i.product.price.toFixed(2)} c/u`
      )
      .join('\n');
    const message = `Hola SmartBuy 👋

Quiero consultar/comprar:

${lines}

Total: $${totalPrice.toFixed(2)}

¿Disponibilidad y envío?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        setQty,
        clear,
        totalItems,
        totalPrice,
        checkoutWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
