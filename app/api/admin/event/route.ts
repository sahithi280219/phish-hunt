import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { store } from '@/lib/store';

export async function GET() {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const activeEvent = store.getActiveEvent();
  return NextResponse.json({ event: activeEvent || null });
}

export async function POST(request: NextRequest) {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { timerDurationMs } = await request.json().catch(() => ({ timerDurationMs: 3600000 }));
  
  // End current active event if any
  const activeEvent = store.getActiveEvent();
  if (activeEvent) {
      store.endEvent(activeEvent.id);
  }

  const event = store.createEvent(timerDurationMs, 'PHISH2026');
  return NextResponse.json({ event });
}
