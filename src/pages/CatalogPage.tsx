import Navbar from '@/components/Navbar';
import Catalog from '@/components/Catalog';
import Footer from '@/components/Footer';
import { Link } from 'react-router';

/** Página dedicada del catálogo */
export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-carbon text-white antialiased">
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb o botón volver opcional */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <Link 
            to="/" 
            className="text-white/50 hover:text-electric transition-colors text-sm"
          >
            ← Volver al inicio
          </Link>
        </div>
        
        <Catalog />
      </main>
      <Footer />
    </div>
  );
}