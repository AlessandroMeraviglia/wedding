import { NextRequest, NextResponse } from 'next/server';
import { TEMPLATES } from '@/data/templates';
import { ADDONS } from '@/data/addons';
import { generateOrderNumber } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { templateId, addonIds, customer } = await req.json();

    // Validate template
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      return NextResponse.json({ error: 'Template non valido' }, { status: 400 });
    }

    // Validate add-ons
    const selectedAddons = ADDONS.filter(a => addonIds?.includes(a.id));
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const total = template.price + addonsTotal;

    // Generate order number
    const orderNumber = generateOrderNumber();

    // In production, create Stripe Checkout Session here:
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [...],
    //   mode: 'payment',
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderId=${orderNumber}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    //   customer_email: customer.email,
    //   metadata: { orderNumber, templateId, addonIds: JSON.stringify(addonIds) },
    // });

    // For demo, return direct success
    return NextResponse.json({
      orderId: orderNumber,
      total,
      template: template.name,
      addons: selectedAddons.map(a => a.name),
      // url: session.url, // Uncomment for Stripe redirect
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Errore durante il checkout' }, { status: 500 });
  }
}
