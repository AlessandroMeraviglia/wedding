'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, Monitor, Smartphone, Maximize2, Minimize2, Check, ShoppingCart, ChevronRight, Sparkles, Star } from 'lucide-react';
import { Addon, AddonCategory } from '@/types';
import { formatPrice, ADDON_CATEGORY_LABELS } from '@/lib/utils';

interface LivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  htmlContent: string;
  allAddons: Addon[];
  selectedAddonIds: string[];
  onToggleAddon: (addon: Addon) => void;
  totalPrice: number;
  templatePrice: number;
  onProceedToCart?: () => void;
}

// Maps addon keywords to visual HTML section generators
function getAddonSectionHtml(addon: Addon, isLocked: boolean): string {
  const lower = addon.name.toLowerCase();

  // Overlay for locked (not selected) add-ons
  const lockOverlay = isLocked ? `
    <div class="addon-overlay" data-addon-id="${addon.id}" style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.88),rgba(245,240,255,0.92));backdrop-filter:blur(8px);z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:all 0.3s ease;" onclick="window.parent.postMessage({type:'toggleAddon',addonId:'${addon.id}'},'*')">
      <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(99,102,241,0.3);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      </div>
      <div style="font-size:15px;font-weight:700;color:#1a1a2e;text-align:center;margin-top:4px;">${addon.name}</div>
      <div style="font-size:20px;font-weight:800;color:#6366f1;">+${formatPrice(addon.price)}</div>
      <div style="margin-top:4px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:10px 32px;border-radius:50px;font-size:13px;font-weight:700;letter-spacing:0.03em;box-shadow:0 4px 16px rgba(99,102,241,0.3);display:flex;align-items:center;gap:6px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Aggiungi al sito
      </div>
      <div style="font-size:10px;color:#888;margin-top:2px;">Sezione extra a pagamento</div>
    </div>
  ` : '';

  const selectedBadge = !isLocked ? `
    <div class="addon-selected-badge" data-addon-id="${addon.id}" style="position:absolute;top:12px;right:12px;background:linear-gradient(135deg,#22c55e,#16a34a);color:white;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:700;z-index:10;display:flex;align-items:center;gap:5px;box-shadow:0 2px 8px rgba(34,197,94,0.3);cursor:pointer;" onclick="window.parent.postMessage({type:'toggleAddon',addonId:'${addon.id}'},'*')">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Incluso &bull; clicca per rimuovere
    </div>
  ` : '';

  let sectionContent = '';

  if (lower.includes('music') || lower.includes('musica')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#1a1a2e,#16213e);text-align:center;position:relative;overflow:hidden;min-height:200px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#8b5cf6;margin-bottom:16px;font-weight:600;">&#127925; Musica di Sottofondo</div>
        <div style="max-width:320px;margin:0 auto;background:rgba(255,255,255,0.05);border-radius:16px;padding:16px;display:flex;align-items:center;gap:14px;">
          <div style="width:50px;height:50px;background:linear-gradient(135deg,#ec4899,#8b5cf6);border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:22px;">&#127925;</div>
          <div style="text-align:left;flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:white;">Can't Help Falling in Love</div>
            <div style="font-size:11px;color:#888;margin-top:2px;">Elvis Presley</div>
            <div style="margin-top:8px;background:rgba(255,255,255,0.1);border-radius:4px;height:4px;overflow:hidden;">
              <div style="width:65%;height:100%;background:linear-gradient(90deg,#ec4899,#8b5cf6);border-radius:4px;"></div>
            </div>
          </div>
          <div style="display:flex;gap:3px;align-items:flex-end;height:28px;">
            <div style="width:3px;background:#ec4899;border-radius:2px;animation:bar1 0.8s ease-in-out infinite;height:8px;"></div>
            <div style="width:3px;background:#a855f7;border-radius:2px;animation:bar2 0.6s ease-in-out infinite;height:16px;"></div>
            <div style="width:3px;background:#ec4899;border-radius:2px;animation:bar3 0.7s ease-in-out infinite;height:12px;"></div>
            <div style="width:3px;background:#a855f7;border-radius:2px;animation:bar1 0.9s ease-in-out infinite;height:20px;"></div>
          </div>
        </div>
      </div>`;
  } else if (lower.includes('galleria') || lower.includes('gallery') || lower.includes('foto')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:#fafafa;text-align:center;position:relative;overflow:hidden;min-height:280px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#6366f1;margin-bottom:8px;font-weight:600;">&#128247; Galleria Premium</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:24px;">I Nostri Momenti</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:500px;margin:0 auto;">
          <div style="aspect-ratio:1;background:linear-gradient(135deg,#fecaca,#fde68a);border-radius:12px;"></div>
          <div style="aspect-ratio:1;background:linear-gradient(135deg,#c7d2fe,#ddd6fe);border-radius:12px;"></div>
          <div style="aspect-ratio:1;background:linear-gradient(135deg,#a7f3d0,#6ee7b7);border-radius:12px;"></div>
          <div style="aspect-ratio:1;background:linear-gradient(135deg,#fde68a,#fcd34d);border-radius:12px;"></div>
          <div style="aspect-ratio:1;background:linear-gradient(135deg,#fbcfe8,#f9a8d4);border-radius:12px;"></div>
          <div style="aspect-ratio:1;background:linear-gradient(135deg,#bfdbfe,#93c5fd);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#3b82f6;font-weight:700;">+24</div>
        </div>
      </div>`;
  } else if (lower.includes('countdown') || lower.includes('timer')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#f8f5ff,#fff);text-align:center;position:relative;overflow:hidden;min-height:200px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#8b5cf6;margin-bottom:8px;font-weight:600;">&#9200; Countdown</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:24px;">Mancano...</div>
        <div style="display:flex;justify-content:center;gap:24px;">
          <div style="text-align:center;background:white;padding:16px 24px;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,0.06);min-width:80px;">
            <div style="font-size:32px;font-weight:200;color:#333;">120</div>
            <div style="font-size:9px;color:#999;text-transform:uppercase;letter-spacing:0.15em;margin-top:4px;">Giorni</div>
          </div>
          <div style="text-align:center;background:white;padding:16px 24px;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,0.06);min-width:80px;">
            <div style="font-size:32px;font-weight:200;color:#333;">14</div>
            <div style="font-size:9px;color:#999;text-transform:uppercase;letter-spacing:0.15em;margin-top:4px;">Ore</div>
          </div>
          <div style="text-align:center;background:white;padding:16px 24px;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,0.06);min-width:80px;">
            <div style="font-size:32px;font-weight:200;color:#333;">32</div>
            <div style="font-size:9px;color:#999;text-transform:uppercase;letter-spacing:0.15em;margin-top:4px;">Min</div>
          </div>
        </div>
      </div>`;
  } else if (lower.includes('rsvp') || lower.includes('conferma')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#6366f1,#8b5cf6);text-align:center;position:relative;overflow:hidden;min-height:280px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:rgba(255,255,255,0.6);margin-bottom:8px;font-weight:600;">&#10003; RSVP Avanzato</div>
        <div style="font-size:22px;font-weight:300;color:white;margin-bottom:24px;">Conferma la Tua Presenza</div>
        <div style="max-width:350px;margin:0 auto;">
          <input style="width:100%;padding:12px 16px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:14px;margin-bottom:8px;box-sizing:border-box;" placeholder="Nome e Cognome" />
          <input style="width:100%;padding:12px 16px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:14px;margin-bottom:8px;box-sizing:border-box;" placeholder="Email" />
          <select style="width:100%;padding:12px 16px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:14px;margin-bottom:12px;box-sizing:border-box;">
            <option>Parteciperò con gioia!</option><option>Purtroppo non posso</option>
          </select>
          <div style="padding:12px 24px;background:white;color:#6366f1;border-radius:10px;font-weight:700;cursor:pointer;">Conferma</div>
        </div>
      </div>`;
  } else if (lower.includes('guestbook') || lower.includes('libro') || lower.includes('messaggi vocali')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#fdf2f8,#fff);text-align:center;position:relative;overflow:hidden;min-height:240px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#ec4899;margin-bottom:8px;font-weight:600;">&#128221; Guestbook Digitale</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:24px;">Lascia un Messaggio</div>
        <div style="max-width:400px;margin:0 auto;display:flex;flex-direction:column;gap:8px;">
          <div style="background:white;border-radius:12px;padding:14px 16px;text-align:left;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
            <div style="font-size:12px;font-weight:600;color:#333;">Mamma e Papà</div>
            <div style="font-size:11px;color:#888;margin-top:4px;font-style:italic;">"Siamo così felici per voi! Vi auguriamo tutto l'amore del mondo."</div>
          </div>
          <div style="background:white;border-radius:12px;padding:14px 16px;text-align:left;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
            <div style="font-size:12px;font-weight:600;color:#333;">Andrea & Sofia</div>
            <div style="font-size:11px;color:#888;margin-top:4px;font-style:italic;">"Non vediamo l'ora di festeggiare con voi! Auguri!"</div>
          </div>
        </div>
      </div>`;
  } else if (lower.includes('dominio') || lower.includes('domain')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:16px 24px;background:linear-gradient(90deg,#6366f1,#8b5cf6);text-align:center;position:relative;overflow:hidden;">
        ${lockOverlay}${selectedBadge}
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;">
          <span style="font-size:14px;opacity:0.7;">&#127760;</span>
          <span style="font-size:14px;font-weight:600;color:white;">marco-e-giulia.matrimonio.it</span>
          <span style="background:rgba(255,255,255,0.2);padding:2px 10px;border-radius:10px;font-size:10px;color:white;font-weight:600;">PERSONALIZZATO</span>
        </div>
      </div>`;
  } else if (lower.includes('invito') || lower.includes('invit')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#f5f3ff,#fff);text-align:center;position:relative;overflow:hidden;min-height:260px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#6366f1;margin-bottom:8px;font-weight:600;">&#128140; Invito Digitale</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:24px;">Il Vostro Invito Personalizzato</div>
        <div style="max-width:260px;margin:0 auto;background:white;border-radius:20px;padding:28px;box-shadow:0 8px 32px rgba(0,0,0,0.08);">
          <div style="font-size:18px;font-weight:300;color:#333;">Marco & Giulia</div>
          <div style="width:30px;height:1px;background:#ddd;margin:10px auto;"></div>
          <div style="font-size:11px;color:#888;">Vi invitano al loro matrimonio</div>
          <div style="font-size:10px;color:#aaa;margin-top:4px;">15 Giugno 2026 • Roma</div>
          <div style="margin-top:14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:8px 20px;border-radius:50px;font-size:11px;font-weight:600;display:inline-block;">Condividi Invito</div>
        </div>
      </div>`;
  } else if (lower.includes('mappa') || lower.includes('map')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:#f8f9fa;text-align:center;position:relative;overflow:hidden;min-height:240px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#6366f1;margin-bottom:8px;font-weight:600;">&#128205; Mappa Interattiva</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:24px;">Come Arrivare</div>
        <div style="max-width:500px;margin:0 auto;height:180px;background:linear-gradient(135deg,#e8e8e8,#ddd);border-radius:16px;display:flex;align-items:center;justify-content:center;color:#888;font-size:14px;position:relative;">
          <div style="position:absolute;inset:8px;border:2px dashed rgba(0,0,0,0.1);border-radius:12px;"></div>
          &#128205; Villa Borghese, Roma
        </div>
      </div>`;
  } else if (lower.includes('timeline') || lower.includes('programma')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:white;text-align:center;position:relative;overflow:hidden;min-height:240px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#6366f1;margin-bottom:8px;font-weight:600;">&#128197; Timeline Evento</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:24px;">Programma della Giornata</div>
        <div style="max-width:400px;margin:0 auto;text-align:left;">
          <div style="display:flex;gap:16px;padding:12px 0;border-left:2px solid #e5e7eb;padding-left:20px;position:relative;"><div style="position:absolute;left:-6px;top:16px;width:10px;height:10px;background:#6366f1;border-radius:50%;border:2px solid white;"></div><div><div style="font-size:12px;color:#6366f1;font-weight:600;">15:00</div><div style="font-size:13px;color:#444;">Cerimonia</div></div></div>
          <div style="display:flex;gap:16px;padding:12px 0;border-left:2px solid #e5e7eb;padding-left:20px;position:relative;"><div style="position:absolute;left:-6px;top:16px;width:10px;height:10px;background:#6366f1;border-radius:50%;border:2px solid white;"></div><div><div style="font-size:12px;color:#6366f1;font-weight:600;">17:00</div><div style="font-size:13px;color:#444;">Aperitivo</div></div></div>
          <div style="display:flex;gap:16px;padding:12px 0;border-left:2px solid #e5e7eb;padding-left:20px;position:relative;"><div style="position:absolute;left:-6px;top:16px;width:10px;height:10px;background:#6366f1;border-radius:50%;border:2px solid white;"></div><div><div style="font-size:12px;color:#6366f1;font-weight:600;">19:30</div><div style="font-size:13px;color:#444;">Cena</div></div></div>
          <div style="display:flex;gap:16px;padding:12px 0;padding-left:20px;position:relative;"><div style="position:absolute;left:-6px;top:16px;width:10px;height:10px;background:#6366f1;border-radius:50%;border:2px solid white;"></div><div><div style="font-size:12px;color:#6366f1;font-weight:600;">22:00</div><div style="font-size:13px;color:#444;">Festa & Balli</div></div></div>
        </div>
      </div>`;
  } else if (lower.includes('story') || lower.includes('storia')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#fff5f5,#fff);text-align:center;position:relative;overflow:hidden;min-height:220px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#ec4899;margin-bottom:8px;font-weight:600;">&#128150; La Nostra Storia</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:16px;">Come Tutto È Iniziato</div>
        <div style="max-width:450px;margin:0 auto;font-size:13px;color:#666;line-height:2;">
          Ci siamo incontrati in una sera d'estate. Un sorriso ha cambiato tutto. Da quel momento, ogni giorno è stato un'avventura meravigliosa che ci ha portato fin qui.
        </div>
      </div>`;
  } else if (lower.includes('lista nozze') || lower.includes('iban') || lower.includes('regalo')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#fef3c7,#fff);text-align:center;position:relative;overflow:hidden;min-height:200px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#d97706;margin-bottom:8px;font-weight:600;">&#127873; Lista Nozze</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:20px;">Il Vostro Regalo</div>
        <div style="max-width:350px;margin:0 auto;background:white;border-radius:16px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
          <div style="font-size:13px;color:#555;line-height:1.8;">La vostra presenza è il regalo più bello. Se desiderate farci un pensiero:</div>
          <div style="margin-top:12px;background:linear-gradient(135deg,#d97706,#f59e0b);color:white;padding:10px 20px;border-radius:10px;font-size:12px;font-weight:600;display:inline-block;">Vedi Lista Nozze</div>
        </div>
      </div>`;
  } else if (lower.includes('save the date')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#fce7f3,#fff);text-align:center;position:relative;overflow:hidden;min-height:200px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#ec4899;margin-bottom:8px;font-weight:600;">&#128276; Save the Date</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:16px;">Segna la Data!</div>
        <div style="max-width:300px;margin:0 auto;background:white;border-radius:16px;padding:24px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
          <div style="font-size:28px;font-weight:200;color:#333;">15 Giugno 2026</div>
          <div style="font-size:12px;color:#888;margin-top:8px;">Aggiungi al calendario</div>
        </div>
      </div>`;
  } else if (lower.includes('faq') || lower.includes('domand')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:#f9fafb;text-align:center;position:relative;overflow:hidden;min-height:200px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#6366f1;margin-bottom:8px;font-weight:600;">&#10067; FAQ</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:24px;">Domande Frequenti</div>
        <div style="max-width:450px;margin:0 auto;text-align:left;">
          <div style="background:white;border-radius:12px;padding:14px 16px;margin-bottom:8px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
            <div style="font-size:13px;font-weight:600;color:#333;">Posso portare accompagnatore?</div>
            <div style="font-size:12px;color:#888;margin-top:4px;">Sì, l'invito è esteso al tuo +1.</div>
          </div>
          <div style="background:white;border-radius:12px;padding:14px 16px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
            <div style="font-size:13px;font-weight:600;color:#333;">C'è parcheggio?</div>
            <div style="font-size:12px;color:#888;margin-top:4px;">Sì, parcheggio gratuito presso la location.</div>
          </div>
        </div>
      </div>`;
  } else if (lower.includes('dress code') || lower.includes('abbigliamento')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#faf5ff,#fff);text-align:center;position:relative;overflow:hidden;min-height:180px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#8b5cf6;margin-bottom:8px;font-weight:600;">&#128087; Dress Code</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:16px;">Come Vestirsi</div>
        <div style="font-size:14px;color:#666;">Elegante &bull; Colori pastello graditi</div>
      </div>`;
  } else if (lower.includes('video') || lower.includes('welcome')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#111827,#1f2937);text-align:center;position:relative;overflow:hidden;min-height:260px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#6366f1;margin-bottom:8px;font-weight:600;">&#127909; Video di Benvenuto</div>
        <div style="font-size:22px;font-weight:300;color:white;margin-bottom:24px;">Il Nostro Messaggio per Voi</div>
        <div style="max-width:400px;margin:0 auto;aspect-ratio:16/9;background:rgba(255,255,255,0.05);border-radius:16px;display:flex;align-items:center;justify-content:center;">
          <div style="width:56px;height:56px;background:rgba(255,255,255,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <div style="width:0;height:0;border-left:20px solid white;border-top:12px solid transparent;border-bottom:12px solid transparent;margin-left:4px;"></div>
          </div>
        </div>
      </div>`;
  } else if (lower.includes('album') || lower.includes('post-wedding')) {
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:48px 24px;background:linear-gradient(135deg,#fffbeb,#fff);text-align:center;position:relative;overflow:hidden;min-height:220px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#d97706;margin-bottom:8px;font-weight:600;">&#128248; Album Post-Matrimonio</div>
        <div style="font-size:22px;font-weight:300;color:#333;margin-bottom:24px;">I Ricordi del Grande Giorno</div>
        <div style="display:flex;justify-content:center;gap:8px;">
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#fde68a,#fbbf24);border-radius:8px;"></div>
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#fed7aa,#fb923c);border-radius:8px;"></div>
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#fecaca,#f87171);border-radius:8px;"></div>
        </div>
      </div>`;
  } else {
    // Generic addon section
    sectionContent = `
      <div id="addon-${addon.id}" style="padding:36px 24px;background:#f8f9fa;text-align:center;position:relative;overflow:hidden;min-height:120px;">
        ${lockOverlay}${selectedBadge}
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#6366f1;margin-bottom:6px;font-weight:600;">&#10024; ${addon.name}</div>
        <div style="font-size:13px;color:#666;max-width:400px;margin:0 auto;">${addon.description}</div>
      </div>`;
  }

  return sectionContent;
}

