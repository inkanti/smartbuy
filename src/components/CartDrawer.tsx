import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

/** Drawer lateral del carrito, deslizable desde la derecha */
export default function CartDrawer() {
  const { items, isOpen, closeCart, setQty, removeItem, totalPrice, checkoutWhatsApp } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel lateral */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-carbon border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="font-display font-bold text-lg">Tu carrito</h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <p className="text-white/40 text-center py-16">
              Tu carrito está vacío.
              <br />
              <span className="text-sm">Explora el catálogo y agrega productos.</span>
            </p>
          ) : (
            items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-4 glass rounded-xl p-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
                    <button
                      onClick={() => removeItem(product.id)}
                      aria-label={`Eliminar ${product.name}`}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-electric-light text-sm font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  {/* Control de cantidad */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => setQty(product.id, qty - 1)}
                      aria-label="Disminuir cantidad"
                      className="w-7 h-7 rounded-full glass flex items-center justify-center hover:bg-white/10"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      aria-label="Aumentar cantidad"
                      className="w-7 h-7 rounded-full glass flex items-center justify-center hover:bg-white/10"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pie con total y checkout por WhatsApp */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Total</span>
              <span className="font-display font-bold text-2xl">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={checkoutWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-whatsapp hover:bg-whatsapp-dark text-white font-bold text-sm tracking-wide transition-colors glow-green"
            >
              <MessageCircle className="w-5 h-5" />
              Consulta, Compara y Compra
            </button>
            <p className="text-center text-white/30 text-xs">
              Te redirigiremos a WhatsApp con tu pedido listo para enviar.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
