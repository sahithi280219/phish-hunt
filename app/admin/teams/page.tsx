'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminTeams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/admin/teams');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch teams');
      const data = await res.json();
      setTeams(data.teams);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) return <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading Teams...</div>;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--red-dark)' }}>
        <h1 className="cyber-text-red m-0">TEAM ROSTER</h1>
        <button onClick={() => router.push('/admin/dashboard')} className="cyber-button" style={{ padding: '0.5rem 1rem' }}>
          &lt; BACK TO OVERVIEW
        </button>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="panel">
        {teams.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>No teams registered yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--red-dark)', textAlign: 'left', color: 'var(--red-primary)' }}>
                <th style={{ padding: '1rem' }}>ID</th>
                <th style={{ padding: '1rem' }}>TEAM NAME</th>
                <th style={{ padding: '1rem' }}>MEMBERS</th>
                <th style={{ padding: '1rem' }}>CURRENT MISSION</th>
                <th style={{ padding: '1rem' }}>SCORE</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#666' }}>{team.id.substring(0, 8)}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{team.name}</td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{team.members.join(', ')}</td>
                  <td style={{ padding: '1rem' }}>{team.currentMission}</td>
                  <td style={{ padding: '1rem', color: 'var(--red-light)', fontWeight: 'bold' }}>{team.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
