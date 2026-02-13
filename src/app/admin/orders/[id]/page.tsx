'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, User, Calendar, MapPin, CreditCard, FileText,
  Clock, CheckCircle, Send, MessageSquare
} from 'lucide-react';
import { formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils';

// Demo order detail
const ORDER = {
  id: '1',
  orderNumber: 'WED-2601-XK9P2M',
  status: 'IN_PROGRESS',
  paymentStatus: 'SUCCEEDED',
  customer: {
    name: 'Marco & Giulia Rossi',
    email: 'marco@email.it',
    phone: '+39 333 1234567',
  },
  template: { name: 'Golden Palace', slug: 'golden-palace', price: 399 },
  addons: [
    { name: 'RSVP Avanzato', price: 39 },
    { name: 'Galleria Foto/Video', price: 29 },
    { name: 'Dominio Personalizzato', price: 29 },
    { name: 'Save the Date Digitale', price: 19 },
    { name: 'Setup Done For You', price: 249 },
  ],
  subtotal: 764,
  discount: 0,
  total: 647,
  currency: 'EUR',
  createdAt: '2026-02-13T10:30:00Z',
  deadline: '2026-03-01',
  assignedDesigner: 'Designer A',
  formSubmission: {
    brideName: 'Giulia',
    groomName: 'Marco',
    weddingDate: '2026-06-15',
    location: 'Villa Borghese, Roma',
    isComplete: true,
  },
  timeline: [
    { status: 'PENDING_PAYMENT', note: 'Ordine creato', date: '2026-02-13 10:30' },
    { status: 'PAID', note: 'Pagamento ricevuto via Stripe', date: '2026-02-13 10:31' },
    { status: 'IN_PROGRESS', note: 'Assegnato a Designer A', date: '2026-02-13 11:00' },
  ],
  communications: [
    { type: 'email', direction: 'outbound', subject: 'Conferma ordine', date: '2026-02-13 10:32' },
    { type: 'email', direction: 'outbound', subject: 'Modulo dettagli inviato', date: '2026-02-13 10:33' },
  ],
};

export default function OrderDetailPage() {
  const params = useParams();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/orders" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="w-4 h-4" />
            Tutti gli ordini
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground font-mono">{ORDER.orderNumber}</h1>
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[ORDER.status]}`}>
              {ORDER_STATUS_LABELS[ORDER.status]}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium">
            <option>Cambia stato...</option>
            <option value="REVIEW">In revisione</option>
            <option value="COMPLETED">Completato</option>
            <option value="DELIVERED">Consegnato</option>
          </select>
          <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">
            Salva
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Cliente
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Nome</p>
                <p className="text-sm font-medium text-foreground">{ORDER.customer.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{ORDER.customer.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Telefono</p>
                <p className="text-sm font-medium text-foreground">{ORDER.customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Dettagli Ordine
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-primary/5 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-foreground">{ORDER.template.name}</p>
                  <p className="text-xs text-muted-foreground">Template</p>
                </div>
                <span className="text-sm font-bold">{formatPrice(ORDER.template.price)}</span>
              </div>
              {ORDER.addons.map((addon, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-muted/30">
                  <p className="text-sm text-foreground">{addon.name}</p>
                  <span className="text-sm font-medium">{formatPrice(addon.price)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-foreground">Totale</p>
                  <p className="text-xl font-bold text-primary">{formatPrice(ORDER.total)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Submission */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Dati Matrimonio
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Sposa</p>
                <p className="text-sm font-medium">{ORDER.formSubmission.brideName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sposo</p>
                <p className="text-sm font-medium">{ORDER.formSubmission.groomName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Data Nozze</p>
                <p className="text-sm font-medium">{ORDER.formSubmission.weddingDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">{ORDER.formSubmission.location}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-xs font-medium text-success">Modulo completato</span>
            </div>
          </div>

          {/* Communications */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Comunicazioni
              </h2>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20">
                <Send className="w-3 h-3" />
                Invia Email
              </button>
            </div>
            <div className="space-y-3">
              {ORDER.communications.map((comm, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <Send className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{comm.subject}</p>
                    <p className="text-xs text-muted-foreground">{comm.type} {comm.direction === 'outbound' ? 'inviata' : 'ricevuta'} - {comm.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Assegnazione</h2>
            <select className="w-full px-4 py-2.5 rounded-xl border border-border text-sm">
              <option>Designer A</option>
              <option>Designer B</option>
              <option>Designer C</option>
            </select>
            <div className="mt-4">
              <label className="block text-xs text-muted-foreground mb-1">Deadline</label>
              <input
                type="date"
                defaultValue={ORDER.deadline}
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Timeline
            </h2>
            <div className="space-y-4">
              {ORDER.timeline.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    {i < ORDER.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${ORDER_STATUS_COLORS[item.status]}`}>
                      {ORDER_STATUS_LABELS[item.status]}
                    </span>
                    <p className="text-xs text-foreground mt-1">{item.note}</p>
                    <p className="text-[10px] text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Note Interne</h2>
            <textarea
              rows={4}
              placeholder="Aggiungi una nota..."
              className="w-full px-4 py-3 rounded-xl border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button className="mt-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20">
              Salva Nota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
