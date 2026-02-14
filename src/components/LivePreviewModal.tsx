'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Monitor, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface LivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  htmlContent: string;
  activeAddons?: string[];
}

function getAddonVisualHtml(addonNames: string[]): string {
  if (addonNames.length === 0) return '';

  const visuals: string[] = [];

  for (const name of addonNames) {
    const lower = name.toLowerCase();

    if (lower.includes('music') || lower.includes('musica')) {
      visuals.push(`
        <div style="position:fixed;bottom:24px;left:24px;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);color:white;padding:14px 20px;border-radius:16px;font-family:-apple-system,sans-serif;z-index:9999;display:flex;align-items:center;gap:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);animation:addonSlideUp 0.5s ease;">
          <div style="width:44px;height:44px;background:linear-gradient(135deg,#ec4899,#8b5cf6);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">&#127925;</div>
          <div>
            <div style="font-size:13px;font-weight:600;">Can't Help Falling in Love</div>
            <div style="font-size:11px;color:#aaa;margin-top:2px;">Elvis Presley</div>
          </div>
          <div style="display:flex;gap:3px;align-items:flex-end;height:24px;margin-left:8px;">
            <div style="width:3px;height:8px;background:#ec4899;border-radius:2px;animation:bar1 0.8s ease-in-out infinite;"></div>
            <div style="width:3px;height:16px;background:#a855f7;border-radius:2px;animation:bar2 0.6s ease-in-out infinite;"></div>
            <div style="width:3px;height:12px;background:#ec4899;border-radius:2px;animation:bar3 0.7s ease-in-out infinite;"></div>
            <div style="width:3px;height:20px;background:#a855f7;border-radius:2px;animation:bar1 0.9s ease-in-out infinite;"></div>
            <div style="width:3px;height:10px;background:#ec4899;border-radius:2px;animation:bar2 0.5s ease-in-out infinite;"></div>
          </div>
        </div>
      `);
    } else if (lower.includes('galleria') || lower.includes('gallery') || lower.includes('foto')) {
      visuals.push(`
        <div style="position:fixed;bottom:24px;right:24px;background:white;border-radius:16px;padding:16px;box-shadow:0 8px 32px rgba(0,0,0,0.15);font-family:-apple-system,sans-serif;z-index:9999;animation:addonSlideUp 0.5s ease 0.1s both;max-width:220px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#6366f1;margin-bottom:10px;">&#128247; Galleria Premium</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">
            <div style="aspect-ratio:1;background:linear-gradient(135deg,#fecaca,#fde68a);border-radius:6px;"></div>
            <div style="aspect-ratio:1;background:linear-gradient(135deg,#c7d2fe,#ddd6fe);border-radius:6px;"></div>
            <div style="aspect-ratio:1;background:linear-gradient(135deg,#a7f3d0,#6ee7b7);border-radius:6px;"></div>
            <div style="aspect-ratio:1;background:linear-gradient(135deg,#fde68a,#fcd34d);border-radius:6px;"></div>
            <div style="aspect-ratio:1;background:linear-gradient(135deg,#fbcfe8,#f9a8d4);border-radius:6px;"></div>
            <div style="aspect-ratio:1;background:linear-gradient(135deg,#bfdbfe,#93c5fd);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#3b82f6;font-weight:700;">+24</div>
          </div>
        </div>
      `);
    } else if (lower.includes('countdown') || lower.includes('timer')) {
      visuals.push(`
        <div style="position:fixed;top:24px;right:24px;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);color:white;padding:16px 22px;border-radius:16px;font-family:-apple-system,sans-serif;z-index:9999;animation:addonSlideDown 0.5s ease 0.15s both;box-shadow:0 8px 32px rgba(0,0,0,0.3);">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#fbbf24;margin-bottom:10px;font-weight:600;">&#9200; Conto alla Rovescia</div>
          <div style="display:flex;gap:16px;text-align:center;">
            <div><div style="font-size:28px;font-weight:200;">120</div><div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:0.1em;">giorni</div></div>
            <div style="color:#555;font-size:24px;font-weight:200;">:</div>
            <div><div style="font-size:28px;font-weight:200;">14</div><div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:0.1em;">ore</div></div>
            <div style="color:#555;font-size:24px;font-weight:200;">:</div>
            <div><div style="font-size:28px;font-weight:200;">32</div><div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:0.1em;">min</div></div>
          </div>
        </div>
      `);
    } else if (lower.includes('rsvp') || lower.includes('conferma')) {
      visuals.push(`
        <div style="position:fixed;bottom:24px;right:24px;z-index:9999;animation:addonSlideUp 0.5s ease 0.2s both;">
          <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:14px 24px;border-radius:50px;font-family:-apple-system,sans-serif;font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(99,102,241,0.4);cursor:pointer;">
            <span style="font-size:18px;">&#10003;</span> Conferma Presenza
            <div style="width:8px;height:8px;background:#4ade80;border-radius:50%;animation:pulse 1.5s infinite;"></div>
          </div>
        </div>
      `);
    } else if (lower.includes('guestbook') || lower.includes('libro') || lower.includes('messaggi')) {
      visuals.push(`
        <div style="position:fixed;top:24px;left:24px;background:white;border-radius:16px;padding:16px;box-shadow:0 8px 32px rgba(0,0,0,0.12);font-family:-apple-system,sans-serif;z-index:9999;animation:addonSlideDown 0.5s ease 0.25s both;max-width:240px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#ec4899;margin-bottom:10px;">&#128221; Guestbook</div>
          <div style="background:#fdf2f8;border-radius:10px;padding:10px 12px;margin-bottom:6px;">
            <div style="font-size:11px;font-weight:600;color:#333;">Mamma e Papà</div>
            <div style="font-size:10px;color:#888;margin-top:2px;font-style:italic;">"Siamo così felici per voi! Vi auguriamo tutto l'amore..."</div>
          </div>
          <div style="background:#f0fdf4;border-radius:10px;padding:10px 12px;">
            <div style="font-size:11px;font-weight:600;color:#333;">Andrea & Sofia</div>
            <div style="font-size:10px;color:#888;margin-top:2px;font-style:italic;">"Non vediamo l'ora di festeggiare con voi!"</div>
          </div>
        </div>
      `);
    } else if (lower.includes('dominio') || lower.includes('domain')) {
      visuals.push(`
        <div style="position:fixed;top:0;left:0;right:0;background:linear-gradient(90deg,#6366f1,#8b5cf6);color:white;padding:8px 0;text-align:center;font-family:-apple-system,sans-serif;font-size:12px;z-index:9999;animation:addonSlideDown 0.3s ease;">
          <span style="opacity:0.7;">&#127760;</span> <span style="font-weight:600;">marco-e-giulia.matrimonio.it</span> <span style="background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:10px;font-size:10px;margin-left:6px;">PERSONALIZZATO</span>
        </div>
      `);
    } else if (lower.includes('invit') || lower.includes('digitale')) {
      visuals.push(`
        <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;border-radius:20px;padding:32px;box-shadow:0 24px 64px rgba(0,0,0,0.2);font-family:-apple-system,sans-serif;z-index:9999;animation:addonFadeIn 0.6s ease 0.3s both;text-align:center;max-width:280px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#6366f1;margin-bottom:12px;">&#128140; Invito Digitale</div>
          <div style="font-size:20px;font-weight:300;color:#333;line-height:1.4;">Marco & Giulia</div>
          <div style="width:40px;height:1px;background:#ddd;margin:12px auto;"></div>
          <div style="font-size:12px;color:#888;">Vi invitano al loro matrimonio</div>
          <div style="font-size:11px;color:#aaa;margin-top:6px;">15 Giugno 2026 &bull; Roma</div>
          <div style="margin-top:16px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:10px 24px;border-radius:50px;font-size:12px;font-weight:600;display:inline-block;">Apri Invito</div>
        </div>
      `);
    } else {
      visuals.push(`
        <div style="position:fixed;bottom:${24 + visuals.length * 50}px;right:24px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:8px 16px;border-radius:20px;font-family:-apple-system,sans-serif;font-size:12px;font-weight:500;z-index:9999;box-shadow:0 4px 16px rgba(99,102,241,0.3);animation:addonSlideUp 0.4s ease ${0.1 * visuals.length}s both;">
          &#10003; ${name}
        </div>
      `);
    }
  }

  const animations = `
    <style>
      @keyframes addonSlideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes addonSlideDown { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes addonFadeIn { from { opacity: 0; transform: translate(-50%,-50%) scale(0.9); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
      @keyframes bar1 { 0%, 100% { height: 8px; } 50% { height: 20px; } }
      @keyframes bar2 { 0%, 100% { height: 16px; } 50% { height: 6px; } }
      @keyframes bar3 { 0%, 100% { height: 12px; } 50% { height: 22px; } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    </style>
  `;

  return animations + visuals.join('');
}

