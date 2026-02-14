'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Heart, Search, SlidersHorizontal, Eye, ShoppingCart, Play, Check, ArrowRight, Star, TrendingUp, Award } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DEMOS } from '@/data/templateDemos';
import { TemplateMood, EventType, BudgetTier, TemplateFilters } from '@/types';
import { formatPrice, MOOD_LABELS, EVENT_TYPE_LABELS, BUDGET_LABELS } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import LivePreviewModal from '@/components/LivePreviewModal';
import ProgressIndicator from '@/components/ProgressIndicator';

// Trust badges for certain templates
const TRUST_BADGES: Record<string, { label: string; color: string }> = {
  'tpl-001': { label: 'Più Venduto', color: 'bg-accent text-white' },
  'tpl-003': { label: 'Luxury Choice', color: 'bg-primary text-white' },
  'tpl-005': { label: 'Trend 2026', color: 'bg-blue-500 text-white' },
  'tpl-004': { label: '500+ Nozze Reali', color: 'bg-success text-white' },
};

const PURCHASE_STEPS = [
  { label: 'Template' },
  { label: 'Add-on' },
  { label: 'Carrello' },
  { label: 'Pagamento' },
];

export default function TemplatesPage() {
  const [filters, setFilters] = useState<TemplateFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [livePreviewSlug, setLivePreviewSlug] = useState<string | null>(null);
  const { cart, setTemplate } = useCart();

  const filtered = useMemo(() => {
    let result = TEMPLATES.filter(t => t.isActive);

    if (filters.mood) result = result.filter(t => t.mood === filters.mood);
    if (filters.eventType) result = result.filter(t => t.eventType === filters.eventType);
    if (filters.budgetTier) result = result.filter(t => t.budgetTier === filters.budgetTier);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }

    switch (filters.sortBy) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.reverse(); break;
      default: break;
    }

    return result;
  }, [filters]);

  const handleSelect = (template: typeof TEMPLATES[0]) => {
    setTemplate(template);
  };

  const livePreviewTemplate = livePreviewSlug ? TEMPLATES.find(t => t.slug === livePreviewSlug) : null;
  const currentTotal = (cart.template?.price ?? 0) + cart.selectedAddons.reduce((s, a) => s + a.price, 0);

  return (
    <div className="min-h-screen">
      {/* Live Preview Modal */}
      {livePreviewTemplate && TEMPLATE_DEMOS[livePreviewTemplate.slug] && (
        <LivePreviewModal
          isOpen={!!livePreviewSlug}
          onClose={() => setLivePreviewSlug(null)}
          templateName={livePreviewTemplate.name}
          htmlContent={TEMPLATE_DEMOS[livePreviewTemplate.slug]}
        />
      )}

      {/* Header */}
      <section className="bg-gradient-to-br from-secondary via-white to-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress indicator */}
          <ProgressIndicator steps={PURCHASE_STEPS} currentStep={0} total={currentTotal} />
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              STEP 1: Scegli il <span className="text-primary">Template</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              8 design premium con anteprima LIVE. Naviga il template prima di acquistarlo.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cerca template..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              value={filters.search || ''}
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-white hover:bg-muted transition-colors font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtri
          </button>
          <select
            className="px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
            value={filters.sortBy || ''}
            onChange={(e) => setFilters(f => ({ ...f, sortBy: e.target.value as TemplateFilters['sortBy'] }))}
          >
            <option value="">Ordina per</option>
            <option value="price_asc">Prezzo crescente</option>
            <option value="price_desc">Prezzo decrescente</option>
            <option value="newest">Più recenti</option>
          </select>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-border p-6 mb-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Stile</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(MOOD_LABELS).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setFilters(f => ({ ...f, mood: f.mood === key ? undefined : key as TemplateMood }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        filters.mood === key
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground hover:bg-primary/10'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Tipo Evento</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(EVENT_TYPE_LABELS).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setFilters(f => ({ ...f, eventType: f.eventType === key ? undefined : key as EventType }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        filters.eventType === key
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground hover:bg-primary/10'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Budget</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(BUDGET_LABELS).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setFilters(f => ({ ...f, budgetTier: f.budgetTier === key ? undefined : key as BudgetTier }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        filters.budgetTier === key
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground hover:bg-primary/10'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <button
                onClick={() => setFilters({})}
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                Rimuovi tutti i filtri
              </button>
            </div>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} template trovati
        </p>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tpl) => {
            const badge = TRUST_BADGES[tpl.id];
            const isInCart = cart.template?.id === tpl.id;
            return (
              <div key={tpl.id} className={`group bg-white rounded-2xl overflow-hidden border-2 transition-all hover:-translate-y-1 ${
                isInCart ? 'border-primary shadow-lg shadow-primary/10' : 'border-border hover:shadow-xl hover:border-primary/30'
              }`}>
                {/* Preview Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                  {TEMPLATE_DEMOS[tpl.slug] ? (
                    <iframe
                      srcDoc={TEMPLATE_DEMOS[tpl.slug]}
                      className="w-full h-full border-0 pointer-events-none"
                      title={tpl.name}
                      sandbox="allow-same-origin"
                    />
                  ) : (
                    <Heart className="w-20 h-20 text-primary/15" />
                  )}
                  {/* Trust badge */}
                  {badge && (
                    <span className={`absolute top-3 left-3 ${badge.color} text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 z-10`}>
                      <Award className="w-3 h-3" />
                      {badge.label}
                    </span>
                  )}
                  {/* Selected indicator */}
                  {isInCart && (
                    <span className="absolute top-3 right-3 bg-success text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 z-10">
                      <Check className="w-3 h-3" />
                      Nel carrello
                    </span>
                  )}
                  {/* LIVE Badge */}
                  {TEMPLATE_DEMOS[tpl.slug] && !isInCart && (
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLivePreviewSlug(tpl.slug); }}
                      className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg transition-all hover:scale-105 z-10"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      LIVE
                    </button>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <Link
                      href={`/templates/${tpl.slug}`}
                      className="bg-white text-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Anteprima
                    </Link>
                    {TEMPLATE_DEMOS[tpl.slug] && (
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLivePreviewSlug(tpl.slug); }}
                        className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-green-600 transition-colors"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        LIVE
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {MOOD_LABELS[tpl.mood]}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{formatPrice(tpl.price)}</span>
                  </div>
                  <Link href={`/templates/${tpl.slug}`}>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {tpl.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tpl.description}</p>

                  {/* Micro features — clear yes/no list */}
                  <div className="grid grid-cols-2 gap-1 mb-4">
                    {tpl.features.slice(0, 6).map((f) => (
                      <div key={f} className="flex items-center gap-1.5 text-[11px] text-foreground">
                        <Check className="w-3 h-3 text-success flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Strong CTA */}
                  <button
                    onClick={() => handleSelect(tpl)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                      isInCart
                        ? 'bg-success text-white'
                        : 'bg-primary hover:bg-primary-dark text-white hover:shadow-lg hover:shadow-primary/20'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        Selezionato
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Scegli Questo Template
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nessun template trovato</h3>
            <p className="text-muted-foreground mb-4">Prova a modificare i filtri di ricerca</p>
            <button
              onClick={() => setFilters({})}
              className="text-primary font-medium hover:text-primary-dark"
            >
              Rimuovi filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
