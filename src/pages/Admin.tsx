/**
 * Panel de administración del catálogo (ruta: /#/admin)
 *
 * - Acceso con PIN (cámbialo abajo en ADMIN_PIN).
 * - Permite agregar, editar y eliminar productos sin tocar código.
 * - Los cambios se guardan en localStorage de ESTE navegador.
 *   Para que apliquen a todos los visitantes, edita src/data/products.ts
 *   y republica la tienda (ver GUIA-CATALOGO.md).
 */
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft, Pencil, Trash2, Plus, X, RotateCcw, Lock, Upload,
} from 'lucide-react';
import { useCatalog } from '@/context/CatalogContext';
import type { Product } from '@/data/products';

import { CATEGORIES } from '../data/products';

/** PIN de acceso al panel — cámbialo aquí */
const ADMIN_PIN = '1234';

//const CATEGORY_OPTIONS: Product['category'][] = ['Wearables', 'Moda Urbana', 'Accesorios'];

const CATEGORY_OPTIONS = CATEGORIES.filter(c => c !== 'Todos');

/** Formulario vacío para producto nuevo */
const emptyForm = {
  id: '',
  name: '',
  price: '',
  description: '',
  category: 'Wearables' as Product['category'],
  badge: '' as '' | 'Nuevo' | 'Trending',
  image: '',
};

/** Comprime una imagen subida a JPEG (máx. 900px) como dataURL */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 900 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function Admin() {
  const { products, upsertProduct, deleteProduct, resetCatalog, isCustomized } = useCatalog();
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('smartbuy-admin') === 'ok'
  );
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [form, setForm] = useState<typeof emptyForm | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ---------- Acceso ---------- */
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('smartbuy-admin', 'ok');
      setAuthenticated(true);
    } else {
      setPinError(true);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-carbon text-white flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="glass rounded-2xl p-8 w-full max-w-sm text-center space-y-5"
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-electric/15 flex items-center justify-center">
            <Lock className="w-6 h-6 text-electric" />
          </div>
          <h1 className="font-display font-bold text-xl">Panel de administración</h1>
          <input
            type="password"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setPinError(false);
            }}
            placeholder="PIN de acceso"
            autoFocus
            className={`w-full px-4 py-3 rounded-xl glass text-center text-white placeholder-white/40 outline-none focus:ring-2 transition-shadow ${
              pinError ? 'ring-2 ring-red-500' : 'focus:ring-electric/60'
            }`}
          />
          {pinError && <p className="text-red-400 text-sm">PIN incorrecto.</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-electric hover:bg-electric-dark font-bold text-sm transition-colors glow-blue"
          >
            Entrar
          </button>
          <Link to="/" className="block text-white/40 text-sm hover:text-white">
            Volver a la tienda
          </Link>
        </form>
      </div>
    );
  }

  /* ---------- Formulario ---------- */
  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyForm, id: `producto-${Date.now()}` });
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      id: p.id,
      name: p.name,
      price: String(p.price),
      description: p.description,
      category: p.category,
      badge: p.badge ?? '',
      image: p.image,
    });
  };

  const handleImageUpload = async (file: File | undefined) => {
    if (!file || !form) return;
    const dataUrl = await compressImage(file);
    setForm({ ...form, image: dataUrl });
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    upsertProduct({
      id: form.id,
      name: form.name.trim(),
      price: parseFloat(form.price) || 0,
      description: form.description.trim(),
      category: form.category,
      badge: form.badge === '' ? null : form.badge,
      image: form.image || '/logo.png',
    });
    setForm(null);
  };

  /* ---------- Vista principal ---------- */
  return (
    <div className="min-h-screen bg-carbon text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Encabezado */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a la tienda
            </Link>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">
              Panel de <span className="text-electric">administración</span>
            </h1>
          </div>
          <div className="flex gap-2">
            {isCustomized && (
              <button
                onClick={() => {
                  if (confirm('¿Restaurar el catálogo original? Se perderán tus cambios.')) {
                    resetCatalog();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Restaurar original
              </button>
            )}
            <button
              onClick={openNew}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric hover:bg-electric-dark text-sm font-semibold transition-colors glow-blue"
            >
              <Plus className="w-4 h-4" /> Nuevo producto
            </button>
          </div>
        </div>

        {/* Aviso de persistencia */}
        <p className="glass rounded-xl px-4 py-3 text-sm text-white/50 mb-8">
          Los cambios se guardan en este navegador. Para publicarlos para todos los
          visitantes, aplica los mismos cambios en <code className="text-electric-light">src/data/products.ts</code> y republica.
        </p>

        {/* Lista de productos */}
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="glass rounded-xl p-3 flex items-center gap-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                <p className="text-white/40 text-xs">
                  {p.category} · ${p.price.toFixed(2)}
                  {p.badge && ` · ${p.badge}`}
                </p>
              </div>
              <button
                onClick={() => openEdit(p)}
                aria-label={`Editar ${p.name}`}
                className="p-2.5 rounded-lg glass text-white/60 hover:text-electric-light hover:bg-white/10 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`¿Eliminar "${p.name}"?`)) deleteProduct(p.id);
                }}
                aria-label={`Eliminar ${p.name}`}
                className="p-2.5 rounded-lg glass text-white/60 hover:text-red-400 hover:bg-white/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de formulario */}
      {form && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="glass rounded-2xl p-6 w-full max-w-lg space-y-4 my-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg">
                {editingId ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button
                type="button"
                onClick={() => setForm(null)}
                aria-label="Cerrar"
                className="p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen */}
            <div className="flex items-center gap-4">
              {form.image && (
                <img
                  src={form.image}
                  alt="Vista previa"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              )}
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/20 text-sm text-white/60 hover:border-electric/60 hover:text-white cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                {form.image ? 'Cambiar imagen' : 'Subir imagen'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files?.[0])}
                />
              </label>
            </div>

            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nombre del producto"
              className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-electric/60"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Precio (USD)"
                className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-electric/60"
              />
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as Product['category'] })
                }
                className="w-full px-4 py-3 rounded-xl glass text-sm outline-none bg-carbon focus:ring-2 focus:ring-electric/60"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <select
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value as typeof form.badge })}
              className="w-full px-4 py-3 rounded-xl glass text-sm outline-none bg-carbon focus:ring-2 focus:ring-electric/60"
            >
              <option value="">Sin badge</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Trending">Trending</option>
            </select>

            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descripción breve"
              className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-electric/60 resize-none"
            />

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-electric hover:bg-electric-dark font-bold text-sm transition-colors glow-blue"
            >
              {editingId ? 'Guardar cambios' : 'Agregar producto'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
