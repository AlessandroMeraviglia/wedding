import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <span className="text-lg font-bold text-white">WeddingSite</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Crea il sito web perfetto per il vostro matrimonio. Elegante, personalizzabile e pronto all&apos;uso.
            </p>
          </div>

          {/* Templates */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Template</h4>
            <ul className="space-y-2">
              <li><Link href="/templates?mood=ROMANTIC" className="text-sm text-white/60 hover:text-primary transition-colors">Romantici</Link></li>
              <li><Link href="/templates?mood=MINIMAL" className="text-sm text-white/60 hover:text-primary transition-colors">Minimal</Link></li>
              <li><Link href="/templates?mood=LUXURY" className="text-sm text-white/60 hover:text-primary transition-colors">Luxury</Link></li>
              <li><Link href="/templates?mood=BOHO" className="text-sm text-white/60 hover:text-primary transition-colors">Boho</Link></li>
              <li><Link href="/templates?mood=MODERN" className="text-sm text-white/60 hover:text-primary transition-colors">Moderni</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Supporto</h4>
            <ul className="space-y-2">
              <li><Link href="/#how-it-works" className="text-sm text-white/60 hover:text-primary transition-colors">Come Funziona</Link></li>
              <li><Link href="/#faq" className="text-sm text-white/60 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-white/60 hover:text-primary transition-colors">Contatti</Link></li>
              <li><Link href="/privacy" className="text-sm text-white/60 hover:text-primary transition-colors">Privacy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contatti</h4>
            <ul className="space-y-2">
              <li className="text-sm text-white/60">info@weddingsite.it</li>
              <li className="text-sm text-white/60">+39 02 1234 5678</li>
              <li className="text-sm text-white/60">Lun-Ven 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} WeddingSite. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
