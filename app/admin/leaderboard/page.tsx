'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/admin/leaderboard');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      const data = await res.json();
      setLeaderboard(data.leaderboard);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000); // Admin gets faster updates
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading Leaderboard...</div>;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--red-dark)' }}>
        <h1 className="cyber-text-red m-0">LIVE STANDINGS</h1>
        <button onClick={() => router.push('/admin/dashboard')} className="cyber-button" style={{ padding: '0.5rem 1rem' }}>
          &lt; BACK TO OVERVIEW
        </button>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="panel">
        {leaderboard.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>No data available.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--red-dark)', textAlign: 'left', color: 'var(--red-primary)' }}>
                <th style={{ padding: '1rem' }}>RANK</th>
                <th style={{ padding: '1rem' }}>TEAM NAME</th>
                <th style={{ padding: '1rem' }}>MISSION</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>SCORE</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((team, index) => (
                <tr key={team.id} style={{ borderBottom: '1px solid #333', background: index === 0 ? 'rgba(255, 0, 51, 0.1)' : 'transparent' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>#{index + 1}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{team.name}</td>
                  <td style={{ padding: '1rem' }}>{team.currentMission}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--red-light)', fontWeight: 'bold' }}>{team.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
