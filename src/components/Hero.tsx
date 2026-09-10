import { ChevronDown } from 'lucide-react';

/** Hero con logo animado y tagline de marca */
export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Resplandores decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-electric/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-[120px]" />
        {/* Retícula sutil */}
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      {/* Logo animado (flotación + halo) */}
      <div className="relative animate-float">
        <div className="absolute inset-0 rounded-full bg-electric/30 blur-3xl scale-110 animate-pulse-slow" />
        <img
          src="/logo.png"
          alt="SmartBuy logo"
          className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full ring-2 ring-electric/50 shadow-2xl"
        />
      </div>

      <h1 className="mt-10 font-display text-5xl sm:text-7xl font-bold tracking-tight text-center">
        Smart<span className="text-electric text-glow">Buy</span>
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-white/60 font-light tracking-wide text-center">
        El futuro del estilo
      </p>

      <a
        href="#catalogo"
        className="mt-10 px-8 py-3.5 rounded-full bg-electric hover:bg-electric-dark text-white font-semibold text-sm tracking-wide glow-blue hover:scale-105 transition-transform"
      >
        Explorar catálogo
      </a>

      {/* Indicador de scroll */}
      <ChevronDown className="absolute bottom-8 w-6 h-6 text-white/30 animate-bounce" />
    </section>
  );
}
