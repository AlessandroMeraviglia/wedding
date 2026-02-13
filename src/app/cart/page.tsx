'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, ShoppingCart, ArrowLeft, ArrowRight, Heart, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { ADDONS } from '@/data/addons';
import { formatPrice, ADDON_CATEGORY_LABELS } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeAddon, toggleAddon, clearCart } = useCart();

  const suggestedAddons = ADDONS.filter(
    a => a.isRecommended && !cart.selectedAddons.find(s => s.id === a.id)
  ).slice(0, 3);

  if (!cart.template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Il tuo carrello è vuoto</h1>
          <p className="text-muted-foreground mb-6">Scegli un template per iniziare</p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            Esplora i Template
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const templatePrice = cart.template.price;
  const addonsTotal = cart.selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const total = templatePrice + addonsTotal;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/templates" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2">
              <ArrowLeft className="w-4 h-4" />
              Continua lo shopping
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Il Tuo Carrello</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-error hover:text-error/80 font-medium"
          >
            Svuota carrello
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Template */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                <Heart className="w-4 h-4" />
                Template Selezionato
              </div>
              <div className="flex items-start gap-4">
                <div className="w-24 h-18 bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-primary/20" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{cart.template.name}</h3>
                  <p className="text-sm text-muted-foreground">{cart.template.description}</p>
                </div>
                <span className="text-xl font-bold text-primary">{formatPrice(templatePrice)}</span>
              </div>
            </div>

            {/* Add-ons */}
            {cart.selectedAddons.length > 0 && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    Add-on ({cart.selectedAddons.length})
                  </div>
                </div>
                <div className="space-y-3">
                  {cart.selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground">{addon.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {ADDON_CATEGORY_LABELS[addon.category]}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-primary">{formatPrice(addon.price)}</span>
                      <button
                        onClick={() => removeAddon(addon.id)}
                        className="p-2 text-muted-foreground hover:text-error transition-colors"
                        aria-label={`Rimuovi ${addon.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Add-ons */}
            {suggestedAddons.length > 0 && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Potrebbe Interessarti</h3>
                <div className="space-y-3">
                  {suggestedAddons.map((addon) => (
                    <div key={addon.id} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground">{addon.name}</h4>
                        <p className="text-xs text-muted-foreground">{addon.description}</p>
                      </div>
                      <span className="text-sm font-bold text-primary">{formatPrice(addon.price)}</span>
                      <button
                        onClick={() => toggleAddon(addon)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        Aggiungi
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-lg font-bold text-foreground mb-6">Riepilogo Ordine</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Template</span>
                  <span className="font-medium">{formatPrice(templatePrice)}</span>
                </div>
                {cart.selectedAddons.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Add-on ({cart.selectedAddons.length})</span>
                    <span className="font-medium">{formatPrice(addonsTotal)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-foreground">Totale</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">IVA inclusa</p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg"
              >
                <CreditCard className="w-5 h-5" />
                Procedi al Pagamento
              </Link>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  Pagamento sicuro con crittografia SSL
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CreditCard className="w-4 h-4 text-success" />
                  Carta, Apple Pay, Google Pay, PayPal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
