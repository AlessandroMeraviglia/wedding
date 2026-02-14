// ============ TEMPLATE TYPES ============

export type TemplateMood = 'ROMANTIC' | 'MINIMAL' | 'LUXURY' | 'BOHO' | 'MODERN' | 'CLASSIC' | 'RUSTIC' | 'ELEGANT';
export type EventType = 'CLASSIC_WEDDING' | 'CIVIL_CEREMONY' | 'ELOPEMENT' | 'DESTINATION' | 'RELIGIOUS' | 'GARDEN' | 'BEACH';
export type BudgetTier = 'STARTER' | 'STANDARD' | 'PREMIUM' | 'LUXURY';

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  mood: TemplateMood;
  eventType: EventType;
  budgetTier: BudgetTier;
  previewUrl?: string;
  demoUrl?: string;
  thumbnailUrl?: string;
  galleryImages: string[];
  mobilePreviewUrl?: string;
  features: string[];
  isActive: boolean;
  designer?: {
    name: string;
    portfolio?: string;
  };
}

// ============ ADD-ON TYPES ============

export type AddonCategory = 'TECHNICAL' | 'CONTENT' | 'GRAPHICS' | 'MARKETING' | 'PREMIUM';

export interface Addon {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: AddonCategory;
  icon?: string;
  isPopular: boolean;
  isRecommended: boolean;
}

// ============ ORDER TYPES ============

export type OrderStatus = 'PENDING_PAYMENT' | 'PAID' | 'IN_PROGRESS' | 'REVIEW' | 'REVISION' | 'COMPLETED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  templateId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
  notes?: string;
  deadlineAt?: string;
  assignedDesignerId?: string;
  createdAt: string;
  template?: Template;
  addons?: OrderAddon[];
  formSubmission?: FormSubmission;
}

export interface OrderAddon {
  id: string;
  addonId: string;
  price: number;
  addon?: Addon;
}

// ============ CART TYPES ============

export interface CartItem {
  template: Template;
  addons: Addon[];
}

export interface CartState {
  template: Template | null;
  selectedAddons: Addon[];
  total: number;
}

// ============ FORM TYPES ============

export interface FormSubmission {
  id: string;
  orderId: string;
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  location?: string;
  locationAddress?: string;
  ceremonyTime?: string;
  receptionTime?: string;
  customTexts?: Record<string, string>;
  photoUrls: string[];
  videoUrls: string[];
  fontChoice?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  playlist?: { name: string; url: string }[];
  guestListCsv?: string;
  rsvpQuestions?: { question: string; type: string; required: boolean }[];
  graphicPrefs?: Record<string, string>;
  freeNotes?: string;
  isComplete: boolean;
  lastSavedAt: string;
}

// ============ USER TYPES ============

export type UserRole = 'ADMIN' | 'DESIGNER' | 'CUSTOMER_CARE' | 'CLIENT';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
}

// ============ ANALYTICS ============

export interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  topTemplates: { name: string; count: number; revenue: number }[];
  topAddons: { name: string; count: number; revenue: number }[];
  ordersByStatus: Record<string, number>;
  revenueByMonth: { month: string; revenue: number }[];
}

// ============ FILTERS ============

export interface TemplateFilters {
  mood?: TemplateMood;
  eventType?: EventType;
  budgetTier?: BudgetTier;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}
