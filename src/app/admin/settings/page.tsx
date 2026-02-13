'use client';

import { useState } from 'react';
import { Save, Shield, Users, Bell, CreditCard } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Generale', icon: Shield },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'notifications', label: 'Notifiche', icon: Bell },
    { id: 'payments', label: 'Pagamenti', icon: CreditCard },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Impostazioni</h1>

      <div className="flex gap-2 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-white text-muted-foreground border border-border hover:border-primary/30'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
          <h2 className="text-lg font-bold text-foreground">Impostazioni Generali</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Nome Azienda</label>
            <input
              type="text"
              defaultValue="WeddingSite"
              className="w-full max-w-md px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Supporto</label>
            <input
              type="email"
              defaultValue="info@weddingsite.it"
              className="w-full max-w-md px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Tempo di Consegna Standard (giorni)</label>
            <input
              type="number"
              defaultValue={7}
              className="w-full max-w-md px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Valuta</label>
            <select className="w-full max-w-md px-4 py-2.5 rounded-xl border border-border text-sm">
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - Dollaro</option>
              <option value="GBP">GBP - Sterlina</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">
            <Save className="w-4 h-4" />
            Salva Impostazioni
          </button>
        </div>
      )}

      {/* Team */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Gestione Team</h2>
            <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">
              Invita Membro
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Admin', email: 'admin@weddingsite.it', role: 'ADMIN' },
              { name: 'Designer A', email: 'designer.a@weddingsite.it', role: 'DESIGNER' },
              { name: 'Designer B', email: 'designer.b@weddingsite.it', role: 'DESIGNER' },
              { name: 'Sara Support', email: 'sara@weddingsite.it', role: 'CUSTOMER_CARE' },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select defaultValue={member.role} className="px-3 py-1.5 rounded-lg border border-border text-xs">
                    <option value="ADMIN">Admin</option>
                    <option value="DESIGNER">Designer</option>
                    <option value="CUSTOMER_CARE">Customer Care</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
          <h2 className="text-lg font-bold text-foreground">Notifiche</h2>
          <div className="space-y-4">
            {[
              { label: 'Nuovo ordine ricevuto', desc: 'Email quando arriva un nuovo ordine', enabled: true },
              { label: 'Pagamento ricevuto', desc: 'Notifica di pagamento completato', enabled: true },
              { label: 'Modulo completato', desc: 'Quando il cliente completa il form dettagli', enabled: true },
              { label: 'Reminder scadenze', desc: 'Promemoria per deadline ordini', enabled: false },
              { label: 'Report settimanale', desc: 'Riepilogo metriche ogni lunedì', enabled: false },
            ].map((notif, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{notif.label}</p>
                  <p className="text-xs text-muted-foreground">{notif.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={notif.enabled} className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payments */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
          <h2 className="text-lg font-bold text-foreground">Configurazione Pagamenti</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Stripe Secret Key</label>
            <input
              type="password"
              defaultValue="sk_test_*****"
              className="w-full max-w-md px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Stripe Publishable Key</label>
            <input
              type="text"
              defaultValue="pk_test_*****"
              className="w-full max-w-md px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Webhook Secret</label>
            <input
              type="password"
              defaultValue="whsec_*****"
              className="w-full max-w-md px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
            <CreditCard className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Metodi di pagamento attivi</p>
              <p className="text-xs text-muted-foreground">Carta, Apple Pay, Google Pay, PayPal, Klarna</p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">
            <Save className="w-4 h-4" />
            Salva Configurazione
          </button>
        </div>
      )}
    </div>
  );
}
