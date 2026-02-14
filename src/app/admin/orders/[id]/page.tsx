'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft, User, Calendar, MapPin, CreditCard, FileText,
  Clock, CheckCircle, Send, MessageSquare, Download, Upload,
  Image, Edit3, Save, X, FolderOpen, Trash2
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
    photoUrls: [
      '/uploads/marco-giulia/photo1.jpg',
      '/uploads/marco-giulia/photo2.jpg',
      '/uploads/marco-giulia/photo3.jpg',
    ],
    customTexts: {
      heroTitle: 'Marco & Giulia',
      heroSubtitle: 'Vi invitiamo al nostro matrimonio',
      storyTitle: 'La Nostra Storia',
      storyText: 'Ci siamo conosciuti in una sera d\'estate...',
      rsvpTitle: 'Conferma la Tua Presenza',
      footerText: 'Marco & Giulia - 15 Giugno 2026',
    },
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
  const [editingTexts, setEditingTexts] = useState(false);
  const [formTexts, setFormTexts] = useState(ORDER.formSubmission.customTexts);

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

          {/* File Manager - Photos */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-primary" />
                Gestione File Cliente
              </h2>
              <label className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 cursor-pointer">
                <Upload className="w-3 h-3" />
                Carica Foto
                <input type="file" className="hidden" accept="image/*" multiple />
              </label>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {ORDER.formSubmission.photoUrls.map((url, i) => (
                <div key={i} className="relative group">
                  <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-xl flex items-center justify-center border border-border">
                    <Image className="w-8 h-8 text-primary/20" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-xl transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button className="p-1.5 bg-white rounded-lg text-foreground hover:bg-blue-50 transition-colors" title="Scarica">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 bg-white rounded-lg text-foreground hover:bg-red-50 transition-colors" title="Elimina">
                      <Trash2 className="w-3.5 h-3.5 text-error" />
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 truncate">photo{i + 1}.jpg</p>
                </div>
              ))}
              {/* Upload placeholder */}
              <label className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-[10px] text-muted-foreground">Carica</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                <Download className="w-3.5 h-3.5" />
                Scarica Tutti
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                Ricarica Foto
              </button>
            </div>
          </div>

          {/* Form Text Editor */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary" />
                Testi del Sito
              </h2>
              {!editingTexts ? (
                <button
                  onClick={() => setEditingTexts(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20"
                >
                  <Edit3 className="w-3 h-3" />
                  Modifica
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditingTexts(false); }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20"
                  >
                    <Save className="w-3 h-3" />
                    Salva
                  </button>
                  <button
                    onClick={() => { setEditingTexts(false); setFormTexts(ORDER.formSubmission.customTexts); }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80"
                  >
                    <X className="w-3 h-3" />
                    Annulla
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {Object.entries(formTexts).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {editingTexts ? (
                    key.includes('Text') || key.includes('text') ? (
                      <textarea
                        value={value}
                        onChange={(e) => setFormTexts(prev => ({ ...prev, [key]: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setFormTexts(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    )
                  ) : (
                    <p className="text-sm text-foreground bg-muted/30 px-3 py-2 rounded-xl">{value}</p>
                  )}
                </div>
              ))}
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
