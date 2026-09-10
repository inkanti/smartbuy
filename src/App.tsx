import { Routes, Route } from 'react-router'
import { CatalogProvider } from '@/context/CatalogContext'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/CartDrawer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import Home from './pages/Home'
import CatalogPage from './pages/CatalogPage'  // ← NUEVO: crear esta página
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/Admin'

export default function App() {
  return (
    <CatalogProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogPage />} />  // ← NUEVA RUTA
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <CartDrawer />
        <WhatsAppFloat />
      </CartProvider>
    </CatalogProvider>
  )
}