function buildEnhancedHtml(
  htmlContent: string,
  allAddons: Addon[],
  selectedAddonIds: string[],
): string {
  const addonSections = allAddons
    .filter(a => {
      const cat = a.category;
      const lower = a.name.toLowerCase();
      return cat === 'CONTENT' || cat === 'GRAPHICS' ||
        lower.includes('dominio') || lower.includes('save the date');
    })
    .map(addon => {
      const isLocked = !selectedAddonIds.includes(addon.id);
      return getAddonSectionHtml(addon, isLocked);
    })
    .join('\n');

  const animations = `
    <style>
      @keyframes bar1 { 0%, 100% { height: 8px; } 50% { height: 20px; } }
      @keyframes bar2 { 0%, 100% { height: 16px; } 50% { height: 6px; } }
      @keyframes bar3 { 0%, 100% { height: 12px; } 50% { height: 22px; } }
    </style>
  `;

  const anchorFixScript = `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var target = document.getElementById(targetId);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        });
      });
    </script>
  `;

  let result = htmlContent;
  const footerIndex = result.lastIndexOf('<footer');

  const addonBlock = `
    <!-- Add-on sections integrated into template -->
    ${addonSections}
  `;

  if (footerIndex > -1) {
    result = result.substring(0, footerIndex) + addonBlock + result.substring(footerIndex);
  } else {
    result = result.replace('</body>', `${addonBlock}</body>`);
  }

  result = result.replace('</body>', `${animations}${anchorFixScript}</body>`);

  return result;
}

