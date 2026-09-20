import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { store } from '@/lib/store';

export async function GET(request: NextRequest) {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const eventId = url.searchParams.get('eventId');

  if (!eventId) return NextResponse.json({ error: 'Event ID required' }, { status: 400 });

  const teams = store.getTeamsByEvent(eventId);
  return NextResponse.json({ teams });
}
