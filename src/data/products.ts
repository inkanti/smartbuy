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
  category: 'Hogar' | 'Regalos' | 'Accesorios' | 'Herramientas';
  badge: 'Nuevo' | 'Trending' | null;
  image: string;
  images?: string[];    // Galería completa (opcional)
}

export const PRODUCTS: Product[] = [
  {
    id: 'taladro',
    name: 'Taladro',
    price: 35.00,
    description: 'Potente Taladro para trabajo pesado, es de 1100 W, muy potente y vesatil...',
    category: 'Herramientas',
    badge: 'Trending',
    image: '/products/taladro.jpeg',
    images: [
    '/products/taladro.jpeg',
    '/products/taladro.jpeg',
    '/products/taladro.jpeg',
  ],
  },
  {
    id: 'caja16',
    name: 'Caja de Herramientas',
    price: 10.00,
    description: 'caja de herramientas...',
    category: 'Herramientas',
    badge: 'Trending',
    image: '/products/caja de 16.jpeg',
    images: [
    '/products/caja de 16.jpeg',
    '/products/caja de 16.jpeg',
    '/products/caja de 16.jpeg',
  ],
  },
  {
    id: 'carretilla',
    name: 'Carretilla De Compras',
    price: 10.00,
    description: 'Carretella de compras, muy utiil para las actividades de shoping y mas.',
    category: 'Hogar',
    badge: 'Nuevo',
    image: '/products/carretillas.jpeg',
    images: [
    '/products/carretillas2.jpeg',
    '/products/carretillas2.jpeg',
    '/products/carretillas2.jpeg',
  ],
  },
  {
    id: 'osito',
    name: 'Osito que Cambia de Color',
    price: 8.00,
    description: 'Osito luminoso con diferentes que cambia de color cada vez que lo tocan.',
    category: 'Regalos',
    badge: null,
    image: '/products/osito.jpeg',
    images: [
    '/products/osito.jpeg',
    '/products/osito.jpeg',
    '/products/osito.jpeg',
  ],
  },
  {
    id: 'smartwatch-pulse',
    name: 'Smartwatch Pulse S',
    price: 119.99,
    description: 'Pantalla AMOLED borde a borde, monitoreo de salud 24/7 y 14 días de batería.',
    category: 'Regalos',
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
    category: 'Regalos',
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
    category: 'Regalos',
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
    category: 'Regalos',
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
    category: 'Regalos',
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
    category: 'Regalos',
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
