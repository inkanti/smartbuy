import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/products';

/** Botón flotante de contacto directo por WhatsApp */
export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola SmartBuy 👋 Tengo una consulta.')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-dark flex items-center justify-center glow-green hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
