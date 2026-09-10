/**
 * ============================================================
 *  SMARTBUY — CATÁLOGO DE PRODUCTOS
 * ============================================================
 *  👉 MANTENIMIENTO DEL CATÁLOGO:
 *  Este es el ÚNICO archivo que necesitas editar para
 *  agregar, editar o eliminar productos de la tienda.
 *
 *  Para AGREGAR un producto: copia un bloque { ... } y edítalo.
 *  Para ELIMINAR un producto: borra su bloque completo.
 *  Para EDITAR: cambia nombre, precio, descripción, etc.
 *
 *  Campos:
 *  - id:          identificador único (texto sin espacios)
 *  - name:        nombre del producto
 *  - price:       precio en USD (número)
 *  - description: descripción corta
 *  - category:    "Wearables" | "Moda Urbana" | "Accesorios"
 *  - badge:       "Nuevo" | "Trending" | null
 *  - image:       ruta de la imagen (ponla en public/products/)
 * ============================================================
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Wearables' | 'Moda Urbana' | 'Accesorios';
  badge: 'Nuevo' | 'Trending' | null;
  image: string;
  images?: string[];    // Galería completa (opcional)
}

export const PRODUCTS: Product[] = [
  {
    id: 'smart-glasses-x1',
    name: 'Smart Glasses X1',
    price: 89.99,
    description: 'Lentes inteligentes con HUD translúcido, notificaciones en tiempo real y marco de titanio ultraligero.',
    category: 'Wearables',
    badge: 'Trending',
    image: '/products/smart-glasses.jpg',
    images: [
    '/products/smart-glasses.jpg',
    '/products/smart-glasses-2.jpg',
    '/products/smart-glasses-3.jpg',
  ],
  },
  {
    id: 'carretlla',
    name: 'Carretilla de Compras',
    price: 10.00,
    description: 'Carretilla para compras...',
    category: 'Moda Urbana',
    badge: 'Trending',
    image: '/products/caja de 16.jpeg',
    images: [
    '/products/caja de 16.jpeg',
    '/products/caja de 16.jpeg',
    '/products/caja de 16.jpeg',
  ],
  },
  {
    id: 'sneakers-autofit',
    name: 'Sneakers AutoFit Pro',
    price: 159.99,
    description: 'Sistema de autoajuste inteligente, suela iluminada y amortiguación adaptativa para la ciudad.',
    category: 'Moda Urbana',
    badge: 'Nuevo',
    image: '/products/sneakers.jpg',
    images: [
    '/products/smart-glasses.jpg',
    '/products/smart-glasses-2.jpg',
    '/products/smart-glasses-3.jpg',
  ],
  },
  {
    id: 'mochila-solar-volt',
    name: 'Mochila Solar Volt',
    price: 99.99,
    description: 'Panel solar flexible integrado con carga USB-C rápida y batería de 20,000 mAh incorporada.',
    category: 'Accesorios',
    badge: null,
    image: '/products/solar-backpack.jpg',
    images: [
    '/products/smart-glasses.jpg',
    '/products/smart-glasses-2.jpg',
    '/products/smart-glasses-3.jpg',
  ],
  },
  {
    id: 'smartwatch-pulse',
    name: 'Smartwatch Pulse S',
    price: 119.99,
    description: 'Pantalla AMOLED borde a borde, monitoreo de salud 24/7 y 14 días de batería.',
    category: 'Wearables',
    badge: 'Trending',
    image: '/products/smartwatch.jpg',
    images: [
    '/products/smart-glasses.jpg',
    '/products/smart-glasses-2.jpg',
    '/products/smart-glasses-3.jpg',
  ],
  },
  {
    id: 'gorra-holo-street',
    name: 'Gorra Holo Street',
    price: 39.99,
    description: 'Gorra urbana premium con parche holográfico que cambia de color según el ángulo de luz.',
    category: 'Moda Urbana',
    badge: null,
    image: '/products/holo-cap.jpg',
    images: [
    '/products/smart-glasses.jpg',
    '/products/smart-glasses-2.jpg',
    '/products/smart-glasses-3.jpg',
  ],
  },
  {
    id: 'earbuds-neon-air',
    name: 'Earbuds Neon Air',
    price: 69.99,
    description: 'Cancelación de ruido activa, aro LED personalizable y 30 horas de reproducción total.',
    category: 'Wearables',
    badge: 'Nuevo',
    image: '/products/led-earbuds.jpg',
    images: [
    '/products/smart-glasses.jpg',
    '/products/smart-glasses-2.jpg',
    '/products/smart-glasses-3.jpg',
  ],
  },
  {
    id: 'anillo-smart-orbit',
    name: 'Smart Ring Orbit',
    price: 79.99,
    description: 'Anillo de titanio con sensores de sueño, ritmo cardíaco y pagos sin contacto NFC.',
    category: 'Wearables',
    badge: 'Nuevo',
    image: '/products/smart-ring.jpg',
    images: [
    '/products/smart-glasses.jpg',
    '/products/smart-glasses-2.jpg',
    '/products/smart-glasses-3.jpg',
  ],
  },
  {
    id: 'visor-vr-nebula',
    name: 'Visor VR Nebula',
    price: 249.99,
    description: 'Realidad virtual ultraligera con visor panorámico y seguimiento ocular de precisión.',
    category: 'Wearables',
    badge: null,
    image: '/products/vr-headset.jpg',
    images: [
    '/products/smart-glasses.jpg',
    '/products/smart-glasses-2.jpg',
    '/products/smart-glasses-3.jpg',
  ],
  },
  {
    id: 'hoodie-cyber-circuit',
    name: 'Hoodie Cyber Circuit',
    price: 74.99,
    description: 'Hoodie oversize con estampado reflectivo de circuitos que brilla bajo luz UV.',
    category: 'Moda Urbana',
    badge: 'Trending',
    image: '/products/cyber-hoodie.jpg',
    images: [
    '/products/smart-glasses.jpg',
    '/products/smart-glasses-2.jpg',
    '/products/smart-glasses-3.jpg',
  ],
  },
];

/** Categorías disponibles (se generan automáticamente del catálogo) */
export const CATEGORIES = ['Todos', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

/** Número de WhatsApp de la tienda (formato internacional sin "+") */
export const WHATSAPP_NUMBER = '50378195474';
