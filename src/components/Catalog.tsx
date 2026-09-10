import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useCatalog } from '@/context/CatalogContext';
import ProductCard from './ProductCard';
import { useReveal } from '@/hooks/useReveal';

/**
 * Catálogo con filtros por categoría y buscador.
 * Grid asimétrico tipo editorial: algunos productos ocupan doble alto.
 */
export default function Catalog() {
  const [category, setCategory] = useState('Todos');
  const [query, setQuery] = useState('');
  const titleRef = useReveal<HTMLDivElement>();
  const { products, categories } = useCatalog();

  /** Filtrado reactivo por categoría + búsqueda */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = category === 'Todos' || p.category === category;
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [category, query, products]);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      {/* Encabezado */}
      <div ref={titleRef} className="reveal text-center mb-12">
        <span className="text-electric text-sm font-semibold uppercase tracking-[0.3em]">
          Catálogo
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold mt-3">
          Tecnología que se <span className="text-electric text-glow">viste</span>
        </h2>
      </div>

      {/* Buscador + filtros */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-10">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-11 pr-4 py-3 rounded-full glass text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-electric/60 transition-shadow"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-electric text-white glow-blue'
                  : 'glass text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid asimétrico */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:auto-rows-[380px]">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              variant={i % 5 === 0 ? 'tall' : 'normal'}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/40 py-20">
          No se encontraron productos para “{query}”.
        </p>
      )}
    </section>
  );
}
