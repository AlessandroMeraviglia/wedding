export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
  }).format(price);
}

export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `WED-${year}${month}-${random}`;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const MOOD_LABELS: Record<string, string> = {
  ROMANTIC: 'Romantico',
  MINIMAL: 'Minimal',
  LUXURY: 'Luxury',
  BOHO: 'Boho',
  MODERN: 'Moderno',
  CLASSIC: 'Classico',
  RUSTIC: 'Rustico',
  ELEGANT: 'Elegante',
};

export const EVENT_TYPE_LABELS: Record<string, string> = {
  CLASSIC_WEDDING: 'Matrimonio Classico',
  CIVIL_CEREMONY: 'Cerimonia Civile',
  ELOPEMENT: 'Elopement',
  DESTINATION: 'Destination Wedding',
  RELIGIOUS: 'Cerimonia Religiosa',
  GARDEN: 'Matrimonio in Giardino',
  BEACH: 'Matrimonio in Spiaggia',
};

export const BUDGET_LABELS: Record<string, string> = {
  STARTER: 'Starter',
  STANDARD: 'Standard',
  PREMIUM: 'Premium',
  LUXURY: 'Luxury',
};

export const ADDON_CATEGORY_LABELS: Record<string, string> = {
  TECHNICAL: 'Tecnici',
  CONTENT: 'Contenuto',
  GRAPHICS: 'Grafica / Stampa',
  MARKETING: 'Marketing Wedding',
  PREMIUM: 'Premium',
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: 'In attesa di pagamento',
  PAID: 'Pagato',
  IN_PROGRESS: 'In lavorazione',
  REVIEW: 'In revisione',
  REVISION: 'Revisione richiesta',
  COMPLETED: 'Completato',
  DELIVERED: 'Consegnato',
  CANCELLED: 'Cancellato',
  REFUNDED: 'Rimborsato',
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING_PAYMENT: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  REVIEW: 'bg-purple-100 text-purple-800',
  REVISION: 'bg-orange-100 text-orange-800',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
  DELIVERED: 'bg-teal-100 text-teal-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
};