export default function LivePreviewModal({
  isOpen,
  onClose,
  templateName,
  htmlContent,
  activeAddons = [],
}: LivePreviewModalProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const getEnhancedHtml = () => {
    if (activeAddons.length === 0) return htmlContent;
    const addonHtml = getAddonVisualHtml(activeAddons);
    return htmlContent.replace('</body>', `${addonHtml}</body>`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
        isFullscreen ? 'w-full h-full rounded-none' : 'w-[95vw] h-[90vh] max-w-6xl'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md animate-pulse">
                LIVE
              </div>
              <span className="text-sm font-medium text-gray-700">{templateName}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeAddons.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {activeAddons.length} add-on attivi
              </span>
            )}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'desktop' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'mobile' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden bg-gray-100 flex items-start justify-center p-4">
          <div className={`h-full bg-white shadow-lg transition-all duration-300 ${
            viewMode === 'mobile' ? 'w-[375px] rounded-[2rem] border-[8px] border-gray-800' : 'w-full rounded-lg'
          }`}>
            <iframe
              ref={iframeRef}
              srcDoc={getEnhancedHtml()}
              className="w-full h-full border-0"
              style={{ borderRadius: viewMode === 'mobile' ? '1.5rem' : '0.5rem' }}
              title={`Anteprima ${templateName}`}
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
