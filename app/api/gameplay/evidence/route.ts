import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { cookies } from 'next/headers';
import { getQuestion } from '@/lib/questions';

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
  if (!event || event.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Event is not active' }, { status: 403 });
  }

  const url = new URL(request.url);
  const questionIdParam = url.searchParams.get('questionId');
  const questionId = questionIdParam ? parseInt(questionIdParam, 10) : team.currentQuestion;

  if (isNaN(questionId) || questionId > team.currentQuestion) {
      return NextResponse.json({ error: 'Invalid or inaccessible evidence' }, { status: 403 });
  }

  const question = getQuestion(questionId);
  if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  return NextResponse.json({
      evidence: question.evidence
  });
}
