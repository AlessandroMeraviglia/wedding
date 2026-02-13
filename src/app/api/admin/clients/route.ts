import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    requireRole(req, ['ADMIN', 'CUSTOMER_CARE']);

    // In production:
    // const clients = await prisma.user.findMany({
    //   where: { role: 'CLIENT' },
    //   include: {
    //     orders: { include: { template: true } },
    //     _count: { select: { orders: true } },
    //   },
    //   orderBy: { createdAt: 'desc' },
    // });

    return NextResponse.json({ clients: [], message: 'Connect database for real data' });
  } catch {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }
}
