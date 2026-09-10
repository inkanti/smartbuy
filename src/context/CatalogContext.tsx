/**
 * Contexto del catálogo de productos.
 *
 * - Por defecto usa el catálogo base de src/data/products.ts
 * - Si el administrador edita el catálogo desde /admin, los cambios
 *   se guardan en localStorage y tienen prioridad sobre el catálogo base.
 * - IMPORTANTE: al ser una tienda 100% frontend, los cambios del panel
 *   se guardan solo en ESTE navegador. Para cambios permanentes para
 *   todos los visitantes, edita src/data/products.ts y republica.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { PRODUCTS, type Product } from '@/data/products';

const STORAGE_KEY = 'smartbuy-catalog';

interface CatalogContextValue {
  products: Product[];
  categories: string[];
  getProduct: (id: string) => Product | undefined;
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetCatalog: () => void;
  isCustomized: boolean;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [override, setOverride] = useState<Product[] | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const products = override ?? PRODUCTS;
  const categories = ['Todos', ...Array.from(new Set(products.map((p) => p.category)))];

  // Persistir cambios del administrador
  useEffect(() => {
    if (override) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(override));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [override]);

  const getProduct = (id: string) => products.find((p) => p.id === id);

  /** Crea o actualiza un producto (si el id ya existe, lo reemplaza) */
  const upsertProduct = (product: Product) => {
    setOverride((prev) => {
      const list = prev ?? [...PRODUCTS];
      const exists = list.some((p) => p.id === product.id);
      return exists
        ? list.map((p) => (p.id === product.id ? product : p))
        : [...list, product];
    });
  };

  const deleteProduct = (id: string) => {
    setOverride((prev) => (prev ?? [...PRODUCTS]).filter((p) => p.id !== id));
  };

  /** Restaura el catálogo base definido en products.ts */
  const resetCatalog = () => setOverride(null);

  return (
    <CatalogContext.Provider
      value={{
        products,
        categories,
        getProduct,
        upsertProduct,
        deleteProduct,
        resetCatalog,
        isCustomized: override !== null,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog debe usarse dentro de CatalogProvider');
  return ctx;
}
