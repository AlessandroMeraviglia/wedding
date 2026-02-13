import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req);

    // In production, fetch from database:
    // const orders = await prisma.order.findMany({
    //   where: { userId: user.userId },
    //   include: { template: true, addons: { include: { addon: true } } },
    //   orderBy: { createdAt: 'desc' },
    // });

    // Demo data
    const orders = [
      {
        id: 'ord-001',
        orderNumber: 'WED-2601-ABC123',
        status: 'IN_PROGRESS',
        paymentStatus: 'SUCCEEDED',
        total: 347,
        currency: 'EUR',
        createdAt: new Date().toISOString(),
        template: { name: 'Amore Eterno', slug: 'amore-eterno' },
        addons: [
          { addon: { name: 'RSVP Avanzato' } },
          { addon: { name: 'Galleria Foto/Video' } },
        ],
      },
    ];

    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }
}
