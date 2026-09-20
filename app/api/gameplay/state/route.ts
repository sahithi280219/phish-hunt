import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { cookies } from 'next/headers';
import { getQuestion, getMission } from '@/lib/questions';

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

  const event = store.getEvent(team.eventId);
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });

  if (event.status !== 'ACTIVE' && event.status !== 'PAUSED') {
      return NextResponse.json({ 
          error: 'Event is not active', 
          status: event.status 
      }, { status: 403 });
  }

  const currentQuestionId = team.currentQuestion;
  const question = getQuestion(currentQuestionId);
  const mission = getMission(team.currentMission);

  if (team.finished || !question) {
       return NextResponse.json({
          finished: true,
          score: team.score,
      });
  }

  // Calculate time remaining
  let timeRemainingMs = event.timerDurationMs;
  if (event.startedAt) {
      const elapsedMs = Date.now() - event.startedAt - event.totalPausedMs;
      timeRemainingMs = Math.max(0, event.timerDurationMs - elapsedMs);
  }

  // Return limited question data to prevent cheating
  return NextResponse.json({
    finished: false,
    mission: {
        id: mission?.id,
        title: mission?.title,
        subtitle: mission?.subtitle,
        briefing: mission?.briefing
    },
    question: {
        id: question.id,
        title: question.title,
        app: question.app,
        scenario: question.scenario,
        questionText: question.question,
    },
    score: team.score,
    timeRemainingMs,
    isPaused: event.status === 'PAUSED'
  });
}
