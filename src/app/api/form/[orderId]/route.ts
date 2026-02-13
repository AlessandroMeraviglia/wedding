import { NextRequest, NextResponse } from 'next/server';

// In-memory store for demo (use Prisma in production)
const formStore = new Map<string, Record<string, unknown>>();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  const form = formStore.get(orderId);
  if (!form) {
    return NextResponse.json({ orderId, data: null });
  }

  return NextResponse.json({ orderId, data: form });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const body = await req.json();

  // In production, save to database:
  // await prisma.formSubmission.upsert({
  //   where: { orderId },
  //   update: { ...body, lastSavedAt: new Date() },
  //   create: { orderId, ...body },
  // });

  formStore.set(orderId, { ...body, lastSavedAt: new Date().toISOString() });

  return NextResponse.json({ success: true, orderId });
}
