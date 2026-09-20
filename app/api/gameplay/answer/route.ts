import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { cookies } from 'next/headers';
import { evaluateAnswer, getQuestion } from '@/lib/questions';

export async function POST(request: NextRequest) {
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
  
  if (team.finished) {
      return NextResponse.json({ error: 'Team has already finished' }, { status: 400 });
  }

  try {
    const { questionId, answer } = await request.json();

    if (!questionId || answer === undefined) {
      return NextResponse.json({ error: 'Question ID and answer are required' }, { status: 400 });
    }

    if (team.currentQuestion !== questionId) {
        return NextResponse.json({ error: 'Invalid question ID for current state' }, { status: 400 });
    }

    const questionDef = getQuestion(questionId);
    if (!questionDef) {
        return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    const { correct, score } = evaluateAnswer(questionId, answer);

    const answerRecord = store.submitAnswer(team.id, questionId, answer, correct, score);

    if (!answerRecord) {
         return NextResponse.json({ error: 'Could not submit answer (perhaps already answered)' }, { status: 400 });
    }

    return NextResponse.json({
        correct,
        scoreGiven: score,
        newTotalScore: team.score,
        correctAnswer: questionDef.correctAnswer,
        explanation: questionDef.explanation,
        realWorldExample: questionDef.realWorldExample,
        preventionTip: questionDef.preventionTip,
        finished: team.finished
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
