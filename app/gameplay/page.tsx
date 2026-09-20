'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Gameplay() {
  const [gameState, setGameState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const router = useRouter();
  const eventSourceRef = useRef<EventSource | null>(null);

  const fetchState = async () => {
    try {
      const res = await fetch('/api/gameplay/state');
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/');
          return;
        }
        throw new Error('Failed to fetch game state');
      }
      const data = await res.json();
      setGameState(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();

    if (!eventSourceRef.current) {
      const sse = new EventSource('/api/event/stream');
      eventSourceRef.current = sse;

      sse.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'EVENT_PAUSED') {
          fetchState(); // refresh to show paused state
        } else if (data.type === 'EVENT_RESUMED') {
          fetchState(); // refresh to show active state
        } else if (data.type === 'EVENT_ENDED') {
          router.push('/leaderboard');
        } else if (data.type === 'MISSION_ADVANCED') {
           fetchState();
        }
      };

      sse.onerror = () => {
        console.error('SSE connection error');
      };
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || submitting) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/gameplay/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: answer.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit answer');
      }

      setFeedback({
        message: data.isCorrect ? 'Correct! ' + (data.missionComplete ? 'Mission Complete!' : '') : 'Incorrect. Try again.',
        isCorrect: data.isCorrect,
      });

      if (data.isCorrect) {
        setAnswer('');
        setTimeout(() => {
          setFeedback(null);
          fetchState(); // Fetch next question or state
        }, 2000);
      }
    } catch (err: any) {
      setFeedback({ message: err.message, isCorrect: false });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><div className="cyber-text-red">Initializing Uplink...</div></div>;
  if (error) return <div className="container"><div className="alert alert-error">{error}</div></div>;

  if (gameState?.eventStatus === 'paused') {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
        <h1 className="cyber-text-red glitch-effect">SYSTEM PAUSED</h1>
        <p>The administrator has paused the event. Await further instructions.</p>
      </div>
    );
  }

  if (gameState?.eventStatus === 'completed') {
    router.push('/leaderboard');
    return null;
  }

  const { team, currentQuestion, evidence } = gameState;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem', borderBottom: '1px solid var(--red-dark)' }}>
        <div>
          <h2 className="cyber-text-red" style={{ margin: 0 }}>Team: {team.name}</h2>
          <div style={{ fontSize: '0.8rem', color: '#ccc' }}>Members: {team.members.join(', ')}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Score: <span className="cyber-text-red">{team.score}</span></div>
          <div>Mission: {team.currentMission}</div>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Panel: Evidence */}
        <section className="panel">
          <h3 className="cyber-text-red" style={{ borderBottom: '1px solid var(--red-dark)', paddingBottom: '0.5rem' }}>EVIDENCE LOG</h3>
          <div style={{ marginTop: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
            {evidence ? (
              <div>
                <h4>{evidence.title}</h4>
                <div style={{ background: '#000', padding: '1rem', border: '1px solid #333', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                   {evidence.content}
                </div>
              </div>
            ) : (
              <div style={{ color: '#666', fontStyle: 'italic' }}>No evidence available for this stage.</div>
            )}
          </div>
        </section>

        {/* Right Panel: Mission & Investigation */}
        <section className="panel">
          <h3 className="cyber-text-red" style={{ borderBottom: '1px solid var(--red-dark)', paddingBottom: '0.5rem' }}>ACTIVE INVESTIGATION</h3>
          
          {currentQuestion ? (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="badge">Q{currentQuestion.id.replace('q', '')}</span>
                <span className="badge" style={{ background: 'var(--red-dark)' }}>{currentQuestion.difficulty.toUpperCase()}</span>
                <span className="badge" style={{ background: '#333' }}>Pts: {currentQuestion.points}</span>
              </div>
              
              <div style={{ background: 'rgba(255, 0, 51, 0.05)', padding: '1.5rem', borderLeft: '4px solid var(--red-primary)', marginBottom: '2rem' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{currentQuestion.scenario}</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>INPUT ANALYSIS:</label>
                  <input
                    type="text"
                    className="cyber-input"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter short keyword or phrase..."
                    disabled={submitting}
                  />
                </div>
                
                {feedback && (
                  <div className={`alert ${feedback.isCorrect ? 'alert-success' : 'alert-error'}`}>
                    {feedback.message}
                  </div>
                )}

                <button type="submit" className="cyber-button" disabled={submitting || !answer.trim()}>
                  {submitting ? 'PROCESSING...' : 'SUBMIT FINDINGS'}
                </button>
              </form>
            </div>
          ) : (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column' }}>
                <div className="cyber-text-red glitch-effect">MISSION COMPLETE</div>
                <p>Waiting for command to advance to next mission phase.</p>
             </div>
          )}
        </section>
      </main>
    </div>
  );
}
