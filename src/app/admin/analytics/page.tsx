'use client';

import { TrendingUp, ShoppingBag, DollarSign, Percent, ArrowUpRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const MONTHLY_REVENUE = [
  { month: 'Set', revenue: 4200 },
  { month: 'Ott', revenue: 5800 },
  { month: 'Nov', revenue: 7200 },
  { month: 'Dic', revenue: 6500 },
  { month: 'Gen', revenue: 8900 },
  { month: 'Feb', revenue: 11200 },
];

const TOP_TEMPLATES = [
  { name: 'Golden Palace', orders: 34, revenue: 13566, share: 39 },
  { name: 'Amore Eterno', orders: 28, revenue: 5572, share: 16 },
  { name: 'Seaside Dream', orders: 22, revenue: 5038, share: 15 },
  { name: 'Modern Metro', orders: 18, revenue: 4482, share: 13 },
  { name: 'Boho Garden', orders: 15, revenue: 2685, share: 8 },
];

const TOP_ADDONS = [
  { name: 'RSVP Avanzato', orders: 89, revenue: 3471 },
  { name: 'Dominio Personalizzato', orders: 82, revenue: 2378 },
  { name: 'Galleria Foto/Video', orders: 76, revenue: 2204 },
  { name: 'Setup Done For You', orders: 45, revenue: 11205 },
  { name: 'Coordinato Stampa PDF', orders: 42, revenue: 4158 },
];

const FUNNEL = [
  { step: 'Visitatori Homepage', count: 12450, pct: 100 },
  { step: 'Vista Template', count: 5680, pct: 45.6 },
  { step: 'Aggiunta Carrello', count: 1240, pct: 10.0 },
  { step: 'Checkout Iniziato', count: 680, pct: 5.5 },
  { step: 'Acquisto Completato', count: 156, pct: 1.25 },
];

const maxRevenue = Math.max(...MONTHLY_REVENUE.map(m => m.revenue));

export default function AdminAnalyticsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Metriche di performance del business</p>
        </div>
        <select className="px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium">
          <option>Ultimi 6 mesi</option>
          <option>Ultimo anno</option>
          <option>Tutto il periodo</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="flex items-center gap-1 text-xs font-semibold text-success"><ArrowUpRight className="w-3 h-3" />+18%</span>
          </div>
          <p className="text-2xl font-bold">{formatPrice(34580)}</p>
          <p className="text-xs text-muted-foreground">Ricavo Totale</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-3">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="flex items-center gap-1 text-xs font-semibold text-success"><ArrowUpRight className="w-3 h-3" />+12%</span>
          </div>
          <p className="text-2xl font-bold">156</p>
          <p className="text-xs text-muted-foreground">Ordini Totali</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="flex items-center gap-1 text-xs font-semibold text-success"><ArrowUpRight className="w-3 h-3" />+5%</span>
          </div>
          <p className="text-2xl font-bold">{formatPrice(221.67)}</p>
          <p className="text-xs text-muted-foreground">AOV (Valore Medio Ordine)</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-3">
            <Percent className="w-5 h-5 text-primary" />
            <span className="flex items-center gap-1 text-xs font-semibold text-success"><ArrowUpRight className="w-3 h-3" />+0.3%</span>
          </div>
          <p className="text-2xl font-bold">1.25%</p>
          <p className="text-xs text-muted-foreground">Conversion Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart (bar chart approximation) */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Ricavi Mensili</h2>
          <div className="flex items-end gap-4 h-48">
            {MONTHLY_REVENUE.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{formatPrice(m.revenue)}</span>
                <div
                  className="w-full bg-primary/20 rounded-t-lg relative group hover:bg-primary/30 transition-colors"
                  style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all"
                    style={{ height: '100%' }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Funnel di Conversione</h2>
          <div className="space-y-4">
            {FUNNEL.map((step, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{step.step}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{step.count.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">({step.pct}%)</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${step.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Templates */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Template Più Venduti</h2>
          <div className="space-y-4">
            {TOP_TEMPLATES.map((tpl, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-lg font-bold text-muted-foreground w-6">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{tpl.name}</p>
                  <p className="text-xs text-muted-foreground">{tpl.orders} ordini</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{formatPrice(tpl.revenue)}</p>
                  <p className="text-xs text-muted-foreground">{tpl.share}% ricavi</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Add-ons */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Add-on Più Venduti</h2>
          <div className="space-y-4">
            {TOP_ADDONS.map((addon, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-lg font-bold text-muted-foreground w-6">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{addon.name}</p>
                  <p className="text-xs text-muted-foreground">{addon.orders} ordini</p>
                </div>
                <p className="text-sm font-bold text-primary">{formatPrice(addon.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
