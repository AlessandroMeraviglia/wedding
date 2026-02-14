'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Heart, Search, SlidersHorizontal, Eye, ShoppingCart, Play } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DEMOS } from '@/data/templateDemos';
import { TemplateMood, EventType, BudgetTier, TemplateFilters } from '@/types';
import { formatPrice, MOOD_LABELS, EVENT_TYPE_LABELS, BUDGET_LABELS } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import LivePreviewModal from '@/components/LivePreviewModal';

export default function TemplatesPage() {
  const [filters, setFilters] = useState<TemplateFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [livePreviewSlug, setLivePreviewSlug] = useState<string | null>(null);
  const { setTemplate } = useCart();

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
      <section className="bg-gradient-to-br from-secondary via-white to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            I Nostri <span className="text-primary">Template</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Esplora la collezione di siti matrimoniali pronti all&apos;uso. Ogni template è personalizzabile con i nostri add-on.
          </p>
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
          {filtered.map((tpl) => (
            <div key={tpl.id} className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1">
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
                {/* LIVE Badge */}
                {TEMPLATE_DEMOS[tpl.slug] && (
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
                  <button
                    onClick={() => handleSelect(tpl)}
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary-dark transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Scegli
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {MOOD_LABELS[tpl.mood]}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {BUDGET_LABELS[tpl.budgetTier]}
                    </span>
                  </div>
                </div>
                <Link href={`/templates/${tpl.slug}`}>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {tpl.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tpl.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {tpl.features.slice(0, 4).map((f) => (
                    <span key={f} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                      {f}
                    </span>
                  ))}
                  {tpl.features.length > 4 && (
                    <span className="text-xs text-primary font-medium">+{tpl.features.length - 4}</span>
                  )}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-primary">{formatPrice(tpl.price)}</span>
                  </div>
                  <Link
                    href={`/templates/${tpl.slug}`}
                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    Dettagli →
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
