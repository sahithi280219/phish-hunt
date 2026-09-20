'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/event/leaderboard');
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        const data = await res.json();
        setLeaderboard(data.leaderboard);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    
    // Poll every 10 seconds for updates
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4rem' }}>
      <h1 className="cyber-text-red glitch-effect" style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
        GLOBAL LEADERBOARD
      </h1>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <div className="panel" style={{ width: '100%', maxWidth: '800px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading data...</div>
        ) : leaderboard.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No teams registered yet.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--red-dark)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>RANK</th>
                <th style={{ padding: '1rem' }}>TEAM NAME</th>
                <th style={{ padding: '1rem' }}>MISSION</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>SCORE</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((team, index) => (
                <tr key={team.id} style={{ 
                  borderBottom: '1px solid #333',
                  background: index === 0 ? 'rgba(255, 0, 51, 0.1)' : 'transparent'
                }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: index === 0 ? 'var(--red-primary)' : 'inherit' }}>
                    #{index + 1}
                  </td>
                  <td style={{ padding: '1rem' }}>{team.name}</td>
                  <td style={{ padding: '1rem' }}>{team.currentMission}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', color: 'var(--red-light)' }}>
                    {team.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <Link href="/" className="cyber-button" style={{ background: 'transparent', border: '1px solid #333' }}>
          RETURN TO HOME
        </Link>
      </div>
    </div>
  );
}
