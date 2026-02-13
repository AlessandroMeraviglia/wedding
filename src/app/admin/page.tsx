'use client';

import {
  ShoppingBag, Users, TrendingUp, DollarSign,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils';

// Demo data
const STATS = [
  { label: 'Ordini Totali', value: '156', change: '+12%', up: true, icon: ShoppingBag },
  { label: 'Ricavo Totale', value: formatPrice(34580), change: '+18%', up: true, icon: DollarSign },
  { label: 'Valore Medio Ordine', value: formatPrice(221.67), change: '+5%', up: true, icon: TrendingUp },
  { label: 'Clienti Attivi', value: '89', change: '+8%', up: true, icon: Users },
];

const RECENT_ORDERS = [
  { id: '1', orderNumber: 'WED-2601-XK9P2M', status: 'IN_PROGRESS', customer: 'Marco & Giulia Rossi', template: 'Golden Palace', total: 647, date: '2026-02-13' },
  { id: '2', orderNumber: 'WED-2601-AB3C4D', status: 'PAID', customer: 'Luca & Sara Bianchi', template: 'Amore Eterno', total: 328, date: '2026-02-12' },
  { id: '3', orderNumber: 'WED-2601-EF5G6H', status: 'REVIEW', customer: 'Andrea & Chiara Verdi', template: 'Minimal Love', total: 198, date: '2026-02-11' },
  { id: '4', orderNumber: 'WED-2601-IJ7K8L', status: 'COMPLETED', customer: 'Paolo & Elena Neri', template: 'Boho Garden', total: 412, date: '2026-02-10' },
  { id: '5', orderNumber: 'WED-2601-MN9O0P', status: 'DELIVERED', customer: 'Davide & Anna Bruno', template: 'Seaside Dream', total: 356, date: '2026-02-09' },
];

const PIPELINE = [
  { status: 'PAID', count: 8, label: 'Da lavorare' },
  { status: 'IN_PROGRESS', count: 5, label: 'In corso' },
  { status: 'REVIEW', count: 3, label: 'In revisione' },
  { status: 'COMPLETED', count: 12, label: 'Completati (mese)' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Panoramica del tuo business</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium">
            <option>Ultimi 30 giorni</option>
            <option>Ultimi 7 giorni</option>
            <option>Questo mese</option>
            <option>Questo anno</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-success' : 'text-error'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Ordini Recenti</h2>
              <Link href="/admin/orders" className="text-sm text-primary font-medium hover:text-primary-dark">
                Vedi tutti
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Ordine</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Cliente</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Stato</th>
                    <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Totale</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/admin/orders/${order.id}`} className="text-sm font-mono font-medium text-foreground hover:text-primary">
                          {order.orderNumber}
                        </Link>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.template}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-bold text-foreground">{formatPrice(order.total)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div>
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">Pipeline Ordini</h2>
            <div className="space-y-4">
              {PIPELINE.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'PAID' ? 'bg-green-500' :
                      item.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                      item.status === 'REVIEW' ? 'bg-purple-500' : 'bg-emerald-500'
                    }`} />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-border p-6 mt-4">
            <h2 className="text-lg font-bold text-foreground mb-4">Azioni Rapide</h2>
            <div className="space-y-2">
              <Link href="/admin/orders?status=PAID" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                <AlertCircle className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-sm font-medium text-foreground">8 ordini da lavorare</p>
                  <p className="text-xs text-muted-foreground">Richiede attenzione</p>
                </div>
              </Link>
              <Link href="/admin/orders?status=REVIEW" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                <Clock className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">3 ordini in revisione</p>
                  <p className="text-xs text-muted-foreground">In attesa feedback</p>
                </div>
              </Link>
              <Link href="/admin/orders?status=COMPLETED" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">12 completati questo mese</p>
                  <p className="text-xs text-muted-foreground">Da consegnare</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
