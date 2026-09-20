import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('team_session')?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const team = store.getTeamBySession(sessionToken);
  if (!team) {
    return NextResponse.json({ error: 'Team not found or session invalid' }, { status: 401 });
  }
  
  // Update last seen
  team.lastSeen = Date.now();

  const event = store.getEvent(team.eventId);

  return NextResponse.json({
    team: {
      id: team.id,
      name: team.name,
      eventId: team.eventId,
      currentMission: team.currentMission,
      currentQuestion: team.currentQuestion,
      score: team.score,
      finished: team.finished
    },
    eventStatus: event?.status || 'UNKNOWN'
  });
}
