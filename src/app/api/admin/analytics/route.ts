import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    requireRole(req, ['ADMIN']);

    // In production, compute from database:
    // const totalOrders = await prisma.order.count();
    // const totalRevenue = await prisma.order.aggregate({ _sum: { total: true } });
    // etc.

    const analytics = {
      totalOrders: 156,
      totalRevenue: 34580,
      averageOrderValue: 221.67,
      conversionRate: 1.25,
      topTemplates: [
        { name: 'Golden Palace', count: 34, revenue: 13566 },
        { name: 'Amore Eterno', count: 28, revenue: 5572 },
        { name: 'Seaside Dream', count: 22, revenue: 5038 },
      ],
      topAddons: [
        { name: 'RSVP Avanzato', count: 89, revenue: 3471 },
        { name: 'Dominio Personalizzato', count: 82, revenue: 2378 },
        { name: 'Galleria Foto/Video', count: 76, revenue: 2204 },
      ],
      ordersByStatus: {
        PAID: 8,
        IN_PROGRESS: 5,
        REVIEW: 3,
        COMPLETED: 12,
        DELIVERED: 128,
      },
      revenueByMonth: [
        { month: '2025-09', revenue: 4200 },
        { month: '2025-10', revenue: 5800 },
        { month: '2025-11', revenue: 7200 },
        { month: '2025-12', revenue: 6500 },
        { month: '2026-01', revenue: 8900 },
        { month: '2026-02', revenue: 11200 },
      ],
    };

    return NextResponse.json(analytics);
  } catch {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }
}
