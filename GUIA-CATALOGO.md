# SmartBuy — Guía de mantenimiento del catálogo

## Opción 1: Panel de administración (sin código)

Entra a `/#/admin` en tu tienda (PIN por defecto: **1234** — cámbialo en
`src/pages/Admin.tsx`, constante `ADMIN_PIN`).

Desde el panel puedes agregar, editar y eliminar productos, y subir imágenes
desde tu dispositivo (se comprimen automáticamente).

> **Importante:** los cambios del panel se guardan solo en el navegador donde
> los haces (localStorage). Para que apliquen a todos los visitantes, usa la
> Opción 2 o pídeme que actualice el catálogo base.

## Opción 2: Editar el archivo del catálogo (permanente)

Todo el catálogo base se administra desde **un solo archivo**:

```
src/data/products.ts
```

### Agregar un producto

1. Sube la imagen a `public/products/` (por ejemplo `mi-producto.jpg`).
2. Abre `src/data/products.ts` y copia un bloque existente dentro de `PRODUCTS`:

```ts
{
  id: 'mi-producto',              // único, sin espacios
  name: 'Mi Producto',
  price: 49.99,                   // USD
  description: 'Descripción corta.',
  category: 'Accesorios',         // 'Wearables' | 'Moda Urbana' | 'Accesorios'
  badge: 'Nuevo',                 // 'Nuevo' | 'Trending' | null
  image: '/products/mi-producto.jpg',
},
```

### Editar o eliminar

- **Editar:** cambia los valores del bloque (nombre, precio, etc.).
- **Eliminar:** borra el bloque completo del producto.

Las categorías del filtro, los contadores y el carrito se actualizan solos.
Si agregas una categoría nueva, aparecerá automáticamente en los filtros.

### Cambiar el número de WhatsApp

En el mismo archivo, edita:

```ts
export const WHATSAPP_NUMBER = '50378195474';
```

Formato: código de país + número, sin `+` ni espacios.

### Publicar cambios

Después de editar, ejecuta `npm run build` y guarda una nueva versión
(o haz deploy a Vercel/Netlify conectando el repo — es un proyecto Vite estándar).
