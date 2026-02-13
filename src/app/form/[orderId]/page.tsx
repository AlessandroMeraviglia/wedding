'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Save, Check, Upload, ChevronRight, ChevronLeft, Heart,
  User, Calendar, MapPin, Type, Palette, Music, Users, FileText
} from 'lucide-react';

interface FormData {
  brideName: string;
  groomName: string;
  weddingDate: string;
  location: string;
  locationAddress: string;
  ceremonyTime: string;
  receptionTime: string;
  welcomeText: string;
  coupleStory: string;
  fontChoice: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  playlistUrl: string;
  freeNotes: string;
  dressCode: string;
  faqItems: string;
}

const STEPS = [
  { id: 'couple', label: 'La Coppia', icon: Heart },
  { id: 'event', label: 'Evento', icon: Calendar },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'texts', label: 'Testi', icon: Type },
  { id: 'style', label: 'Stile', icon: Palette },
  { id: 'media', label: 'Media', icon: Music },
  { id: 'guests', label: 'Ospiti', icon: Users },
  { id: 'review', label: 'Riepilogo', icon: FileText },
];

const FONTS = [
  'Playfair Display', 'Cormorant Garamond', 'Great Vibes', 'Lora',
  'Montserrat', 'Raleway', 'Dancing Script', 'Josefin Sans',
];

