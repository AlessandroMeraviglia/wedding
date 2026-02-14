'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Palette, CreditCard, Rocket, Star, Check, ArrowRight, Sparkles, Shield, Clock, Users, Zap, User, Play, Image as ImageIcon, Film } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DEMOS } from '@/data/templateDemos';
import { formatPrice, MOOD_LABELS } from '@/lib/utils';

const STEPS = [
  { icon: Palette, title: 'Scegli il Template', desc: 'Sfoglia 8+ design creati da designer professionisti. Anteprima LIVE navigabile prima dell\'acquisto.' },
  { icon: Sparkles, title: 'Personalizza', desc: 'Dopo l\'acquisto verrai guidato step-by-step per inserire nomi, data, location, foto, testi e colori.' },
  { icon: CreditCard, title: 'Paga Sicuro', desc: 'Checkout con carta, Apple Pay, Google Pay, PayPal. Pagamento unico, nessun abbonamento.' },
  { icon: Rocket, title: 'Online in 48h', desc: 'Il designer integra le tue personalizzazioni e il tuo sito viene pubblicato con supporto dedicato.' },
];

const TESTIMONIALS = [
  { name: 'Marco & Giulia', text: 'Il sito del nostro matrimonio era perfetto! Il designer Valentina ha curato ogni dettaglio. Gli ospiti erano entusiasti e il sistema RSVP ci ha semplificato la vita.', rating: 5 },
  { name: 'Alessandro & Sofia', text: 'Qualità eccezionale. Il template Golden Palace ha reso il nostro sito davvero unico e lussuoso. Grazie Alessia per la tua professionalità!', rating: 5 },
  { name: 'Lorenzo & Chiara', text: 'Servizio veloce e professionale. Abbiamo scelto il Done For You e il designer ha creato qualcosa di magico con le nostre foto e la nostra storia.', rating: 5 },
];

const TRUST_STATS = [
  { value: '500+', label: 'Coppie Online', icon: Users },
  { value: '48h', label: 'Consegna Media', icon: Clock },
  { value: '4.9/5', label: 'Rating Clienti', icon: Star },
  { value: '100%', label: 'Pagamenti Sicuri', icon: Shield },
];

// These represent media slots that the admin can replace from the backend
const HERO_MEDIA = {
  type: 'image' as const,
  src: '/images/hero-wedding.jpg',
  fallbackGradient: 'from-[#fdf2f0] via-white to-[#f4e8d1]',
};

const SHOWCASE_VIDEO = {
  type: 'video' as const,
  src: '', // Admin can set YouTube URL or upload video
  poster: '/images/showcase-poster.jpg',
};

