import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '@/context/CartContext';

/** Barra de navegación fija con efecto glassmorphism */
export default function Navbar() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="fixed top-0 inset-x-0 z-40 glass border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo + nombre */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="SmartBuy"
            className="w-10 h-10 rounded-full ring-1 ring-electric/40 group-hover:ring-electric transition-shadow"
          />
          <span className="font-display font-bold text-lg tracking-tight">
            Smart<span className="text-electric">Buy</span>
          </span>
        </Link>

        {/* Botón carrito con badge de cantidad */}
        <button
          onClick={openCart}
          aria-label="Abrir carrito"
          className="relative p-2.5 rounded-full glass hover:bg-white/10 transition-colors"
        >
          <ShoppingBag className="w-5 h-5 text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-electric text-white text-[11px] font-bold flex items-center justify-center glow-blue">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}