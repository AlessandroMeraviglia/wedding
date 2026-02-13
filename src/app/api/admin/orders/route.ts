import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    requireRole(req, ['ADMIN', 'DESIGNER', 'CUSTOMER_CARE']);

    // In production, fetch from database:
    // const orders = await prisma.order.findMany({
    //   include: { user: true, template: true, addons: { include: { addon: true } } },
    //   orderBy: { createdAt: 'desc' },
    // });

    return NextResponse.json({ orders: [], message: 'Connect database for real data' });
  } catch {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    requireRole(req, ['ADMIN', 'DESIGNER']);

    const { orderId, status, assignedDesignerId, deadline, notes } = await req.json();

    // In production:
    // await prisma.order.update({
    //   where: { id: orderId },
    //   data: { status, assignedDesignerId, deadlineAt: deadline, notes },
    // });
    // await prisma.orderTimeline.create({
    //   data: { orderId, status, note: notes },
    // });

    return NextResponse.json({ success: true, orderId });
  } catch {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }
}