export default function PostPaymentFormPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    brideName: '',
    groomName: '',
    weddingDate: '',
    location: '',
    locationAddress: '',
    ceremonyTime: '',
    receptionTime: '',
    welcomeText: '',
    coupleStory: '',
    fontChoice: 'Playfair Display',
    primaryColor: '#b8860b',
    secondaryColor: '#f4e8d1',
    accentColor: '#c9184a',
    playlistUrl: '',
    freeNotes: '',
    dressCode: '',
    faqItems: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleSave(false);
    }, 30000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleSave = useCallback(async (showFeedback = true) => {
    setIsSaving(true);
    try {
      await fetch(`/api/form/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const now = new Date().toLocaleTimeString('it-IT');
      setLastSaved(now);
    } catch {
      // Silent fail for auto-save
    } finally {
      setIsSaving(false);
    }
  }, [orderId, formData]);

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await fetch(`/api/form/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, isComplete: true }),
      });
      alert('Modulo inviato con successo! Ti contatteremo presto.');
    } catch {
      alert('Errore durante l\'invio. Riprova.');
    } finally {
      setIsSaving(false);
    }
  };

  const next = () => setCurrentStep(s => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setCurrentStep(s => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dettagli del Matrimonio</h1>
          <p className="text-muted-foreground">
            Ordine: <span className="font-mono font-semibold">{orderId}</span>
          </p>
          {lastSaved && (
            <p className="text-xs text-success mt-1">Ultimo salvataggio: {lastSaved}</p>
          )}
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {STEPS.map((step, i) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(i)}
              className={`flex flex-col items-center gap-1 min-w-[80px] ${
                i === currentStep ? 'text-primary' : i < currentStep ? 'text-success' : 'text-muted-foreground'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                i === currentStep ? 'bg-primary text-white' : i < currentStep ? 'bg-success text-white' : 'bg-muted'
              }`}>
                {i < currentStep ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className="text-xs font-medium">{step.label}</span>
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl border border-border p-8">
          {/* Step 0: Couple */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Informazioni sulla Coppia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nome della Sposa</label>
                  <input
                    type="text" placeholder="Es: Giulia"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={formData.brideName} onChange={e => updateField('brideName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nome dello Sposo</label>
                  <input
                    type="text" placeholder="Es: Marco"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={formData.groomName} onChange={e => updateField('groomName', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">La Vostra Storia</label>
                <textarea
                  rows={5} placeholder="Raccontateci come vi siete conosciuti, la proposta, i momenti speciali..."
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  value={formData.coupleStory} onChange={e => updateField('coupleStory', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 1: Event */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Dettagli Evento
              </h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Data delle Nozze</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.weddingDate} onChange={e => updateField('weddingDate', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Orario Cerimonia</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={formData.ceremonyTime} onChange={e => updateField('ceremonyTime', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Orario Ricevimento</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={formData.receptionTime} onChange={e => updateField('receptionTime', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Dress Code</label>
                <input
                  type="text" placeholder="Es: Elegante, colori pastello"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.dressCode} onChange={e => updateField('dressCode', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Location
              </h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nome della Location</label>
                <input
                  type="text" placeholder="Es: Villa Borghese, Chiesa di San Marco..."
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.location} onChange={e => updateField('location', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Indirizzo Completo</label>
                <input
                  type="text" placeholder="Via, numero, città, CAP"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.locationAddress} onChange={e => updateField('locationAddress', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Texts */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Testi Personalizzati
              </h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Testo di Benvenuto</label>
                <textarea
                  rows={4} placeholder="Il messaggio che gli ospiti vedranno aprendo il sito..."
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  value={formData.welcomeText} onChange={e => updateField('welcomeText', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">FAQ per gli Ospiti</label>
                <textarea
                  rows={4} placeholder="Domande e risposte frequenti per gli invitati (parcheggio, alloggio, bambini, ecc.)"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  value={formData.faqItems} onChange={e => updateField('faqItems', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 4: Style */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Stile e Colori
              </h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Font Preferito</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FONTS.map(font => (
                    <button
                      key={font}
                      onClick={() => updateField('fontChoice', font)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        formData.fontChoice === font
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <span className="text-sm font-medium">{font}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Colore Primario</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                      value={formData.primaryColor} onChange={e => updateField('primaryColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-lg border border-border text-sm font-mono"
                      value={formData.primaryColor} onChange={e => updateField('primaryColor', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Colore Secondario</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                      value={formData.secondaryColor} onChange={e => updateField('secondaryColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-lg border border-border text-sm font-mono"
                      value={formData.secondaryColor} onChange={e => updateField('secondaryColor', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Colore Accento</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                      value={formData.accentColor} onChange={e => updateField('accentColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 rounded-lg border border-border text-sm font-mono"
                      value={formData.accentColor} onChange={e => updateField('accentColor', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Media */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Music className="w-5 h-5 text-primary" />
                Media e Musica
              </h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Link Playlist (Spotify, YouTube, ecc.)
                </label>
                <input
                  type="url" placeholder="https://open.spotify.com/playlist/..."
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.playlistUrl} onChange={e => updateField('playlistUrl', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Carica Foto</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Trascina le foto qui o clicca per caricarle</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG fino a 10MB ciascuna</p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Carica Video</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Trascina i video qui o clicca per caricarli</p>
                  <p className="text-xs text-muted-foreground">MP4 fino a 100MB ciascuno</p>
                  <input type="file" multiple accept="video/*" className="hidden" />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Guests */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Lista Invitati e RSVP
              </h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Carica Lista Invitati (CSV)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Carica un file CSV con i dati degli invitati</p>
                  <p className="text-xs text-muted-foreground">Formato: Nome, Cognome, Email, Telefono</p>
                  <input type="file" accept=".csv" className="hidden" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Note Libere</label>
                <textarea
                  rows={5} placeholder="Qualsiasi altra informazione che volete comunicarci..."
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  value={formData.freeNotes} onChange={e => updateField('freeNotes', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 7: Review */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Riepilogo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">La Coppia</h3>
                  <p className="text-sm text-muted-foreground">{formData.brideName || '-'} & {formData.groomName || '-'}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Data</h3>
                  <p className="text-sm text-muted-foreground">{formData.weddingDate || '-'}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground">{formData.location || '-'}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Font</h3>
                  <p className="text-sm text-muted-foreground">{formData.fontChoice}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Colori</h3>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: formData.primaryColor }} />
                    <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: formData.secondaryColor }} />
                    <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: formData.accentColor }} />
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Orari</h3>
                  <p className="text-sm text-muted-foreground">
                    Cerimonia: {formData.ceremonyTime || '-'} | Ricevimento: {formData.receptionTime || '-'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={prev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Indietro
            </button>

            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Salvando...' : 'Salva'}
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-primary hover:bg-primary-dark text-white transition-colors"
              >
                Avanti
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-success hover:bg-success/90 text-white transition-colors"
              >
                <Check className="w-4 h-4" />
                Invia Modulo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
