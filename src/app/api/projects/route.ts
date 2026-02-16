import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getAllProjects());
}
