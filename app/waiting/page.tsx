'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WaitingRoom() {
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState('');
  const router = useRouter();

  useEffect(() => {
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

    const eventSource = new EventSource('/api/event/stream');
    
    eventSource.onmessage = (e) => {
        try {
            const parsed = JSON.parse(e.data);
            if (parsed.type === 'GAME_STARTED') {
                router.push('/play');
            }
        } catch (err) {}
    };

    // Animated dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
        eventSource.close();
        clearInterval(dotsInterval);
    };
  }, [router]);

  if (loading) return (
    <div style={{
      color: '#555',
      textAlign: 'center',
      marginTop: '45vh',
      fontFamily: 'var(--font-orbitron)',
      fontSize: '0.85rem',
      letterSpacing: '3px',
    }}>
      LOADING...
    </div>
  );

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      position: 'relative',
    }}>
      {/* Pulsing background glow */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,51,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'pulse 3s infinite',
      }} />

      <div
        className="panel"
        style={{
          width: '100%',
          maxWidth: '550px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          animation: 'borderGlow 3s infinite',
        }}
      >
        {/* Animated radar icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '2px solid rgba(255,0,51,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          position: 'relative',
          animation: 'redPulse 2s infinite',
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid rgba(255,0,51,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--red-primary)',
              boxShadow: '0 0 15px var(--red-primary), 0 0 30px rgba(255,0,51,0.3)',
              animation: 'pulse 1.5s infinite',
            }} />
          </div>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: '1.4rem',
          letterSpacing: '4px',
          color: 'var(--red-primary)',
          marginBottom: '0.5rem',
          textShadow: '0 0 30px rgba(255,0,51,0.3)',
        }}>
          WAITING ROOM
        </h2>

        <h3 style={{
          marginBottom: '2.5rem',
          color: '#555',
          fontFamily: 'var(--font-orbitron)',
          fontSize: '0.8rem',
          letterSpacing: '3px',
        }}>
          TEAM: <span style={{ color: '#999' }}>{team?.name}</span>
        </h3>
        
        <div style={{
          margin: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <div style={{
            fontSize: '1.1rem',
            fontFamily: 'var(--font-orbitron)',
            color: '#888',
            letterSpacing: '3px',
          }}>
            WAITING FOR ADMIN{dots}
          </div>

          {/* Loading bar */}
          <div style={{
            width: '200px',
            height: '2px',
            background: 'rgba(255,0,51,0.1)',
            borderRadius: '1px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, var(--red-primary), transparent)',
              animation: 'slideBar 2s infinite',
            }} />
          </div>

          <p style={{
            color: '#444',
            fontFamily: 'var(--font-rajdhani)',
            fontWeight: 500,
            fontSize: '0.95rem',
          }}>
            The investigation will begin shortly.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideBar {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </main>
  );
}
