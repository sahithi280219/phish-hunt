'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Results() {
  const [team, setTeam] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resTeam = await fetch('/api/teams/status');
        if (!resTeam.ok) {
            router.push('/');
            return;
        }
        const teamData = await resTeam.json();
        setTeam(teamData.team);

        const resLeaderboard = await fetch('/api/event/leaderboard');
        if (resLeaderboard.ok) {
            const lbData = await resLeaderboard.json();
            setLeaderboard(lbData.leaderboard || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [router]);

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20vh' }}>Loading...</div>;

  return (
    <main className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0' }}>
      
      <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="glitch text-red" data-text="INVESTIGATION COMPLETE" style={{ marginBottom: '2rem' }}>
              INVESTIGATION COMPLETE
          </h1>
          
          <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', border: '1px solid var(--red-dark)' }}>
              <h2 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>TEAM {team?.name}</h2>
              
              <div style={{ fontSize: '4rem', fontFamily: 'var(--font-orbitron)', color: 'var(--text-main)', textShadow: '0 0 20px var(--red-glow)', marginBottom: '1rem' }}>
                  {team?.score}
              </div>
              
              <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>FINAL SCORE</div>
          </div>
      </div>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--red-primary)' }}>FINAL LEADERBOARD</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px', padding: '10px', borderBottom: '1px solid var(--red-dark)', color: 'var(--text-muted)' }}>
                  <div>RANK</div>
                  <div>TEAM NAME</div>
                  <div style={{ textAlign: 'right' }}>SCORE</div>
              </div>
              
              {leaderboard.map((lbTeam, index) => (
                  <div key={index} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '60px 1fr 100px', 
                      padding: '15px 10px', 
                      background: lbTeam.teamName === team?.name ? 'rgba(255,0,51,0.2)' : 'rgba(0,0,0,0.3)',
                      border: lbTeam.teamName === team?.name ? '1px solid var(--red-primary)' : '1px solid transparent',
                      borderRadius: '4px',
                      alignItems: 'center'
                  }}>
                      <div style={{ fontFamily: 'var(--font-orbitron)', color: index < 3 ? 'var(--red-primary)' : 'inherit' }}>#{index + 1}</div>
                      <div style={{ fontWeight: lbTeam.teamName === team?.name ? 'bold' : 'normal' }}>{lbTeam.teamName}</div>
                      <div style={{ textAlign: 'right', fontFamily: 'var(--font-orbitron)' }}>{lbTeam.score}</div>
                  </div>
              ))}
          </div>
      </div>

    </main>
  );
}
