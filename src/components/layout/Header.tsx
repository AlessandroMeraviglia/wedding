'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const total = (cart.template?.price ?? 0) + cart.selectedAddons.reduce((s, a) => s + a.price, 0);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
        : 'bg-white/80 backdrop-blur-md border-b border-border'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="text-xl font-bold text-foreground tracking-tight">
              Wedding<span className="text-primary">Site</span>
            </span>
          </Link>

          {/* Desktop Nav — streamlined */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/templates" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Esplora Template
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Come Funziona
            </Link>
          </nav>

          {/* Right side — CTAs */}
          <div className="flex items-center gap-3">
            {/* Mini cart total when items present */}
            {itemCount > 0 && (
              <Link href="/cart" className="hidden lg:flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                <ShoppingCart className="w-3.5 h-3.5" />
                {formatPrice(total)}
              </Link>
            )}

            <Link href="/cart" className="relative flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-primary transition-colors lg:hidden">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/templates"
              className="hidden md:inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-md"
            >
              Inizia Ora
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4 animate-fade-in">
            <nav className="flex flex-col gap-3">
              <Link href="/templates" className="text-sm font-medium text-foreground/70 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Esplora Template
              </Link>
              <Link href="/#how-it-works" className="text-sm font-medium text-foreground/70 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Come Funziona
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inizia Ora
                <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
