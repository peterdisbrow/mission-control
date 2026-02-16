import { NextResponse } from 'next/server';
import { updateAgentStatus, getAgent } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { status, currentTask } = body;
  if (!['idle', 'working', 'busy'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const agent = updateAgentStatus(params.id, status);
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Allow setting currentTask in same call
  if (currentTask !== undefined) {
    agent.currentTask = currentTask;
  }

  // When going idle, clear task if not explicitly provided
  if (status === 'idle' && currentTask === undefined) {
    agent.currentTask = '';
  }

  return NextResponse.json(agent);
}
