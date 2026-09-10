import { Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/products';

/** Footer minimalista con redes sociales */
export default function Footer() {
  const socials = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter / X', href: '#' },
    { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
  ];

  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="SmartBuy" className="w-9 h-9 rounded-full" />
          <span className="font-display font-bold">
            Smart<span className="text-electric">Buy</span>
          </span>
        </div>

        <div className="flex gap-3">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-full glass text-white/50 hover:text-electric-light hover:bg-white/10 transition-colors"
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>

        <p className="text-white/30 text-xs tracking-wide">
          © {new Date().getFullYear()} SmartBuy — El futuro del estilo
        </p>
      </div>
    </footer>
  );
}
