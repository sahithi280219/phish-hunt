'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinEvent() {
  const [accessId, setAccessId] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      // Credentials valid — go to registration with the event code
      router.push(`/register?code=${data.eventCode}`);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="panel"
        style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔐</div>
          <h2 className="cyber-text-red glitch-effect" style={{ margin: 0 }}>
            PARTICIPANT ACCESS
          </h2>
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Enter your event credentials to proceed
          </p>
        </div>

        <form
          onSubmit={handleJoin}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}
        >
          {/* ACCESS ID */}
          <div>
            <label
              style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.8rem', letterSpacing: '2px' }}
            >
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
            <label
              style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.8rem', letterSpacing: '2px' }}
            >
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
            <div
              className="alert alert-error"
              style={{ textAlign: 'center', fontWeight: 'bold' }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            id="join-submit"
            className="cyber-button"
            disabled={loading}
            style={{ marginTop: '0.5rem', padding: '1rem' }}
          >
            {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE & PROCEED'}
          </button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          <a href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Return to Home
          </a>
        </div>
      </div>
    </main>
  );
}
