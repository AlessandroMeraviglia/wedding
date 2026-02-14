'use client';

import Link from 'next/link';
import { Heart, Palette, CreditCard, Rocket, Star, Check, ArrowRight, Sparkles, Shield, Clock, Users, Zap } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DEMOS } from '@/data/templateDemos';
import { formatPrice, MOOD_LABELS } from '@/lib/utils';

const STEPS = [
  { icon: Palette, title: 'Scegli il Template', desc: 'Sfoglia 8+ design premium. Anteprima LIVE navigabile prima dell\'acquisto.' },
  { icon: Sparkles, title: 'Personalizza', desc: 'Aggiungi RSVP, galleria foto, musica, inviti digitali e 30+ add-on.' },
  { icon: CreditCard, title: 'Paga Sicuro', desc: 'Checkout con carta, Apple Pay, Google Pay, PayPal. Pagamento rateale disponibile.' },
  { icon: Rocket, title: 'Online in 48h', desc: 'Compila i dettagli, il tuo sito viene pubblicato. Supporto dedicato incluso.' },
];

const TESTIMONIALS = [
  { name: 'Marco & Giulia', text: 'Il sito del nostro matrimonio era perfetto! Gli ospiti erano entusiasti e il sistema RSVP ci ha semplificato la vita.', rating: 5 },
  { name: 'Alessandro & Sofia', text: 'Qualità eccezionale. Il template Golden Palace ha reso il nostro sito davvero unico e lussuoso.', rating: 5 },
  { name: 'Lorenzo & Chiara', text: 'Servizio veloce e professionale. Abbiamo scelto il Done For You e non potevamo essere più felici.', rating: 5 },
];

const TRUST_STATS = [
  { value: '500+', label: 'Coppie Online', icon: Users },
  { value: '48h', label: 'Consegna Media', icon: Clock },
  { value: '4.9/5', label: 'Rating Clienti', icon: Star },
  { value: '100%', label: 'Pagamenti Sicuri', icon: Shield },
];

export default function HomePage() {
  const featuredTemplates = TEMPLATES.slice(0, 3);

  return (
    <div>
      {/* HERO — Strong value proposition */}
      <section className="relative overflow-hidden">
        {/* Background with depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2f0] via-white to-[#f4e8d1]" />
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

            {/* Main headline — concrete value */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Il Vostro Sito Matrimonio{' '}
              <span className="text-primary relative">
                Pronto in 48h
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M1 5.5Q50 1 100 5T199 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/30"/></svg>
              </span>
            </h1>

            {/* Subheadline — what you get */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              RSVP integrato, inviti digitali, galleria foto e dominio personalizzato.
              <span className="font-semibold text-foreground"> Scegli, personalizza, pubblica.</span>
            </p>

            {/* CTAs — high contrast */}
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

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Come Funziona</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In 4 semplici passi avrai il sito perfetto per il vostro matrimonio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="text-center group relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-primary/5" />
                )}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 relative">
                  <step.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Template in Evidenza</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scelti dalle coppie per eleganza e funzionalità
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
                    {/* Trust badge */}
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
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{tpl.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tpl.description}</p>
                    {/* Micro features */}
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
            <p className="text-lg text-muted-foreground">Feedback reali dai nostri clienti</p>
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
            Scegliete il template, personalizzatelo con 30+ add-on e il vostro sito sarà online in 48h.
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
