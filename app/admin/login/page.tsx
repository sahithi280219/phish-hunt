'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => { setLoaded(true); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      position: 'relative',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed',
        top: '40%',
        left: '50%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,51,0.05) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div
        className="panel"
        style={{
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255,0,51,0.15), rgba(255,0,51,0.05))',
          border: '1px solid rgba(255,0,51,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          margin: '0 auto 1.5rem',
        }}>
          ⚡
        </div>

        <h2 style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: '1.3rem',
          letterSpacing: '3px',
          marginBottom: '0.4rem',
          color: '#fff',
        }}>
          ADMIN <span style={{ color: 'var(--red-primary)' }}>OVERRIDE</span>
        </h2>
        <p style={{
          color: '#555',
          fontSize: '0.85rem',
          marginBottom: '2rem',
          fontFamily: 'var(--font-rajdhani)',
          fontWeight: 500,
        }}>
          Authorized personnel only
        </p>
        
        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            ⚠ {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#666',
              fontSize: '0.7rem',
              letterSpacing: '3px',
              fontFamily: 'var(--font-orbitron)',
            }}>ACCESS ID</label>
            <input
              type="text"
              className="cyber-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin ID"
              required
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#666',
              fontSize: '0.7rem',
              letterSpacing: '3px',
              fontFamily: 'var(--font-orbitron)',
            }}>PASSPHRASE</label>
            <input
              type="password"
              className="cyber-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter passphrase"
              required
            />
          </div>
          <button
            type="submit"
            className="cyber-button"
            style={{ marginTop: '0.5rem', width: '100%', padding: '16px' }}
            disabled={loading}
          >
            {loading ? 'AUTHENTICATING...' : 'INITIALIZE'}
          </button>
        </form>
        
        <div style={{ marginTop: '2.5rem' }}>
          <Link href="/" style={{
            color: '#444',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-rajdhani)',
            fontWeight: 600,
            letterSpacing: '1px',
          }}>
            ← Abort Sequence
          </Link>
        </div>
      </div>
    </main>
  );
}
