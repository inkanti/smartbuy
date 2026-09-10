import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useReveal } from '@/hooks/useReveal';

interface Props {
  product: Product;
  /** "tall" crea el efecto asimétrico tipo editorial en desktop */
  variant?: 'normal' | 'tall';
  /** Origen de la navegación para el botón "volver" */
  from?: 'catalog' | 'product';
}

/** Tarjeta de producto con hover 3D y animación de aparición */
export default function ProductCard({ product, variant = 'normal', from = 'catalog' }: Props) {
  const { addItem } = useCart();
  const ref = useReveal<HTMLElement>();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/producto/${product.id}`, { state: { from } });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <article
      ref={ref}
      onClick={handleClick}
      className={`reveal group relative rounded-2xl overflow-hidden glass card-3d cursor-pointer ${
        variant === 'tall' ? 'md:row-span-2' : ''
      }`}
    >
      {/* Imagen */}
      <div className={`relative overflow-hidden ${variant === 'tall' ? 'aspect-[3/4] md:aspect-auto md:h-full md:min-h-[420px]' : 'aspect-square'}`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Badge */}
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
      </div>

      {/* Información */}
      <div className="absolute bottom-0 inset-x-0 p-5">
        <span className="text-[11px] uppercase tracking-widest text-electric-light/80">
          {product.category}
        </span>
        <h3 className="font-display font-semibold text-lg text-white leading-tight mt-1">
          {product.name}
        </h3>
        <p className="text-white/50 text-sm mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-display font-bold text-xl text-white">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            aria-label={`Agregar ${product.name} al carrito`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-electric hover:bg-electric-dark text-white text-sm font-semibold opacity-90 hover:opacity-100 hover:scale-105 transition-all glow-blue"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}