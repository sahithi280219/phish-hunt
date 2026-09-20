'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchEventData = async () => {
    try {
      const res = await fetch('/api/admin/event');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch event data');
      const data = await res.json();
      const ev = data.event;
      if (ev) {
        const teamsRes = await fetch('/api/admin/teams');
        const teamsData = teamsRes.ok ? await teamsRes.json() : { teams: [] };
        setEventData({ ...ev, teamCount: teamsData.teams?.length ?? 0 });
      } else {
        setEventData(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleAction = async (endpoint: string) => {
    try {
      const res = await fetch(`/api/admin/event/${endpoint}`, { method: 'POST' });
      if (!res.ok) throw new Error(`Failed to ${endpoint}`);
      fetchEventData(); // refresh data
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) return <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading Admin Panel...</div>;
  if (error) return <div className="container"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--red-dark)' }}>
        <h1 className="cyber-text-red m-0">COMMAND CENTER</h1>
        <button onClick={handleLogout} className="cyber-button" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--red-dark)' }}>
          DISCONNECT
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        {/* Navigation Sidebar */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="cyber-button" style={{ textAlign: 'left', background: 'var(--red-dark)' }}>OVERVIEW</button>
          <button onClick={() => router.push('/admin/teams')} className="cyber-button" style={{ textAlign: 'left', background: 'transparent', border: '1px solid var(--red-dark)' }}>TEAM ROSTER</button>
          <button onClick={() => router.push('/admin/leaderboard')} className="cyber-button" style={{ textAlign: 'left', background: 'transparent', border: '1px solid var(--red-dark)' }}>LEADERBOARD</button>
        </nav>

        {/* Main Content */}
        <main>
          <section className="panel" style={{ marginBottom: '2rem' }}>
            <h2 className="cyber-text-red" style={{ marginTop: 0 }}>EVENT STATUS: <span style={{color:'#fff'}}>{eventData?.status ?? 'LOADING...'}</span></h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                onClick={() => handleAction('start')} 
                className="cyber-button" 
                disabled={eventData?.status !== 'WAITING'}
              >
                START EVENT
              </button>
              <button 
                onClick={() => handleAction('pause-resume')} 
                className="cyber-button"
                disabled={eventData?.status === 'WAITING' || eventData?.status === 'COMPLETED'}
                style={{ background: eventData?.status === 'ACTIVE' ? 'var(--red-dark)' : 'var(--red-primary)' }}
              >
                {eventData?.status === 'PAUSED' ? 'RESUME EVENT' : 'PAUSE EVENT'}
              </button>
              <button 
                onClick={() => handleAction('end')} 
                className="cyber-button"
                disabled={eventData?.status === 'COMPLETED'}
                style={{ background: '#333', color: '#fff' }}
              >
                END EVENT
              </button>
            </div>
          </section>

          <section className="panel">
            <h3 className="cyber-text-red" style={{ marginTop: 0 }}>SYSTEM STATS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#000', padding: '1rem', border: '1px solid #333' }}>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>JOIN CODE</div>
                <div style={{ fontSize: '2rem', fontFamily: 'var(--font-orbitron)' }}>{eventData?.code}</div>
              </div>
              <div style={{ background: '#000', padding: '1rem', border: '1px solid #333' }}>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>TOTAL TEAMS</div>
                <div style={{ fontSize: '2rem', fontFamily: 'var(--font-orbitron)' }}>{eventData?.teamCount || 0}</div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
