'use client';

import Link from 'next/link';
import { Heart, Palette, CreditCard, Rocket, Star, Check, ArrowRight, Sparkles } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { formatPrice } from '@/lib/utils';

const STEPS = [
  { icon: Palette, title: 'Scegli il Template', desc: 'Esplora la nostra collezione di template matrimoniali e trova quello perfetto per voi.' },
  { icon: Sparkles, title: 'Aggiungi gli Extra', desc: 'Personalizza con add-on: RSVP, galleria foto, musica, inviti digitali e molto altro.' },
  { icon: CreditCard, title: 'Paga in Sicurezza', desc: 'Checkout veloce con carta, Apple Pay, Google Pay, PayPal o pagamento rateale.' },
  { icon: Rocket, title: 'Ricevi il Sito', desc: 'Compila i dettagli e il tuo sito sarà online. Supporto dedicato incluso.' },
];

const TESTIMONIALS = [
  { name: 'Marco & Giulia', text: 'Il sito del nostro matrimonio era perfetto! Gli ospiti erano entusiasti e il sistema RSVP ci ha semplificato la vita.', rating: 5 },
  { name: 'Alessandro & Sofia', text: 'Qualità eccezionale. Il template Golden Palace ha reso il nostro sito davvero unico e lussuoso.', rating: 5 },
  { name: 'Lorenzo & Chiara', text: 'Servizio veloce e professionale. Abbiamo scelto il Done For You e non potevamo essere più felici.', rating: 5 },
];

export default function HomePage() {
  const featuredTemplates = TEMPLATES.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-white to-secondary">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Heart className="w-4 h-4 fill-primary" />
              Il vostro giorno speciale merita un sito speciale
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Il Sito Web Perfetto per il{' '}
              <span className="text-primary">Vostro Matrimonio</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Template eleganti pronti all&apos;uso, personalizzabili con add-on premium.
              RSVP, galleria foto, countdown e molto altro in pochi click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Esplora i Template
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-muted text-foreground px-8 py-4 rounded-full text-lg font-semibold border border-border transition-colors"
              >
                Come Funziona
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>100+ coppie soddisfatte</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>Pronto in 48h</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>Supporto dedicato</span>
              </div>
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
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary mb-2">STEP {i + 1}</div>
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
            {featuredTemplates.map((tpl) => (
              <Link key={tpl.id} href={`/templates/${tpl.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <Heart className="w-16 h-16 text-primary/20" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{tpl.mood}</span>
                      <span className="text-lg font-bold text-primary">{formatPrice(tpl.price)}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{tpl.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tpl.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {tpl.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                      {tpl.features.length > 3 && (
                        <span className="text-xs text-primary font-medium">+{tpl.features.length - 3} altre</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
            >
              Vedi Tutti i Template
              <ArrowRight className="w-4 h-4" />
            </Link>
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
              <div key={i} className="bg-muted/50 rounded-2xl p-8 border border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-semibold text-primary">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Pronti a Creare il Vostro Sito Matrimoniale?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Scegliete il template, personalizzatelo con gli add-on e avrete il sito perfetto per il vostro grande giorno.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-lg"
          >
            Inizia Ora
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
