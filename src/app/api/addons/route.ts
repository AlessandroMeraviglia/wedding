import { NextRequest, NextResponse } from 'next/server';
import { ADDONS } from '@/data/addons';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  let addons = ADDONS;
  if (category) addons = addons.filter(a => a.category === category);

  return NextResponse.json(addons);
}
