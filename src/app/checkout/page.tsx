'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  if (!cart.template) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: cart.template!.id,
          addonIds: cart.selectedAddons.map(a => a.id),
          customer: formData,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else if (data.orderId) {
        // Direct success (for testing without Stripe)
        clearCart();
        router.push(`/checkout/success?orderId=${data.orderId}`);
      }
    } catch {
      alert('Errore durante il checkout. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  const templatePrice = cart.template.price;
  const addonsTotal = cart.selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const total = templatePrice + addonsTotal;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" />
          Torna al carrello
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-border p-8">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-success" />
                <h1 className="text-2xl font-bold text-foreground">Checkout Sicuro</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Informazioni di Contatto</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                        placeholder="la-vostra@email.it"
                        value={formData.email}
                        onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Nome</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                          placeholder="Nome"
                          value={formData.firstName}
                          onChange={(e) => setFormData(f => ({ ...f, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Cognome</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                          placeholder="Cognome"
                          value={formData.lastName}
                          onChange={(e) => setFormData(f => ({ ...f, lastName: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Telefono (opzionale)</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                        placeholder="+39 333 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Methods Info */}
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Metodi di Pagamento Accettati</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-border font-medium">Carta di Credito/Debito</span>
                    <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-border font-medium">Apple Pay</span>
                    <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-border font-medium">Google Pay</span>
                    <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-border font-medium">PayPal</span>
                    <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-border font-medium">Klarna (rate)</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Verrai reindirizzato a Stripe per completare il pagamento in sicurezza.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Elaborazione...</span>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Paga {formatPrice(total)}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    SSL 256-bit
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    PCI Compliant
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-lg font-bold text-foreground mb-6">Riepilogo</h2>

              {/* Template */}
              <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
                <div className="w-16 h-12 bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary/20" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{cart.template.name}</h3>
                  <p className="text-xs text-muted-foreground">Template</p>
                </div>
                <span className="text-sm font-bold">{formatPrice(templatePrice)}</span>
              </div>

              {/* Add-ons */}
              {cart.selectedAddons.length > 0 && (
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1 text-xs font-semibold text-foreground mb-3">
                    <Sparkles className="w-3 h-3" />
                    Add-on
                  </div>
                  <div className="space-y-2">
                    {cart.selectedAddons.map((addon) => (
                      <div key={addon.id} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{addon.name}</span>
                        <span className="font-medium">{formatPrice(addon.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Totale</span>
                <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">IVA inclusa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
