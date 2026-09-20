'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function JoinEvent() {
  const [accessId, setAccessId] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => { setLoaded(true); }, []);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/participant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessId: accessId.trim(), passphrase: passphrase.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid Access ID or Passphrase.');
        return;
      }

      router.push(`/register?code=${data.eventCode}`);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'fixed',
        top: '30%',
        left: '50%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,51,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div
        className="panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'redPulse 4s infinite',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255,0,51,0.15), rgba(255,0,51,0.05))',
            border: '1px solid rgba(255,0,51,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            margin: '0 auto 1.2rem',
          }}>
            🔐
          </div>
          <h2 style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: '1.3rem',
            letterSpacing: '3px',
            color: '#fff',
            marginBottom: '0.5rem',
          }}>
            PARTICIPANT <span style={{ color: 'var(--red-primary)' }}>ACCESS</span>
          </h2>
          <p style={{
            color: '#555',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-rajdhani)',
            fontWeight: 500,
          }}>
            Enter your event credentials to proceed
          </p>
        </div>

        <form
          onSubmit={handleJoin}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}
        >
          {/* ACCESS ID */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#666',
              fontSize: '0.7rem',
              letterSpacing: '3px',
              fontFamily: 'var(--font-orbitron)',
            }}>
              ACCESS ID
            </label>
            <input
              id="access-id"
              type="text"
              className="cyber-input"
              placeholder="Enter Access ID"
              value={accessId}
              onChange={(e) => setAccessId(e.target.value)}
              autoComplete="off"
              autoCapitalize="characters"
              required
              style={{ fontSize: '1.1rem', letterSpacing: '3px', textTransform: 'uppercase' }}
            />
          </div>

          {/* PASSPHRASE */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#666',
              fontSize: '0.7rem',
              letterSpacing: '3px',
              fontFamily: 'var(--font-orbitron)',
            }}>
              PASSPHRASE
            </label>
            <input
              id="passphrase"
              type="password"
              className="cyber-input"
              placeholder="Enter Passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              autoComplete="off"
              required
              style={{ fontSize: '1.1rem', letterSpacing: '3px' }}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error" style={{ textAlign: 'center' }}>
              ⚠ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            id="join-submit"
            className="cyber-button"
            disabled={loading}
            style={{ marginTop: '0.5rem', padding: '16px', width: '100%' }}
          >
            {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE & PROCEED'}
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
            transition: 'color 0.3s',
          }}>
            ← Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