export default function LivePreviewModal({
  isOpen,
  onClose,
  templateName,
  htmlContent,
  allAddons,
  selectedAddonIds,
  onToggleAddon,
  totalPrice,
  templatePrice,
  onProceedToCart,
}: LivePreviewModalProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState<AddonCategory | 'ALL'>('ALL');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Listen for messages from iframe (addon toggle clicks)
  const handleMessage = useCallback((e: MessageEvent) => {
    if (e.data?.type === 'toggleAddon') {
      const addon = allAddons.find(a => a.id === e.data.addonId);
      if (addon) onToggleAddon(addon);
    }
  }, [allAddons, onToggleAddon]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const filteredAddons = useMemo(() => {
    if (activeCategory === 'ALL') return allAddons;
    return allAddons.filter(a => a.category === activeCategory);
  }, [activeCategory, allAddons]);

  const enhancedHtml = useMemo(() => {
    if (!isOpen) return '';
    return buildEnhancedHtml(htmlContent, allAddons, selectedAddonIds);
  }, [isOpen, htmlContent, allAddons, selectedAddonIds]);

  if (!isOpen) return null;

  const selectedCount = selectedAddonIds.length;
  const addonsTotal = totalPrice - templatePrice;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative bg-white flex transition-all duration-300 z-10 ${
        isFullscreen ? 'w-full h-full' : 'w-[98vw] h-[95vh] max-w-[1800px] m-auto rounded-2xl shadow-2xl overflow-hidden'
      }`}>
        {/* Main preview area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md animate-pulse">LIVE</div>
                <span className="text-sm font-medium text-gray-700">{templateName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                <span className="text-xs text-gray-500">Totale:</span>
                <span className="text-sm font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
              {selectedCount > 0 && (
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                  {selectedCount} add-on
                </span>
              )}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-1.5 rounded-md transition-colors ${sidebarOpen ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                title="Pannello Add-on"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-1.5 text-gray-400 hover:text-gray-600">
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview iframe */}
          <div className="flex-1 overflow-hidden bg-gray-100 flex items-start justify-center p-4">
            <div className={`h-full bg-white shadow-lg transition-all duration-300 ${
              viewMode === 'mobile' ? 'w-[375px] rounded-[2rem] border-[8px] border-gray-800' : 'w-full rounded-lg'
            }`}>
              <iframe
                ref={iframeRef}
                srcDoc={enhancedHtml}
                className="w-full h-full border-0"
                style={{ borderRadius: viewMode === 'mobile' ? '1.5rem' : '0.5rem' }}
                title={`Anteprima ${templateName}`}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Add-on Panel */}
        {sidebarOpen && (
          <div className="w-[340px] flex-shrink-0 border-l border-gray-200 bg-white flex flex-col overflow-hidden">
            {/* Sidebar header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Aggiungi Sezioni
                </h3>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">Clicca per aggiungere/rimuovere. Vedrai subito il risultato nel template.</p>
            </div>

            {/* Category chips */}
            <div className="px-3 py-2 border-b border-gray-100 flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory('ALL')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                  activeCategory === 'ALL' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                Tutti
              </button>
              {Object.entries(ADDON_CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key as AddonCategory)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                    activeCategory === key ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Addon list - scrollable */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5">
              {filteredAddons.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => onToggleAddon(addon)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'bg-primary/5 border-primary/40 shadow-sm'
                        : 'bg-white border-gray-100 hover:border-primary/30 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isSelected ? <Check className="w-4 h-4" /> : <span className="text-sm">+</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-foreground truncate">{addon.name}</span>
                        {addon.isPopular && (
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-primary font-bold">{formatPrice(addon.price)}</span>
                    </div>
                    {isSelected && (
                      <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex-shrink-0">ON</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sidebar footer with totals */}
            <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Template</span>
                <span className="text-xs font-medium">{formatPrice(templatePrice)}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{selectedCount} add-on</span>
                  <span className="text-xs font-medium">+{formatPrice(addonsTotal)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 mb-3">
                <span className="text-sm font-bold">Totale</span>
                <span className="text-lg font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
              {onProceedToCart && (
                <button
                  onClick={onProceedToCart}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Vai al Carrello
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
