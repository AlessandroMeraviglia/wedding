'use client';

import { useState } from 'react';
import { Search, Mail, Phone, ShoppingBag, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const CLIENTS = [
  { id: '1', name: 'Marco & Giulia Rossi', email: 'marco@email.it', phone: '+39 333 1234567', orders: 1, totalSpent: 647, lastOrder: '2026-02-13', status: 'active' },
  { id: '2', name: 'Luca & Sara Bianchi', email: 'luca@email.it', phone: '+39 333 2345678', orders: 1, totalSpent: 328, lastOrder: '2026-02-12', status: 'active' },
  { id: '3', name: 'Andrea & Chiara Verdi', email: 'andrea@email.it', phone: '+39 333 3456789', orders: 2, totalSpent: 596, lastOrder: '2026-02-11', status: 'active' },
  { id: '4', name: 'Paolo & Elena Neri', email: 'paolo@email.it', phone: '+39 333 4567890', orders: 1, totalSpent: 412, lastOrder: '2026-02-10', status: 'active' },
  { id: '5', name: 'Davide & Anna Bruno', email: 'davide@email.it', phone: '+39 333 5678901', orders: 1, totalSpent: 356, lastOrder: '2026-02-09', status: 'completed' },
  { id: '6', name: 'Francesco & Maria Colombo', email: 'francesco@email.it', phone: '+39 333 6789012', orders: 1, totalSpent: 498, lastOrder: '2026-02-08', status: 'active' },
];

export default function AdminClientsPage() {
  const [search, setSearch] = useState('');

  const filtered = CLIENTS.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clienti</h1>
          <p className="text-sm text-muted-foreground">{CLIENTS.length} clienti registrati</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cerca per nome o email..."
          className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client) => (
          <div key={client.id} className="bg-white rounded-2xl border border-border p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">{client.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {client.status === 'active' ? 'Attivo' : 'Completato'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3 h-3" />
                {client.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3" />
                {client.phone}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <ShoppingBag className="w-3 h-3" />
                  Ordini
                </div>
                <p className="text-lg font-bold text-foreground">{client.orders}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Speso</p>
                <p className="text-lg font-bold text-primary">{formatPrice(client.totalSpent)}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Ultimo ordine: {client.lastOrder}</p>
              <Link href={`/admin/orders`} className="text-primary hover:text-primary-dark">
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
