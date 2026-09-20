'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/PhoneFrame';
import ChatApp from '@/components/apps/ChatApp';
import MailApp from '@/components/apps/MailApp';
import BrowserApp from '@/components/apps/BrowserApp';
import BankApp from '@/components/apps/BankApp';
import PhoneApp from '@/components/apps/PhoneApp';
import EvidencePopup from '@/components/apps/EvidencePopup';
import AnswerInput from '@/components/apps/AnswerInput';
import FeedbackScreen from '@/components/apps/FeedbackScreen';

export default function Play() {
  const [gameState, setGameState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [evidence, setEvidence] = useState<any>(null);
  const [showEvidence, setShowEvidence] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [activeApp, setActiveApp] = useState<'home' | 'chat' | 'mail' | 'browser' | 'bank' | 'phone'>('home');
  const router = useRouter();

  const fetchState = async () => {
    try {
      const res = await fetch('/api/gameplay/state');
      if (res.status === 401 || res.status === 403) {
          // Check if event ended or unauthorized
          const data = await res.json().catch(()=>({}));
          if (data.status === 'COMPLETED') {
              router.push('/results');
          } else {
              router.push('/join');
          }
          return;
      }
      
      const data = await res.json();
      
      if (data.finished) {
          router.push('/results');
          return;
      }
      
      setGameState(data);
      
      // Auto-switch to the relevant app for the current question if not investigating evidence
      if (data.question && !showEvidence && !feedback) {
          setActiveApp(data.question.app);
          // Fetch evidence for this question
          fetchEvidence(data.question.id);
      }
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvidence = async (questionId: number) => {
      try {
          const res = await fetch(`/api/gameplay/evidence?questionId=${questionId}`);
          if (res.ok) {
              const data = await res.json();
              setEvidence(data.evidence);
          }
      } catch(err) { console.error(err); }
  };

  useEffect(() => {
    fetchState();
    
    // Timer sync interval
    const intervalId = setInterval(() => {
        setGameState((prev: any) => {
            if(!prev || prev.isPaused || prev.timeRemainingMs === undefined || prev.timeRemainingMs <= 0) return prev;
            return {
                ...prev,
                timeRemainingMs: Math.max(0, prev.timeRemainingMs - 1000)
            };
        });
    }, 1000);

    // SSE listener for game events
    const eventSource = new EventSource('/api/event/stream');
    eventSource.onmessage = (e) => {
        try {
            const parsed = JSON.parse(e.data);
            if (['GAME_PAUSED', 'GAME_RESUMED', 'GAME_ENDED'].includes(parsed.type)) {
                fetchState();
            }
        } catch (err) {}
    };

    return () => {
        clearInterval(intervalId);
        eventSource.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAppSelect = (app: any) => {
      setActiveApp(app);
  };

  const handleEvidenceDiscover = () => {
      setShowEvidence(true);
  };

  const handleEvidenceContinue = () => {
      setShowEvidence(false);
  };

  const handleAnswerSubmit = async (answer: string) => {
      if (!gameState?.question) return;
      
      try {
          const res = await fetch('/api/gameplay/answer', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ questionId: gameState.question.id, answer })
          });
          
          if (res.ok) {
              const result = await res.json();
              setFeedback(result);
          }
      } catch(err) { console.error(err); }
  };

  const handleFeedbackContinue = () => {
      setFeedback(null);
      if (feedback?.finished) {
          router.push('/results');
      } else {
          setLoading(true);
          fetchState(); // Fetch next question
      }
  };

  if (loading || !gameState) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20vh' }}>Loading...</div>;

  if (gameState.isPaused) {
      return (
          <main className="container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="glass-panel" style={{ textAlign: 'center' }}>
                  <h2 className="text-red">EVENT PAUSED</h2>
                  <p>Please wait for the administrator to resume the game.</p>
              </div>
          </main>
      );
  }

  const currentQuestionApp = gameState.question?.app;
  const isCorrectApp = activeApp === currentQuestionApp;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', background: 'var(--bg-darkest)' }}>
      
      {/* Top HUD */}
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', padding: '0 20px', marginBottom: '20px' }}>
          <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>MISSION {gameState.mission?.id}</div>
              <div style={{ color: 'var(--red-primary)', fontFamily: 'var(--font-orbitron)' }}>{gameState.mission?.title}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>SCORE</div>
              <div style={{ color: '#fff', fontFamily: 'var(--font-orbitron)', fontSize: '1.2rem' }}>{gameState.score}</div>
          </div>
      </div>

      <PhoneFrame activeApp={activeApp} onAppSelect={handleAppSelect} timeRemainingMs={gameState.timeRemainingMs}>
          
          {/* Feedback Overlay */}
          {feedback && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }}>
                  <FeedbackScreen feedback={feedback} onContinue={handleFeedbackContinue} />
              </div>
          )}

          {/* Evidence Overlay */}
          {!feedback && showEvidence && evidence && (
               <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 90 }}>
                   <EvidencePopup evidence={evidence} onContinue={handleEvidenceContinue} />
               </div>
          )}

          {/* Main App Content */}
          {!feedback && !showEvidence && (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  
                  {/* App Rendering */}
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                      {activeApp === 'home' && (
                          <div style={{ padding: '20px', color: '#fff' }}>
                              <h3 style={{ marginBottom: '10px' }}>Current Objective:</h3>
                              <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{gameState.mission?.briefing}</p>
                              
                              <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(255,0,51,0.2)', border: '1px solid var(--red-primary)', borderRadius: '8px' }}>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--red-primary)', marginBottom: '5px' }}>NEW NOTIFICATION</div>
                                  <div>Check your {currentQuestionApp} app for new evidence.</div>
                              </div>
                          </div>
                      )}
                      
                      {activeApp === 'chat' && isCorrectApp && <ChatApp scenario={gameState.question.scenario} onDiscover={handleEvidenceDiscover} />}
                      {activeApp === 'mail' && isCorrectApp && <MailApp scenario={gameState.question.scenario} onDiscover={handleEvidenceDiscover} />}
                      {activeApp === 'browser' && isCorrectApp && <BrowserApp scenario={gameState.question.scenario} onDiscover={handleEvidenceDiscover} />}
                      {activeApp === 'bank' && isCorrectApp && <BankApp scenario={gameState.question.scenario} onDiscover={handleEvidenceDiscover} />}
                      {activeApp === 'phone' && isCorrectApp && <PhoneApp scenario={gameState.question.scenario} onDiscover={handleEvidenceDiscover} />}
                      
                      {activeApp !== 'home' && !isCorrectApp && (
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#666' }}>
                              No new activity in this app.
                          </div>
                      )}
                  </div>

                  {/* Answer Input Area (Only shows if in correct app) */}
                  {isCorrectApp && (
                      <div style={{ padding: '15px', background: '#111', borderTop: '1px solid #333', zIndex: 20 }}>
                          <AnswerInput question={gameState.question.questionText} onSubmit={handleAnswerSubmit} />
                      </div>
                  )}
              </div>
          )}

      </PhoneFrame>
    </main>
  );
}
