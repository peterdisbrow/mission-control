import { NextResponse } from 'next/server';
import { updateAgentStatus } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { status } = body;
  if (!['idle', 'working', 'busy'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const agent = updateAgentStatus(params.id, status);
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(agent);
}
