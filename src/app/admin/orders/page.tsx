'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, MoreHorizontal } from 'lucide-react';
import { formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils';

const ALL_ORDERS = [
  { id: '1', orderNumber: 'WED-2601-XK9P2M', status: 'IN_PROGRESS', customer: 'Marco & Giulia Rossi', email: 'marco@email.it', template: 'Golden Palace', total: 647, addonsCount: 5, date: '2026-02-13', deadline: '2026-03-01', assignedTo: 'Designer A' },
  { id: '2', orderNumber: 'WED-2601-AB3C4D', status: 'PAID', customer: 'Luca & Sara Bianchi', email: 'luca@email.it', template: 'Amore Eterno', total: 328, addonsCount: 3, date: '2026-02-12', deadline: '2026-03-05', assignedTo: null },
  { id: '3', orderNumber: 'WED-2601-EF5G6H', status: 'REVIEW', customer: 'Andrea & Chiara Verdi', email: 'andrea@email.it', template: 'Minimal Love', total: 198, addonsCount: 1, date: '2026-02-11', deadline: '2026-02-28', assignedTo: 'Designer B' },
  { id: '4', orderNumber: 'WED-2601-IJ7K8L', status: 'COMPLETED', customer: 'Paolo & Elena Neri', email: 'paolo@email.it', template: 'Boho Garden', total: 412, addonsCount: 4, date: '2026-02-10', deadline: '2026-02-25', assignedTo: 'Designer A' },
  { id: '5', orderNumber: 'WED-2601-MN9O0P', status: 'DELIVERED', customer: 'Davide & Anna Bruno', email: 'davide@email.it', template: 'Seaside Dream', total: 356, addonsCount: 3, date: '2026-02-09', deadline: '2026-02-20', assignedTo: 'Designer C' },
  { id: '6', orderNumber: 'WED-2601-QR1S2T', status: 'REVISION', customer: 'Francesco & Maria Colombo', email: 'francesco@email.it', template: 'Modern Metro', total: 498, addonsCount: 4, date: '2026-02-08', deadline: '2026-02-22', assignedTo: 'Designer B' },
  { id: '7', orderNumber: 'WED-2601-UV3W4X', status: 'PENDING_PAYMENT', customer: 'Simone & Laura Ricci', email: 'simone@email.it', template: 'Tuscan Villa', total: 529, addonsCount: 5, date: '2026-02-07', deadline: null, assignedTo: null },
  { id: '8', orderNumber: 'WED-2601-YZ5A6B', status: 'CANCELLED', customer: 'Matteo & Francesca Romano', email: 'matteo@email.it', template: 'Elopement Story', total: 219, addonsCount: 2, date: '2026-02-06', deadline: null, assignedTo: null },
];

const STATUSES = ['ALL', ...Object.keys(ORDER_STATUS_LABELS)] as const;

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = ALL_ORDERS.filter(o => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return o.orderNumber.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ordini</h1>
          <p className="text-sm text-muted-foreground">{ALL_ORDERS.length} ordini totali</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cerca per numero ordine, cliente, email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? 'bg-primary text-white'
                  : 'bg-white text-muted-foreground border border-border hover:border-primary/30'
              }`}
            >
              {s === 'ALL' ? 'Tutti' : ORDER_STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Ordine</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Cliente</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Template</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Stato</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Assegnato</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Totale</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-mono font-medium text-foreground">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{order.template}</p>
                    <p className="text-xs text-muted-foreground">+{order.addonsCount} add-on</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{order.assignedTo || '-'}</p>
                    {order.deadline && (
                      <p className="text-xs text-muted-foreground">Deadline: {order.deadline}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-foreground">{formatPrice(order.total)}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nessun ordine trovato</p>
          </div>
        )}
      </div>
    </div>
  );
}
