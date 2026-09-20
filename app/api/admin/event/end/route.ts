import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { store } from '@/lib/store';

export async function POST(request: NextRequest) {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { eventId } = await request.json().catch(() => ({ eventId: null }));
  
  if (!eventId) return NextResponse.json({ error: 'Event ID required' }, { status: 400 });

  const event = store.endEvent(eventId);
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 400 });

  return NextResponse.json({ event });
}
