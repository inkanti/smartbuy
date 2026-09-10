import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Props {
  images: string[];
  productName: string;
  badge?: string | null;
  onClose: () => void;
}

/** Galería lightbox con navegación por teclado, flechas, thumbnails y swipe táctil con desplazamiento visual */
export default function ImageGallery({ images, productName, badge, onClose }: Props) {
  const [current, setCurrent] = useState(0);
 // const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [, setDirection] = useState<'left' | 'right'>('right');
  
  // ===== DESPLAZAMIENTO VISUAL =====
  const [dragOffset, setDragOffset] = useState(0); // Offset en píxeles durante el arrastre
  const [isDragging, setIsDragging] = useState(false);
  
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const minSwipeDistance = 50;

  const next = useCallback(() => {
    setDirection('right');
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setDirection('left');
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Navegación con teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // ===== SWIPE CON DESPLAZAMIENTO VISUAL =====
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchCurrentX.current = e.targetTouches[0].clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    touchCurrentX.current = e.targetTouches[0].clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    
    // Resistencia en los bordes (efeto elástico)
    const isFirst = current === 0;
    const isLast = current === images.length - 1;
    
    if ((isFirst && diff > 0) || (isLast && diff < 0)) {
      // Reducir el movimiento al 30% en los bordes
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchCurrentX.current) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    
    const distance = touchStartX.current - touchCurrentX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    
    // Animación de salida según dirección
    if (isLeftSwipe && current < images.length - 1) {
     // setDragOffset(-containerRef.current?.offsetWidth || -300);
      setDragOffset(-(containerRef.current?.offsetWidth ?? 300));
      setTimeout(() => {
        next();
        setDragOffset(0);
        setIsDragging(false);
      }, 200);
    } else if (isRightSwipe && current > 0) {
      setDragOffset(containerRef.current?.offsetWidth || 300);
      setTimeout(() => {
        prev();
        setDragOffset(0);
        setIsDragging(false);
      }, 200);
    } else {
      // Regresar a posición original con animación
      setDragOffset(0);
      setIsDragging(false);
    }
    
    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  // ===== MOUSE DRAG (para desktop) =====
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    touchStartX.current = e.clientX;
    touchCurrentX.current = e.clientX;
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !touchStartX.current) return;
    touchCurrentX.current = e.clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    setDragOffset(diff);
  };

  const onMouseUp = () => {
    if (!touchStartX.current || !touchCurrentX.current) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    
    const distance = touchStartX.current - touchCurrentX.current;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0 && current < images.length - 1) {
        next();
      } else if (distance < 0 && current > 0) {
        prev();
      }
    }
    
    setDragOffset(0);
    setIsDragging(false);
    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar galería"
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Contenedor principal */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Imagen actual con desplazamiento */}
        <div 
          className="relative max-w-4xl w-full h-full flex items-center justify-center will-change-transform"
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <img
            src={images[current]}
            alt={`${productName} - Imagen ${current + 1}`}
            className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl select-none"
            draggable={false}
          />
          
          {/* Badge */}
          {badge && (
            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              badge === 'Nuevo' ? 'bg-electric text-white' : 'bg-white/10 text-electric-light border border-electric/40'
            }`}>
              {badge}
            </span>
          )}

          {/* Contador */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-sm">
            {current + 1} / {images.length}
          </span>
        </div>

        {/* Preview de imagen siguiente/anterior (opcional, efecto avanzado) */}
        {isDragging && Math.abs(dragOffset) > 30 && (
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40"
            style={{
              transform: `translateX(${dragOffset > 0 ? '-100%' : '100%'})`,
            }}
          >
            <img
              src={images[dragOffset > 0 
                ? (current - 1 + images.length) % images.length 
                : (current + 1) % images.length
              ]}
              alt=""
              className="max-w-full max-h-[70vh] object-contain rounded-2xl"
            />
          </div>
        )}

        {/* Flechas (desktop) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 hidden sm:flex z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 hidden sm:flex z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Indicador de swipe en móvil */}
        {images.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs sm:hidden">
            ← Desliza →
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/60 rounded-full overflow-x-auto max-w-[90vw] z-10">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 'right' : 'left');
                  setCurrent(idx);
                }}
                className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all ${
                  idx === current ? 'ring-2 ring-electric scale-110' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}