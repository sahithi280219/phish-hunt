'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WaitingRoom() {
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Initial status check
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/teams/status');
        if (!res.ok) {
          router.push('/join');
          return;
        }
        const data = await res.json();
        setTeam(data.team);
        
        if (data.eventStatus === 'ACTIVE') {
           router.push('/play');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();

    // 2. SSE for game start
    const eventSource = new EventSource('/api/event/stream');
    
    eventSource.onmessage = (e) => {
        try {
            const parsed = JSON.parse(e.data);
            if (parsed.type === 'GAME_STARTED') {
                router.push('/play');
            }
        } catch (err) {}
    };

    return () => {
        eventSource.close();
    };
  }, [router]);

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20vh' }}>Loading...</div>;

  return (
    <main className="container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <h2 className="text-red" style={{ marginBottom: '1rem' }}>WAITING ROOM</h2>
        <h3 style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>TEAM: {team?.name}</h3>
        
        <div style={{ margin: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <div className="glitch text-red" data-text="WAITING FOR ADMIN..." style={{ fontSize: '1.5rem', fontFamily: 'var(--font-orbitron)' }}>
            WAITING FOR ADMIN...
          </div>
          <p style={{ color: 'var(--text-muted)' }}>The investigation will begin shortly.</p>
        </div>
      </div>
    </main>
  );
}