export default function HomePage() {
  const featuredTemplates = TEMPLATES.slice(0, 3);

  return (
    <div>
      {/* HERO — Strong value proposition */}
      <section className="relative overflow-hidden">
        {/* Background — replaceable from admin */}
        <div className={`absolute inset-0 bg-gradient-to-br ${HERO_MEDIA.fallbackGradient}`} />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Social proof badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-primary/20 text-foreground px-5 py-2.5 rounded-full text-sm font-medium mb-8 shadow-sm">
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-[8px] font-bold text-primary">M</div>
                <div className="w-6 h-6 rounded-full bg-accent/20 border-2 border-white flex items-center justify-center text-[8px] font-bold text-accent">A</div>
                <div className="w-6 h-6 rounded-full bg-success/20 border-2 border-white flex items-center justify-center text-[8px] font-bold text-success">L</div>
              </div>
              <span className="text-primary font-bold">500+ coppie</span>
              già online con noi
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Il Vostro Sito Matrimonio{' '}
              <span className="text-primary relative">
                Pronto in 48h
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M1 5.5Q50 1 100 5T199 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/30"/></svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Template esclusivi creati da designer professionisti. RSVP, inviti digitali, galleria foto e dominio personalizzato.
              <span className="font-semibold text-foreground"> Scegli, personalizza, pubblica.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                Scegli il Tuo Template
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-foreground px-8 py-4 rounded-full text-lg font-semibold border-2 border-border transition-colors shadow-sm"
              >
                Vedi Come Funziona
              </Link>
            </div>

            {/* Trust stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="bg-white/70 backdrop-blur rounded-2xl px-4 py-4 border border-white shadow-sm">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Designers section — emphasis on professional designers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full uppercase tracking-wider">I Nostri Designer</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">Creati da Designer Professionisti</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ogni template è il frutto della creatività e della progettazione di designer professionisti
              che scelgono di condividere il proprio talento sul nostro portale.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TEMPLATES.slice(0, 4).map((tpl) => (
              <div key={tpl.id} className="text-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 mx-auto mb-3 flex items-center justify-center border border-primary/10 group-hover:border-primary/30 transition-colors">
                  <User className="w-7 h-7 text-primary/60" />
                </div>
                <p className="text-sm font-semibold text-foreground">{tpl.designer?.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Designer di {tpl.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            ...e altri designer professionisti collaborano con noi per offrirvi i migliori template.
          </p>
        </div>
      </section>

      {/* How It Works — with personalization explanation */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Come Funziona</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In 4 semplici passi avrai il sito perfetto per il vostro matrimonio, personalizzato in ogni dettaglio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="text-center group relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-primary/5" />
                )}
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 relative shadow-sm border border-border">
                  <step.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Personalization detail box */}
          <div className="mt-16 max-w-3xl mx-auto bg-white rounded-2xl border border-border p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">La Personalizzazione, Spiegata</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Dopo l&apos;acquisto, accederai a una <strong className="text-foreground">pagina di personalizzazione guidata step-by-step</strong> dove potrai inserire:
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    'Nomi degli sposi',
                    'Data delle nozze',
                    'Location e indirizzo',
                    'Testi personalizzati',
                    'Foto e video',
                    'Colori e font',
                    'Playlist musicale',
                    'Lista invitati CSV',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tutte le informazioni vengono salvate nel nostro backend e il designer assegnato al tuo ordine
                  le integra nel template scelto. Potrai anche modificarle in un secondo momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Showcase Section — background image/video replaceable from admin */}
      <section className="relative py-24 overflow-hidden" id="showcase">
        {/* This is a placeholder for admin-uploadable image/video background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
        {/* Admin can replace this with an uploaded image or YouTube embed */}
        <div className="absolute inset-0 opacity-20 bg-[url('/images/showcase-bg.jpg')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-medium mb-6">
            <Film className="w-3.5 h-3.5" />
            Video / Immagine sostituibile dall&apos;admin
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Il Matrimonio dei Vostri Sogni, Online
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            I nostri designer trasformano il vostro amore in un&apos;esperienza digitale unica. Ogni template è pensato per emozionare i vostri ospiti.
          </p>
          {/* Video placeholder - admin can upload video or paste YouTube link */}
          <div className="max-w-2xl mx-auto aspect-video bg-black/30 backdrop-blur rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer group">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
          <p className="text-xs text-white/40 mt-4">
            Carica un video o inserisci un link YouTube dal pannello admin per mostrare le tue realizzazioni
          </p>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Template in Evidenza</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Design esclusivi creati dai nostri designer professionisti, scelti dalle coppie per eleganza e funzionalità
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTemplates.map((tpl, i) => (
              <Link key={tpl.id} href={`/templates/${tpl.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden relative">
                    {TEMPLATE_DEMOS[tpl.slug] ? (
                      <iframe
                        srcDoc={TEMPLATE_DEMOS[tpl.slug]}
                        className="w-full h-full border-0 pointer-events-none"
                        title={tpl.name}
                        sandbox="allow-same-origin"
                      />
                    ) : (
                      <Heart className="w-16 h-16 text-primary/20" />
                    )}
                    {i === 0 && (
                      <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        Più Venduto
                      </span>
                    )}
                    {i === 2 && (
                      <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        Luxury Choice
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{MOOD_LABELS[tpl.mood]}</span>
                      <span className="text-lg font-bold text-primary">{formatPrice(tpl.price)}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{tpl.name}</h3>
                    {tpl.designer && (
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        di {tpl.designer.name}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tpl.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tpl.features.slice(0, 4).map((f) => (
                        <span key={f} className="inline-flex items-center gap-1 text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          <Check className="w-2.5 h-2.5 text-success" />
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors group-hover:shadow-md">
                      Scegli Questo Template
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 bg-white hover:bg-muted text-foreground px-8 py-3 rounded-full font-semibold border-2 border-border transition-all hover:shadow-md"
            >
              Vedi Tutti gli 8 Template
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Image Gallery Section — Admin-replaceable images */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ispirazioni Reali</h2>
            <p className="text-sm text-muted-foreground">Immagini sostituibili dal pannello admin</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/3] bg-gradient-to-br from-muted to-secondary rounded-xl overflow-hidden relative group">
                {/* Placeholder — admin can replace with uploaded images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-primary/20 mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground">Immagine {i}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Carica le tue immagini dal pannello admin per mostrare matrimoni reali realizzati con i nostri template
          </p>
        </div>
      </section>

      {/* Social Proof Band */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span><strong className="text-foreground">48h</strong> consegna media</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span><strong className="text-foreground">500+</strong> coppie soddisfatte</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span><strong className="text-foreground">Stripe</strong> pagamenti sicuri</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span><strong className="text-foreground">4.9/5</strong> valutazione media</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Cosa Dicono le Coppie</h2>
            <p className="text-lg text-muted-foreground">Feedback reali dai nostri clienti soddisfatti</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-muted/50 rounded-2xl p-8 border border-border relative">
                <div className="absolute -top-3 left-8 bg-primary text-white text-lg px-2 rounded-md">&ldquo;</div>
                <div className="flex gap-1 mb-4 mt-2">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">{t.text}</p>
                <p className="text-sm font-semibold text-primary">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Il Vostro Sito Matrimoniale Vi Aspetta
          </h2>
          <p className="text-lg text-white/80 mb-4 max-w-2xl mx-auto">
            Scegliete un template creato da designer professionisti, personalizzatelo con 30+ add-on
            e dopo l&apos;acquisto inserite nomi, foto, testi e tutti i dettagli. Online in 48h.
          </p>
          <p className="text-sm text-white/60 mb-10">
            A partire da {formatPrice(149)} &bull; Nessun abbonamento &bull; Paghi una volta
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-full text-lg font-bold transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Inizia Ora
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
