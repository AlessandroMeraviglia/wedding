'use client';

import { Check } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Step {
  label: string;
  href?: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  total?: number;
}

export default function ProgressIndicator({ steps, currentStep, total }: ProgressIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={step.label} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isCompleted
                    ? 'bg-success text-white'
                    : isCurrent
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[11px] mt-1.5 font-medium whitespace-nowrap ${
                  isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mt-[-18px] ${
                  isCompleted ? 'bg-success' : 'bg-muted'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      {total !== undefined && total > 0 && (
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold">
            Totale corrente: {formatPrice(total)}
          </span>
        </div>
      )}
    </div>
  );
}
