import { NextResponse } from 'next/server';
import { assignTask } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { task } = body;
  if (!task) return NextResponse.json({ error: 'task required' }, { status: 400 });
  const agent = assignTask(params.id, task);
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(agent);
}
