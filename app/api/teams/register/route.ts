import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const { eventCode, teamName, members } = await request.json();

    if (!eventCode || !teamName || !members || !Array.isArray(members) || members.length < 1 || members.length > 4) {
      return NextResponse.json({ error: 'Event code, team name, and 1–4 members are required' }, { status: 400 });
    }

    const event = store.getEventByCode(eventCode);
    if (!event) {
      return NextResponse.json({ error: 'Invalid event code' }, { status: 404 });
    }

    if (event.status === 'COMPLETED') {
        return NextResponse.json({ error: 'Event is already completed' }, { status: 400 });
    }

    const team = store.registerTeam(event.id, teamName, members);
    
    if (!team) {
      return NextResponse.json({ error: 'Team name already exists in this event or registration failed' }, { status: 400 });
    }

    const response = NextResponse.json({ success: true, teamId: team.id });
    
    response.cookies.set('team_session', team.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
