import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  let eventId = null;
  const url = new URL(request.url);
  eventId = url.searchParams.get('eventId');

  if (!eventId) {
      const cookieStore = await cookies();
      const sessionToken = cookieStore.get('team_session')?.value;
      if (sessionToken) {
          const team = store.getTeamBySession(sessionToken);
          if (team) eventId = team.eventId;
      }
  }

  if (!eventId) {
      const activeEvent = store.getActiveEvent();
      if(activeEvent) eventId = activeEvent.id;
  }

  if (!eventId) {
    return NextResponse.json({ error: 'No active event' }, { status: 404 });
  }

  const leaderboard = store.getLeaderboard(eventId);
  return NextResponse.json({ leaderboard });
}
