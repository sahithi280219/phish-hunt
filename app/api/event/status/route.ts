import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('team_session')?.value;

  let eventId = null;

  if (sessionToken) {
      const team = store.getTeamBySession(sessionToken);
      if (team) eventId = team.eventId;
  }
  
  if (!eventId) {
      // Try to get from active event if not authenticated
      const activeEvent = store.getActiveEvent();
      if(activeEvent) eventId = activeEvent.id;
  }

  if (!eventId) {
    return NextResponse.json({ error: 'No active event' }, { status: 404 });
  }

  const event = store.getEvent(eventId);
  
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });

  let timeRemainingMs = event.timerDurationMs;
  if (event.status === 'ACTIVE' && event.startedAt) {
      const elapsedMs = Date.now() - event.startedAt - event.totalPausedMs;
      timeRemainingMs = Math.max(0, event.timerDurationMs - elapsedMs);
  } else if (event.status === 'COMPLETED') {
      timeRemainingMs = 0;
  }

  return NextResponse.json({
      status: event.status,
      startedAt: event.startedAt,
      timeRemainingMs,
      currentMission: event.currentMission,
      isPaused: event.status === 'PAUSED'
  });
}
