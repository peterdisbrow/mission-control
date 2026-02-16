import { NextResponse } from 'next/server';
import { getAgent } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const agent = getAgent(params.id);
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(agent);
}
