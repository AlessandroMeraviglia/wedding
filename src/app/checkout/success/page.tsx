'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight, FileText, Heart } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'N/A';

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="bg-white rounded-3xl border border-border p-10 shadow-sm">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3">
            Ordine Confermato!
          </h1>
          <p className="text-muted-foreground mb-2">
            Grazie per aver scelto WeddingSite
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Ordine: <span className="font-mono font-semibold text-foreground">{orderId}</span>
          </p>

          <div className="bg-primary/5 rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Prossimo Passo</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Compila il modulo con i dettagli del vostro matrimonio. Più informazioni ci date, più il sito sarà perfetto per voi!
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href={`/form/${orderId}`}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg"
            >
              <FileText className="w-5 h-5" />
              Compila i Dettagli
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-muted-foreground">
              Potrai completare il modulo anche in un secondo momento.
              Ti abbiamo inviato un link via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Caricamento...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
