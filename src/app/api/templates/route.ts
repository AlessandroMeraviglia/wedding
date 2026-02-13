import { NextRequest, NextResponse } from 'next/server';
import { TEMPLATES } from '@/data/templates';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mood = searchParams.get('mood');
  const eventType = searchParams.get('eventType');
  const budgetTier = searchParams.get('budgetTier');
  const search = searchParams.get('search');

  let templates = TEMPLATES.filter(t => t.isActive);

  if (mood) templates = templates.filter(t => t.mood === mood);
  if (eventType) templates = templates.filter(t => t.eventType === eventType);
  if (budgetTier) templates = templates.filter(t => t.budgetTier === budgetTier);
  if (search) {
    const q = search.toLowerCase();
    templates = templates.filter(t =>
      t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json(templates);
}
