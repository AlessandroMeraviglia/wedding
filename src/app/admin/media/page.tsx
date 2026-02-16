'use client';

import { useState, useEffect } from 'react';
import {
  Image as ImageIcon, Film, Save, Link as LinkIcon,
  ExternalLink, CheckCircle, AlertCircle, Loader2, RefreshCw,
  Trash2, Eye, Layers
} from 'lucide-react';

interface MediaSlot {
  id: string;
  label: string;
  section: string;
  type: 'image' | 'video';
  imageUrl: string;
  videoUrl: string;
  overlayColor: string;
  overlayOpacity: number;
  description: string;
  saving?: boolean;
  saveError?: string;
}

const INITIAL_MEDIA_SLOTS: MediaSlot[] = [
  {
    id: 'hero-bg',
    label: 'Hero Background',
    section: 'Hero principale',
    type: 'image',
    imageUrl: '',
    videoUrl: '',
    overlayColor: '#000000',
    overlayOpacity: 0,
    description: 'Immagine di sfondo della sezione Hero. Inserisci un URL diretto ad un\'immagine (JPG/PNG/WebP). Consigliato: 1920x1080px.',
  },
  {
    id: 'showcase-video',
    label: 'Video Showcase',
    section: 'Sezione Showcase',
    type: 'video',
    imageUrl: '',
    videoUrl: '',
    overlayColor: '#000000',
    overlayOpacity: 0,
    description: 'Video delle realizzazioni dei designer. Inserisci un link YouTube o Vimeo.',
  },
  {
    id: 'showcase-bg',
    label: 'Showcase Background',
    section: 'Sezione Showcase',
    type: 'image',
    imageUrl: '',
    videoUrl: '',
    overlayColor: '#000000',
    overlayOpacity: 0,
    description: 'Immagine di sfondo della sezione video. Inserisci un URL diretto ad un\'immagine. Consigliato: 1920x800px.',
  },
  {
    id: 'gallery-1',
    label: 'Ispirazione 1',
    section: 'Galleria Ispirazioni',
    type: 'image',
    imageUrl: '',
    videoUrl: '',
    overlayColor: '#000000',
    overlayOpacity: 0,
    description: 'Prima immagine della galleria ispirazioni. Consigliato: 800x600px.',
  },
  {
    id: 'gallery-2',
    label: 'Ispirazione 2',
    section: 'Galleria Ispirazioni',
    type: 'image',
    imageUrl: '',
    videoUrl: '',
    overlayColor: '#000000',
    overlayOpacity: 0,
    description: 'Seconda immagine della galleria ispirazioni. Consigliato: 800x600px.',
  },
  {
    id: 'gallery-3',
    label: 'Ispirazione 3',
    section: 'Galleria Ispirazioni',
    type: 'image',
    imageUrl: '',
    videoUrl: '',
    overlayColor: '#000000',
    overlayOpacity: 0,
    description: 'Terza immagine della galleria ispirazioni. Consigliato: 800x600px.',
  },
  {
    id: 'gallery-4',
    label: 'Ispirazione 4',
    section: 'Galleria Ispirazioni',
    type: 'image',
    imageUrl: '',
    videoUrl: '',
    overlayColor: '#000000',
    overlayOpacity: 0,
    description: 'Quarta immagine della galleria ispirazioni. Consigliato: 800x600px.',
  },
];

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export default function AdminMediaPage() {
  const [mediaSlots, setMediaSlots] = useState<MediaSlot[]>(INITIAL_MEDIA_SLOTS);
  const [savedNotice, setSavedNotice] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadMedia() {
      try {
        const res = await fetch('/api/admin/media');
        if (res.ok) {
          const data = await res.json();
          if (data.slots) {
            setMediaSlots(prev => prev.map(slot => {
              const serverSlot = data.slots.find((s: { id: string }) => s.id === slot.id);
              if (serverSlot) {
                return {
                  ...slot,
                  imageUrl: serverSlot.imageUrl || '',
                  videoUrl: serverSlot.videoUrl || '',
                  overlayColor: serverSlot.overlayColor || '#000000',
                  overlayOpacity: serverSlot.overlayOpacity ?? 0,
                };
              }
              return slot;
            }));
          }
        }
      } catch {
        // Ignore load errors
      } finally {
        setLoading(false);
      }
    }
    loadMedia();
  }, []);

  const updateSlot = (id: string, updates: Partial<MediaSlot>) => {
    setMediaSlots(prev => prev.map(slot =>
      slot.id === id ? { ...slot, ...updates } : slot
    ));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const slotsData: Record<string, { imageUrl: string; videoUrl: string; overlayColor: string; overlayOpacity: number }> = {};
      for (const slot of mediaSlots) {
        slotsData[slot.id] = {
          imageUrl: slot.imageUrl,
          videoUrl: slot.videoUrl,
          overlayColor: slot.overlayColor,
          overlayOpacity: slot.overlayOpacity,
        };
      }

      const res = await fetch('/api/admin/media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slots: slotsData }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Errore nel salvataggio');
      }

      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Errore nel salvataggio');
    } finally {
      setSaving(false);
    }
  };

  const groupedSlots = mediaSlots.reduce((groups, slot) => {
    const section = slot.section;
    if (!groups[section]) groups[section] = [];
    groups[section].push(slot);
    return groups;
  }, {} as Record<string, MediaSlot[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Caricamento media...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Homepage</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestisci immagini e video della homepage tramite URL. Aggiungi overlay con colore e trasparenza.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="text-sm text-success font-medium animate-pulse">Salvato!</span>
          )}
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Salvataggio...' : 'Salva Modifiche'}
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <LinkIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Come funziona</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ogni slot corrisponde a una sezione della homepage. Per le <strong>immagini</strong>, inserisci
              un URL diretto (es. da Unsplash, Cloudinary, Google Drive, ecc.). Per i <strong>video</strong>,
              inserisci un link YouTube o Vimeo. Per ogni immagine puoi attivare un <strong>overlay</strong> con
              colore e trasparenza personalizzabili. Clicca &quot;Salva Modifiche&quot; per applicare.
            </p>
          </div>
        </div>
      </div>

      {/* Media Slots grouped by section */}
      <div className="space-y-8">
        {Object.entries(groupedSlots).map(([section, slots]) => (
          <div key={section}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              {slots.some(s => s.type === 'video')
                ? <Film className="w-5 h-5 text-primary" />
                : <ImageIcon className="w-5 h-5 text-primary" />
              }
              {section}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slots.map((slot) => {
                const hasImage = slot.type === 'image' && slot.imageUrl;
                const hasVideo = slot.type === 'video' && slot.videoUrl;
                const youtubeId = slot.videoUrl ? getYouTubeId(slot.videoUrl) : null;
                const vimeoId = slot.videoUrl ? getVimeoId(slot.videoUrl) : null;

                return (
                  <div
                    key={slot.id}
                    className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-sm transition-shadow"
                  >
                    {/* Preview Area */}
                    <div className="aspect-video bg-gradient-to-br from-muted to-secondary relative flex items-center justify-center overflow-hidden">
                      {hasImage ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={slot.imageUrl}
                            alt={slot.label}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          {/* Overlay */}
                          {slot.overlayOpacity > 0 && (
                            <div
                              className="absolute inset-0 z-[1]"
                              style={{
                                backgroundColor: slot.overlayColor,
                                opacity: slot.overlayOpacity / 100,
                              }}
                            />
                          )}
                        </>
                      ) : hasVideo && youtubeId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}`}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={slot.label}
                        />
                      ) : hasVideo && vimeoId ? (
                        <iframe
                          src={`https://player.vimeo.com/video/${vimeoId}`}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={slot.label}
                        />
                      ) : (
                        <div className="text-center">
                          {slot.type === 'video' ? (
                            <Film className="w-10 h-10 text-primary/20 mx-auto mb-2" />
                          ) : (
                            <ImageIcon className="w-10 h-10 text-primary/20 mx-auto mb-2" />
                          )}
                          <p className="text-xs text-muted-foreground">Nessun URL inserito</p>
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 z-[2]">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          slot.type === 'video'
                            ? 'bg-purple-500/90 text-white'
                            : 'bg-blue-500/90 text-white'
                        }`}>
                          {slot.type === 'video' ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                          {slot.type === 'video' ? 'VIDEO' : 'IMMAGINE'}
                        </span>
                      </div>

                      {/* Active badge */}
                      {(hasImage || hasVideo) && (
                        <div className="absolute top-3 right-3 z-[2]">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-green-500/90 text-white">
                            <CheckCircle className="w-3 h-3" />
                            Attivo
                          </span>
                        </div>
                      )}

                      {/* Overlay indicator */}
                      {slot.type === 'image' && slot.overlayOpacity > 0 && (
                        <div className="absolute bottom-3 left-3 z-[2]">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-white/90 text-foreground">
                            <Layers className="w-3 h-3" />
                            Overlay {slot.overlayOpacity}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-foreground">{slot.label}</h3>
                        <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {slot.id}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{slot.description}</p>

                      {/* Save Error */}
                      {slot.saveError && (
                        <div className="flex items-center gap-2 p-2 mb-3 rounded-lg bg-red-50 border border-red-200">
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <p className="text-xs text-red-600">{slot.saveError}</p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {/* Image URL Input */}
                        {slot.type === 'image' && (
                          <div>
                            <div className="text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                              <LinkIcon className="w-3 h-3" />
                              URL Immagine
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                placeholder="https://example.com/immagine.jpg"
                                value={slot.imageUrl}
                                onChange={(e) => updateSlot(slot.id, { imageUrl: e.target.value })}
                                className="flex-1 px-3 py-2 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                              />
                              {slot.imageUrl && (
                                <a
                                  href={slot.imageUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl border border-border hover:bg-primary/5 transition-colors"
                                  title="Apri immagine"
                                >
                                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Video URL Input */}
                        {slot.type === 'video' && (
                          <div>
                            <div className="text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                              <LinkIcon className="w-3 h-3" />
                              URL Video (YouTube, Vimeo)
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                placeholder="https://youtube.com/watch?v=... oppure https://vimeo.com/..."
                                value={slot.videoUrl}
                                onChange={(e) => updateSlot(slot.id, { videoUrl: e.target.value })}
                                className="flex-1 px-3 py-2 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                              />
                              {slot.videoUrl && (
                                <a
                                  href={slot.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl border border-border hover:bg-primary/5 transition-colors"
                                  title="Apri video"
                                >
                                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Overlay Controls (only for images) */}
                        {slot.type === 'image' && (
                          <div className="bg-muted/50 rounded-xl p-3 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                              <Layers className="w-3.5 h-3.5 text-primary" />
                              Overlay Immagine
                            </div>

                            {/* Color picker */}
                            <div className="flex items-center gap-3">
                              <label className="text-[11px] text-muted-foreground w-14">Colore</label>
                              <div className="flex items-center gap-2 flex-1">
                                <input
                                  type="color"
                                  value={slot.overlayColor}
                                  onChange={(e) => updateSlot(slot.id, { overlayColor: e.target.value })}
                                  className="w-8 h-8 rounded-lg border border-border cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={slot.overlayColor}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^#[0-9a-fA-F]{0,6}$/.test(val)) {
                                      updateSlot(slot.id, { overlayColor: val });
                                    }
                                  }}
                                  className="w-24 px-2 py-1.5 rounded-lg border border-border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                                  maxLength={7}
                                />
                              </div>
                            </div>

                            {/* Opacity slider */}
                            <div className="flex items-center gap-3">
                              <label className="text-[11px] text-muted-foreground w-14">Opacita</label>
                              <div className="flex items-center gap-2 flex-1">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={slot.overlayOpacity}
                                  onChange={(e) => updateSlot(slot.id, { overlayOpacity: Number(e.target.value) })}
                                  className="flex-1 accent-primary"
                                />
                                <span className="text-xs font-mono text-foreground w-10 text-right">{slot.overlayOpacity}%</span>
                              </div>
                            </div>

                            {/* Live preview swatch */}
                            {slot.overlayOpacity > 0 && (
                              <div className="flex items-center gap-2">
                                <Eye className="w-3 h-3 text-muted-foreground" />
                                <span className="text-[10px] text-muted-foreground">Anteprima:</span>
                                <div
                                  className="w-16 h-6 rounded border border-border relative overflow-hidden"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-blue-200" />
                                  <div
                                    className="absolute inset-0"
                                    style={{
                                      backgroundColor: slot.overlayColor,
                                      opacity: slot.overlayOpacity / 100,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Current URL info */}
                        {(slot.imageUrl || slot.videoUrl) && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                            <p className="text-xs text-green-700 font-medium truncate">
                              URL attivo: <code className="bg-green-100 px-1 rounded">{(slot.imageUrl || slot.videoUrl).substring(0, 60)}...</code>
                            </p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex gap-2">
                            {(slot.imageUrl || slot.videoUrl) && (
                              <button
                                onClick={() => updateSlot(slot.id, {
                                  imageUrl: '',
                                  videoUrl: '',
                                  overlayColor: '#000000',
                                  overlayOpacity: 0,
                                  saveError: undefined,
                                })}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-error bg-error/10 hover:bg-error/20 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                Rimuovi
                              </button>
                            )}
                          </div>
                          <span className={`text-[10px] font-medium ${
                            slot.imageUrl || slot.videoUrl ? 'text-success' : 'text-muted-foreground'
                          }`}>
                            {slot.imageUrl || slot.videoUrl ? 'URL configurato' : 'Vuoto'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Save Footer */}
      <div className="mt-8 bg-white rounded-2xl border border-border p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Pronto a pubblicare le modifiche?</p>
          <p className="text-xs text-muted-foreground">Le modifiche saranno visibili subito sulla homepage.</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Salvataggio...' : 'Salva e Pubblica'}
        </button>
      </div>
    </div>
  );
}
