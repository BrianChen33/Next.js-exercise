import { NextResponse } from 'next/server';
import { getCompaniesFromCSV } from '@/app/lib/data';

export async function GET() {
  const data = await getCompaniesFromCSV();
  return NextResponse.json(data);
}