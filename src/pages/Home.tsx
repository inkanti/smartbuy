import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Footer from '@/components/Footer';

/** Página principal de SmartBuy */
export default function Home() {
  return (
    <div className="min-h-screen bg-carbon text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Catalog />
      </main>
      <Footer />
    </div>
  );
}
