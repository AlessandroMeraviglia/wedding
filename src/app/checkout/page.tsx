'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingCart, CreditCard, Lock, ArrowLeft, Check, Heart,
  Calendar, MapPin, Users, Mail, Phone, User
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import ProgressIndicator from '@/components/ProgressIndicator';

const PURCHASE_STEPS = [
  { label: 'Template' },
  { label: 'Add-on' },
  { label: 'Carrello' },
  { label: 'Pagamento' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [customer, setCustomer] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [weddingInfo, setWeddingInfo] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    weddingCity: '',
    guestCount: '',
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  const templatePrice = cart.template?.price ?? 0;
  const addonsTotal = cart.selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const total = templatePrice + addonsTotal;

  const isFormValid =
    customer.email &&
    customer.firstName &&
    customer.lastName &&
    weddingInfo.brideName &&
    weddingInfo.groomName &&
    acceptTerms &&
    cart.template;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: cart.template!.id,
          addonIds: cart.selectedAddons.map(a => a.id),
          customer,
          weddingInfo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore durante il checkout');
        setIsSubmitting(false);
        return;
      }

      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch {
      setError('Errore di rete. Riprova.');
      setIsSubmitting(false);
    }
  };

  if (!cart.template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Carrello vuoto</h1>
          <p className="text-muted-foreground mb-6">Per procedere al checkout, seleziona prima un template.</p>
          <Link href="/templates" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors">
            Scegli un Template
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressIndicator steps={PURCHASE_STEPS} currentStep={3} total={total} />

        <Link href="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-4 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Torna al Carrello
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  I tuoi dati
                </h2>
                <p className="text-sm text-muted-foreground mb-6">Inserisci i dati per la fatturazione e la comunicazione.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Nome <span className="text-error">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" required placeholder="Mario" value={customer.firstName}
                        onChange={e => setCustomer(c => ({ ...c, firstName: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Cognome <span className="text-error">*</span></label>
                    <input type="text" required placeholder="Rossi" value={customer.lastName}
                      onChange={e => setCustomer(c => ({ ...c, lastName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email <span className="text-error">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="email" required placeholder="mario@email.com" value={customer.email}
                        onChange={e => setCustomer(c => ({ ...c, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Telefono</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="tel" placeholder="+39 333 1234567" value={customer.phone}
                        onChange={e => setCustomer(c => ({ ...c, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Wedding Info */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Informazioni sul Matrimonio
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Questi dati ci aiutano a preparare il tuo sito. Potrai modificarli dopo l&apos;acquisto.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Nome della Sposa <span className="text-error">*</span></label>
                    <input type="text" required placeholder="Giulia" value={weddingInfo.brideName}
                      onChange={e => setWeddingInfo(w => ({ ...w, brideName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Nome dello Sposo <span className="text-error">*</span></label>
                    <input type="text" required placeholder="Marco" value={weddingInfo.groomName}
                      onChange={e => setWeddingInfo(w => ({ ...w, groomName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Data del Matrimonio</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="date" value={weddingInfo.weddingDate}
                        onChange={e => setWeddingInfo(w => ({ ...w, weddingDate: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Città</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" placeholder="Roma" value={weddingInfo.weddingCity}
                        onChange={e => setWeddingInfo(w => ({ ...w, weddingCity: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">Numero invitati stimato</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select value={weddingInfo.guestCount}
                        onChange={e => setWeddingInfo(w => ({ ...w, guestCount: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white">
                        <option value="">Seleziona...</option>
                        <option value="1-50">1 - 50 invitati</option>
                        <option value="51-100">51 - 100 invitati</option>
                        <option value="101-200">101 - 200 invitati</option>
                        <option value="201-300">201 - 300 invitati</option>
                        <option value="300+">Oltre 300 invitati</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method (Demo) */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Metodo di Pagamento
                </h2>
                <p className="text-sm text-muted-foreground mb-6">Modalità di pagamento demo. In produzione sarà integrato Stripe.</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="accent-primary w-4 h-4" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex gap-2">
                        <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
                        <div className="w-10 h-7 bg-gradient-to-r from-red-500 to-orange-500 rounded-md flex items-center justify-center text-white text-[7px] font-bold">MC</div>
                      </div>
                      <span className="text-sm font-medium">Carta di Credito / Debito</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:border-primary/30 transition-colors">
                    <input type="radio" name="payment" className="accent-primary w-4 h-4" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-7 bg-black rounded-md flex items-center justify-center text-white text-[8px] font-bold">Pay</div>
                      <span className="text-sm font-medium">Apple Pay / Google Pay</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:border-primary/30 transition-colors">
                    <input type="radio" name="payment" className="accent-primary w-4 h-4" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-7 bg-blue-700 rounded-md flex items-center justify-center text-white text-[8px] font-bold">PP</div>
                      <span className="text-sm font-medium">PayPal</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:border-primary/30 transition-colors">
                    <input type="radio" name="payment" className="accent-primary w-4 h-4" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-7 bg-pink-500 rounded-md flex items-center justify-center text-white text-[8px] font-bold">K.</div>
                      <span className="text-sm font-medium">Klarna — Paga in 3 rate</span>
                    </div>
                  </label>
                </div>
                <div className="mt-6 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Numero carta</label>
                    <input type="text" placeholder="4242 4242 4242 4242"
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Scadenza</label>
                      <input type="text" placeholder="MM/AA"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">CVC</label>
                      <input type="text" placeholder="123"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)}
                    className="accent-primary w-4 h-4 mt-1" />
                  <div>
                    <p className="text-sm text-foreground">
                      Accetto i <span className="text-primary font-medium">Termini e Condizioni</span> e la{' '}
                      <span className="text-primary font-medium">Privacy Policy</span>.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confermo di aver letto e accettato le condizioni di vendita. Dopo il pagamento riceverò un&apos;email
                      di conferma con il link per personalizzare il sito del matrimonio.
                    </p>
                  </div>
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">{error}</div>
              )}

              <button type="submit" disabled={!isFormValid || isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-primary/20">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
                {isSubmitting ? 'Elaborazione...' : `Paga ${formatPrice(total)}`}
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" />Pagamento Sicuro SSL</div>
                <div className="flex items-center gap-1"><Check className="w-3.5 h-3.5" />Garanzia Soddisfazione</div>
                <div className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" />Crittografia 256-bit</div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border p-6 sticky top-8">
              <h3 className="text-lg font-bold text-foreground mb-6">Riepilogo Ordine</h3>
              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <div className="w-16 h-12 bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{cart.template.name}</p>
                  <p className="text-xs text-muted-foreground">Template Premium</p>
                </div>
                <span className="text-sm font-bold text-foreground">{formatPrice(templatePrice)}</span>
              </div>
              {cart.selectedAddons.length > 0 && (
                <div className="py-4 border-b border-border space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Add-on selezionati</p>
                  {cart.selectedAddons.map(addon => (
                    <div key={addon.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-success" />
                        <span className="text-sm text-foreground">{addon.name}</span>
                      </div>
                      <span className="text-sm text-foreground">{formatPrice(addon.price)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Template</span>
                  <span className="text-sm text-foreground">{formatPrice(templatePrice)}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{cart.selectedAddons.length} Add-on</span>
                    <span className="text-sm text-foreground">{formatPrice(addonsTotal)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-lg font-bold text-foreground">Totale</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">IVA inclusa dove applicabile</p>
              </div>

              <div className="mt-6 bg-primary/5 rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-2">Cosa è incluso:</p>
                <ul className="space-y-1.5">
                  {['Sito web matrimonio personalizzato', 'Hosting incluso per 12 mesi', 'Supporto designer dedicato', 'Modifiche illimitate fino al matrimonio', 'Ottimizzato per mobile'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-success flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 bg-muted/50 rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-2">Dopo l&apos;acquisto:</p>
                <ol className="space-y-1.5 list-decimal list-inside">
                  <li className="text-xs text-muted-foreground">Ricevi email di conferma con link personalizzazione</li>
                  <li className="text-xs text-muted-foreground">Compili un form guidato con dettagli del matrimonio</li>
                  <li className="text-xs text-muted-foreground">Il designer crea il tuo sito in 3-5 giorni</li>
                  <li className="text-xs text-muted-foreground">Revisioni illimitate fino alla tua approvazione</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
