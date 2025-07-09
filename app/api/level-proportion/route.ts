import { NextResponse } from 'next/server';
import { getLevelCounts } from '@/app/lib/data';

export async function GET() {
  const data = await getLevelCounts();
  return NextResponse.json(data);
}