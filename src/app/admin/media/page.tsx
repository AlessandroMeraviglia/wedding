'use client';

import { useState } from 'react';
import {
  Image as ImageIcon, Film, Upload, Trash2, Save, Link as LinkIcon,
  ExternalLink, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';

interface MediaSlot {
  id: string;
  label: string;
  section: string;
  type: 'image' | 'video';
  currentSrc: string;
  videoUrl: string;
  description: string;
  uploading?: boolean;
  uploadError?: string;
}

const INITIAL_MEDIA_SLOTS: MediaSlot[] = [
  {
    id: 'hero-bg',
    label: 'Hero Background',
    section: 'Hero principale',
    type: 'image',
    currentSrc: '',
    videoUrl: '',
    description: 'Immagine di sfondo della sezione Hero. Consigliato: 1920x1080px, JPG/PNG/WebP.',
  },
  {
    id: 'showcase-video',
    label: 'Video Showcase',
    section: 'Sezione Showcase',
    type: 'video',
    currentSrc: '',
    videoUrl: '',
    description: 'Video delle realizzazioni dei designer. Carica un file MP4 o inserisci un link YouTube/Vimeo.',
  },
  {
    id: 'showcase-bg',
    label: 'Showcase Background',
    section: 'Sezione Showcase',
    type: 'image',
    currentSrc: '',
    videoUrl: '',
    description: 'Immagine di sfondo della sezione video. Consigliato: 1920x800px.',
  },
  {
    id: 'gallery-1',
    label: 'Ispirazione 1',
    section: 'Galleria Ispirazioni',
    type: 'image',
    currentSrc: '',
    videoUrl: '',
    description: 'Prima immagine della galleria ispirazioni. Consigliato: 800x600px.',
  },
  {
    id: 'gallery-2',
    label: 'Ispirazione 2',
    section: 'Galleria Ispirazioni',
    type: 'image',
    currentSrc: '',
    videoUrl: '',
    description: 'Seconda immagine della galleria ispirazioni. Consigliato: 800x600px.',
  },
  {
    id: 'gallery-3',
    label: 'Ispirazione 3',
    section: 'Galleria Ispirazioni',
    type: 'image',
    currentSrc: '',
    videoUrl: '',
    description: 'Terza immagine della galleria ispirazioni. Consigliato: 800x600px.',
  },
  {
    id: 'gallery-4',
    label: 'Ispirazione 4',
    section: 'Galleria Ispirazioni',
    type: 'image',
    currentSrc: '',
    videoUrl: '',
    description: 'Quarta immagine della galleria ispirazioni. Consigliato: 800x600px.',
  },
];

export default function AdminMediaPage() {
  const [mediaSlots, setMediaSlots] = useState<MediaSlot[]>(INITIAL_MEDIA_SLOTS);
  const [savedNotice, setSavedNotice] = useState(false);

  const updateSlot = (id: string, updates: Partial<MediaSlot>) => {
    setMediaSlots(prev => prev.map(slot =>
      slot.id === id ? { ...slot, ...updates } : slot
    ));
  };

  const handleFileUpload = async (slotId: string, file: File, mediaType: 'image' | 'video') => {
    updateSlot(slotId, { uploading: true, uploadError: undefined });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('slotId', slotId);
      formData.append('type', mediaType);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        updateSlot(slotId, { uploading: false, uploadError: data.error || 'Errore durante il caricamento' });
        return;
      }

      // Use the server-returned URL (e.g. /img/hero-bg.jpg)
      updateSlot(slotId, {
        currentSrc: data.url,
        uploading: false,
        uploadError: undefined,
      });
    } catch {
      updateSlot(slotId, {
        uploading: false,
        uploadError: 'Errore di rete. Riprova.',
      });
    }
  };

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const groupedSlots = mediaSlots.reduce((groups, slot) => {
    const section = slot.section;
    if (!groups[section]) groups[section] = [];
    groups[section].push(slot);
    return groups;
  }, {} as Record<string, MediaSlot[]>);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Homepage</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestisci immagini e video della homepage. Carica file o inserisci link esterni.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="text-sm text-success font-medium animate-pulse">Salvato!</span>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            <Save className="w-4 h-4" />
            Salva Modifiche
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <ImageIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Come funziona</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ogni slot corrisponde a una sezione della homepage. Per le <strong>immagini</strong>, carica
              un file JPG/PNG/WebP. Per i <strong>video</strong>, puoi caricare un file MP4 oppure inserire un
              link esterno (YouTube, Vimeo). I file vengono salvati nelle cartelle <code className="bg-muted px-1 rounded">/public/img</code> e <code className="bg-muted px-1 rounded">/public/video</code> e
              saranno visibili immediatamente sulla homepage.
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
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-sm transition-shadow"
                >
                  {/* Preview Area */}
                  <div className="aspect-video bg-gradient-to-br from-muted to-secondary relative flex items-center justify-center overflow-hidden">
                    {slot.currentSrc ? (
                      slot.type === 'image' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={slot.currentSrc}
                          alt={slot.label}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={slot.currentSrc}
                          className="absolute inset-0 w-full h-full object-cover"
                          muted
                          playsInline
                        />
                      )
                    ) : slot.videoUrl ? (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2">
                        <Film className="w-10 h-10 text-white/40" />
                        <p className="text-xs text-white/60 max-w-[200px] truncate">{slot.videoUrl}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        {slot.type === 'video' ? (
                          <Film className="w-10 h-10 text-primary/20 mx-auto mb-2" />
                        ) : (
                          <ImageIcon className="w-10 h-10 text-primary/20 mx-auto mb-2" />
                        )}
                        <p className="text-xs text-muted-foreground">Nessun file caricato</p>
                      </div>
                    )}

                    {/* Uploading overlay */}
                    {slot.uploading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
                          <p className="text-xs font-medium text-foreground">Caricamento in corso...</p>
                        </div>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        slot.type === 'video'
                          ? 'bg-purple-500/90 text-white'
                          : 'bg-blue-500/90 text-white'
                      }`}>
                        {slot.type === 'video' ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                        {slot.type === 'video' ? 'VIDEO' : 'IMMAGINE'}
                      </span>
                    </div>

                    {/* Success badge */}
                    {slot.currentSrc && !slot.uploading && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-green-500/90 text-white">
                          <CheckCircle className="w-3 h-3" />
                          Caricato
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

                    {/* Upload Error */}
                    {slot.uploadError && (
                      <div className="flex items-center gap-2 p-2 mb-3 rounded-lg bg-red-50 border border-red-200">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <p className="text-xs text-red-600">{slot.uploadError}</p>
                      </div>
                    )}

                    {/* Upload / URL Input */}
                    <div className="space-y-3">
                      {/* File Upload */}
                      <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed transition-all ${
                        slot.uploading
                          ? 'border-primary/30 bg-primary/5 cursor-wait opacity-60'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
                      }`}>
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            {slot.type === 'video' ? 'Carica file video (MP4, WebM)' : 'Carica immagine (JPG, PNG, WebP)'}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Max 50MB — Il file viene salvato in /public/{slot.type === 'video' ? 'video' : 'img'}/
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          disabled={slot.uploading}
                          accept={slot.type === 'video' ? 'video/mp4,video/webm' : 'image/jpeg,image/png,image/webp'}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(slot.id, file, slot.type);
                            }
                            // Reset input so the same file can be re-selected
                            e.target.value = '';
                          }}
                        />
                      </label>

                      {/* External URL (for videos) */}
                      {slot.type === 'video' && (
                        <div>
                          <div className="block text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" />
                            Oppure inserisci link esterno (YouTube, Vimeo)
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
                              >
                                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Current file path info */}
                      {slot.currentSrc && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                          <p className="text-xs text-green-700 font-medium truncate">
                            File salvato: <code className="bg-green-100 px-1 rounded">{slot.currentSrc}</code>
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex gap-2">
                          {(slot.currentSrc || slot.videoUrl) && (
                            <button
                              onClick={() => updateSlot(slot.id, { currentSrc: '', videoUrl: '', uploadError: undefined })}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-error bg-error/10 hover:bg-error/20 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              Rimuovi
                            </button>
                          )}
                        </div>
                        <span className={`text-[10px] font-medium ${
                          slot.currentSrc || slot.videoUrl ? 'text-success' : 'text-muted-foreground'
                        }`}>
                          {slot.uploading ? 'Caricamento...' : slot.currentSrc || slot.videoUrl ? 'File presente' : 'Vuoto'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          <Save className="w-4 h-4" />
          Salva e Pubblica
        </button>
      </div>
    </div>
  );
}
