import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { store } from '@/lib/store';

export async function POST(request: NextRequest) {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { eventId, action } = await request.json().catch(() => ({ eventId: null, action: null }));
  
  if (!eventId || !action) return NextResponse.json({ error: 'Event ID and action required' }, { status: 400 });

  let event;
  if (action === 'pause') {
    event = store.pauseEvent(eventId);
  } else if (action === 'resume') {
    event = store.resumeEvent(eventId);
  } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  if (!event) return NextResponse.json({ error: 'Event not found or cannot perform action' }, { status: 400 });

  return NextResponse.json({ event });
}
