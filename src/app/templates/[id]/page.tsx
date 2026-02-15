'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Check, ShoppingCart, ArrowLeft, Monitor, Smartphone, Star, Play, Sparkles, User } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { ADDONS } from '@/data/addons';
import { TEMPLATE_DEMOS } from '@/data/templateDemos';
import { useCart } from '@/hooks/useCart';
import { formatPrice, MOOD_LABELS, EVENT_TYPE_LABELS, ADDON_CATEGORY_LABELS } from '@/lib/utils';
import { AddonCategory } from '@/types';
import LivePreviewModal from '@/components/LivePreviewModal';
import ProgressIndicator from '@/components/ProgressIndicator';

const PURCHASE_STEPS = [
  { label: 'Template' },
  { label: 'Add-on' },
  { label: 'Carrello' },
  { label: 'Pagamento' },
];

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { cart, setTemplate, toggleAddon } = useCart();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeAddonCategory, setActiveAddonCategory] = useState<AddonCategory | 'ALL'>('ALL');
  const [showLivePreview, setShowLivePreview] = useState(false);

  const template = useMemo(
    () => TEMPLATES.find(t => t.slug === params.id),
    [params.id]
  );

  // Auto-select template when landing on this page
  useEffect(() => {
    if (template && cart.template?.id !== template.id) {
      setTemplate(template);
    }
  }, [template, cart.template?.id, setTemplate]);

  const filteredAddons = useMemo(() => {
    if (activeAddonCategory === 'ALL') return ADDONS;
    return ADDONS.filter(a => a.category === activeAddonCategory);
  }, [activeAddonCategory]);

  const relatedTemplates = useMemo(() => {
    if (!template) return [];
    return TEMPLATES.filter(t =>
      t.id !== template.id &&
      t.isActive &&
      (t.mood === template.mood || t.eventType === template.eventType)
    ).slice(0, 3);
  }, [template]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template non trovato</h1>
          <Link href="/templates" className="text-primary hover:text-primary-dark">
            Torna ai template
          </Link>
        </div>
      </div>
    );
  }

  const isSelected = cart.template?.id === template.id;
  const demoHtml = TEMPLATE_DEMOS[template.slug] || '';

  const handleAddToCartAndProceed = () => {
    if (!isSelected) setTemplate(template);
    router.push('/cart');
  };

  const isAddonSelected = (addonId: string) => {
    return cart.selectedAddons.some(a => a.id === addonId);
  };

  const recommendedAddons = ADDONS.filter(a => a.isRecommended);

  const templatePrice = template.price;
  const addonsTotal = cart.selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = templatePrice + addonsTotal;

  const selectedAddonIds = cart.selectedAddons.map(a => a.id);

  return (
    <div className="min-h-screen">
      {/* Live Preview Modal - with addon sidebar */}
      {demoHtml && (
        <LivePreviewModal
          isOpen={showLivePreview}
          onClose={() => setShowLivePreview(false)}
          templateName={template.name}
          htmlContent={demoHtml}
          allAddons={ADDONS}
          selectedAddonIds={selectedAddonIds}
          onToggleAddon={toggleAddon}
          totalPrice={totalPrice}
          templatePrice={templatePrice}
          onProceedToCart={() => {
            setShowLivePreview(false);
            router.push('/cart');
          }}
        />
      )}

      {/* Progress + Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <ProgressIndicator steps={PURCHASE_STEPS} currentStep={1} total={totalPrice} />
        <Link href="/templates" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-4">
          <ArrowLeft className="w-4 h-4" />
          Tutti i Template
        </Link>
      </div>

      {/* Template Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preview */}
          <div>
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`p-1.5 rounded ${previewMode === 'desktop' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`p-1.5 rounded ${previewMode === 'mobile' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className={`aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative ${previewMode === 'mobile' ? 'max-w-[280px] mx-auto' : ''}`}>
                {demoHtml ? (
                  <iframe
                    srcDoc={demoHtml}
                    className="w-full h-full border-0 pointer-events-none"
                    title={`Anteprima ${template.name}`}
                    sandbox="allow-same-origin"
                  />
                ) : (
                  <div className="text-center">
                    <Heart className="w-20 h-20 text-primary/20 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Anteprima {template.name}</p>
                  </div>
                )}

                {cart.selectedAddons.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10 max-w-[200px]">
                    {cart.selectedAddons.slice(0, 3).map(addon => (
                      <span key={addon.id} className="bg-primary/90 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {addon.name}
                      </span>
                    ))}
                    {cart.selectedAddons.length > 3 && (
                      <span className="bg-primary/90 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                        +{cart.selectedAddons.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-24 h-18 flex-shrink-0 bg-gradient-to-br from-secondary to-muted rounded-lg border border-border flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary/15" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {MOOD_LABELS[template.mood]}
              </span>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {EVENT_TYPE_LABELS[template.eventType]}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{template.name}</h1>

            {/* Designer attribution */}
            {template.designer && (
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <span>Creato da <strong className="text-foreground">{template.designer.name}</strong></span>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Designer Verificato</span>
              </div>
            )}

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {template.longDescription || template.description}
            </p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-primary">{formatPrice(template.price)}</span>
              <span className="text-sm text-muted-foreground">una tantum</span>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Feature Incluse</h3>
              <div className="grid grid-cols-2 gap-2">
                {template.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (!isSelected) setTemplate(template);
                  setShowLivePreview(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg bg-accent hover:bg-accent/90 text-white transition-all hover:shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                Personalizza LIVE
              </button>
              <button
                onClick={handleAddToCartAndProceed}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
                  isSelected
                    ? 'bg-success text-white'
                    : 'bg-primary hover:bg-primary-dark text-white hover:shadow-lg'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-5 h-5" />
                    Vai al Carrello
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Aggiungi al Carrello
                  </>
                )}
              </button>
            </div>

            {/* Personalization note */}
            <div className="mt-6 bg-primary/5 border border-primary/10 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                Come funziona la personalizzazione?
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dopo l&apos;acquisto, verrai guidato step-by-step in una pagina dedicata dove potrai personalizzare
                <strong> nomi degli sposi, data delle nozze, location, testi, foto, colori </strong>
                e tutte le informazioni del vostro matrimonio. Il nostro designer
                {template.designer ? ` ${template.designer.name}` : ''} si occuperà di integrare ogni dettaglio nel template.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add-ons Section */}
      <section id="addons" className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              STEP 2: Personalizza con gli Add-on
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aggiungi funzionalità extra al tuo sito. Clicca &quot;Personalizza LIVE&quot; per vedere il risultato in tempo reale.
            </p>
          </div>

          {/* Recommended Banner */}
          {recommendedAddons.length > 0 && (
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-8 border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <h3 className="text-lg font-semibold text-foreground">Consigliati per Te</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {recommendedAddons.slice(0, 4).map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      isAddonSelected(addon.id)
                        ? 'bg-primary/10 border-primary'
                        : 'bg-white border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isAddonSelected(addon.id) ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {isAddonSelected(addon.id) ? <Check className="w-4 h-4" /> : <span className="text-xs">+</span>}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{addon.name}</div>
                      <div className="text-xs text-primary font-semibold">{formatPrice(addon.price)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveAddonCategory('ALL')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeAddonCategory === 'ALL' ? 'bg-primary text-white' : 'bg-white text-muted-foreground border border-border hover:border-primary/50'
              }`}
            >
              Tutti
            </button>
            {Object.entries(ADDON_CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveAddonCategory(key as AddonCategory)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeAddonCategory === key ? 'bg-primary text-white' : 'bg-white text-muted-foreground border border-border hover:border-primary/50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Add-on Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAddons.map((addon) => (
              <button
                key={addon.id}
                onClick={() => toggleAddon(addon)}
                className={`flex items-start gap-4 p-5 rounded-xl border transition-all text-left ${
                  isAddonSelected(addon.id)
                    ? 'bg-primary/5 border-primary shadow-sm'
                    : 'bg-white border-border hover:border-primary/30 hover:shadow-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isAddonSelected(addon.id) ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {isAddonSelected(addon.id) ? <Check className="w-5 h-5" /> : <span className="text-lg">+</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{addon.name}</h4>
                    {addon.isPopular && (
                      <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">POPULAR</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{addon.description}</p>
                  <span className="text-sm font-bold text-primary">{formatPrice(addon.price)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Related Templates Section */}
      {relatedTemplates.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Template Correlati</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stesso stile, stessa emozione. Scopri altri design dei nostri professionisti.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTemplates.map((tpl) => (
                <Link key={tpl.id} href={`/templates/${tpl.slug}`} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
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
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{MOOD_LABELS[tpl.mood]}</span>
                        <span className="text-lg font-bold text-primary">{formatPrice(tpl.price)}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{tpl.name}</h3>
                      {tpl.designer && (
                        <p className="text-xs text-muted-foreground mb-2">di {tpl.designer.name}</p>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">{tpl.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating Cart Summary */}
      {(isSelected || cart.selectedAddons.length > 0) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-2xl z-40 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {cart.template?.name || template.name} + {cart.selectedAddons.length} add-on
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</p>
                {addonsTotal > 0 && (
                  <p className="text-xs text-muted-foreground">
                    (Template {formatPrice(templatePrice)} + Add-on {formatPrice(addonsTotal)})
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {demoHtml && (
                <button
                  onClick={() => setShowLivePreview(true)}
                  className="hidden sm:flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-full font-bold text-sm transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  LIVE
                </button>
              )}
              <Link
                href="/cart"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Vai al Carrello
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
