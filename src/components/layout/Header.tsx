'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="text-xl font-bold text-foreground tracking-tight">
              Wedding<span className="text-primary">Site</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/templates" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Template
            </Link>
            <Link href="/templates#addons" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Add-on
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Come Funziona
            </Link>
            <Link href="/#pricing" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Prezzi
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="hidden md:flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              <User className="w-4 h-4" />
              Accedi
            </Link>
            <Link href="/cart" className="relative flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
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
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              <Link href="/templates" className="text-sm font-medium text-foreground/70 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Template
              </Link>
              <Link href="/templates#addons" className="text-sm font-medium text-foreground/70 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Add-on
              </Link>
              <Link href="/#how-it-works" className="text-sm font-medium text-foreground/70 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Come Funziona
              </Link>
              <Link href="/auth/login" className="text-sm font-medium text-foreground/70 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Accedi
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
