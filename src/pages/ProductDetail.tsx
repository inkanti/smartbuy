//import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Minus, Plus, ShoppingBag, MessageCircle, ZoomIn } from 'lucide-react';
import { useCatalog } from '@/context/CatalogContext';
import { useCart } from '@/context/CartContext';
import { WHATSAPP_NUMBER } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ImageGallery from '@/components/ImageGallery';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation(); // ← NUEVO: para saber de dónde venimos
  const { getProduct, products } = useCatalog();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [showGallery, setShowGallery] = useState(false);

  const product = id ? getProduct(id) : undefined;

  // ← NUEVO: Detectar si venimos del catálogo o de otro producto
  const fromCatalog = location.state?.from === 'catalog';
  const fromProduct = location.state?.from === 'product';

  if (!product) {
    return (
      <div className="min-h-screen bg-carbon text-white flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-white/50">Producto no encontrado.</p>
        <Link to="/" className="text-electric hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const consultWhatsApp = () => {
    const message = `Hola SmartBuy 👋

Me interesa:

• ${qty}x ${product.name} - $${product.price.toFixed(2)} c/u

Total: $${(qty * product.price).toFixed(2)}

¿Disponibilidad y envío?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
  };

  // ← NUEVO: Función de volver inteligente
  const handleBack = () => {
    if (fromCatalog) {
      // Si venimos del catálogo, volver al catálogo
      navigate('/catalogo');
    } else if (fromProduct) {
      // Si venimos de otro producto, volver al catálogo también
      // (para evitar el ciclo infinito de productos relacionados)
      navigate('/catalogo');
    } else {
      // Fallback: volver atrás en el historial
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-carbon text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Botón Volver - ahora siempre va al catálogo si venimos de ahí */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </button>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Imagen con clic para abrir galería */}
          <div 
            className="relative rounded-2xl overflow-hidden glass cursor-pointer group"
            onClick={() => setShowGallery(true)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-md">
                <ZoomIn className="w-8 h-8" />
              </div>
            </div>

            {product.badge && (
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  product.badge === 'Nuevo'
                    ? 'bg-electric text-white glow-blue'
                    : 'bg-white/10 text-electric-light border border-electric/40 backdrop-blur-md'
                }`}
              >
                {product.badge}
              </span>
            )}

            {productImages.length > 1 && (
              <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5" />
                {productImages.length} fotos
              </span>
            )}
          </div>

          {/* Información */}
          <div className="flex flex-col justify-center">
            <span className="text-electric text-sm font-semibold uppercase tracking-[0.25em]">
              {product.category}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold mt-3 leading-tight">
              {product.name}
            </h1>
            <p className="text-white/60 text-lg mt-5 leading-relaxed">
              {product.description}
            </p>

            <span className="font-display font-bold text-4xl mt-8">
              ${product.price.toFixed(2)}
              <span className="text-base text-white/40 font-normal ml-2">USD</span>
            </span>

            <div className="flex items-center gap-4 mt-8">
              <span className="text-white/50 text-sm">Cantidad</span>
              <div className="flex items-center gap-3 glass rounded-full px-2 py-1.5">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Disminuir cantidad"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold w-6 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  aria-label="Aumentar cantidad"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-electric hover:bg-electric-dark font-bold text-sm tracking-wide transition-colors glow-blue"
              >
                <ShoppingBag className="w-5 h-5" />
                Agregar al carrito
              </button>
              <button
                onClick={consultWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-whatsapp hover:bg-whatsapp-dark font-bold text-sm tracking-wide transition-colors glow-green"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar por WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Productos relacionados - ahora con state para tracking */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
              También te puede <span className="text-electric text-glow">interesar</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} from="product" />
              ))}
            </div>
          </section>
        )}
      </div>

      {showGallery && (
        <ImageGallery
          images={productImages}
          productName={product.name}
          badge={product.badge}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}