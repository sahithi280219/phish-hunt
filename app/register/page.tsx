'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function RegisterForm() {
  const searchParams = useSearchParams();
  const eventCode = searchParams.get('code') || '';

  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState(['']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addMember = () => {
    if (members.length < 4) setMembers([...members, '']);
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) return;
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index: number, value: string) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filledMembers = members.map((m) => m.trim()).filter(Boolean);
    if (!teamName.trim()) {
      setError('Please enter a team name.');
      return;
    }
    if (filledMembers.length === 0) {
      setError('Please enter at least one member name.');
      return;
    }
    if (members.some((m) => !m.trim())) {
      setError('Please fill in all member fields or remove empty ones.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/teams/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventCode, teamName: teamName.trim(), members: filledMembers }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/waiting');
      } else {
        setError(data.error || 'Registration failed. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}
    >
      {/* Team Name */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          color: '#666',
          fontSize: '0.7rem',
          letterSpacing: '3px',
          fontFamily: 'var(--font-orbitron)',
        }}>
          TEAM NAME
        </label>
        <input
          id="team-name"
          type="text"
          className="cyber-input"
          placeholder="e.g. Cyber Wolves"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
      </div>

      {/* Members */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}>
          <label style={{
            color: '#666',
            fontSize: '0.7rem',
            letterSpacing: '3px',
            fontFamily: 'var(--font-orbitron)',
          }}>
            MEMBERS ({members.length}/4)
          </label>
          {members.length < 4 && (
            <button
              type="button"
              onClick={addMember}
              style={{
                background: 'rgba(255,0,51,0.08)',
                border: '1px solid rgba(255,0,51,0.2)',
                color: 'var(--red-primary)',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                letterSpacing: '1px',
                fontFamily: 'var(--font-orbitron)',
                transition: 'all 0.3s',
              }}
            >
              + ADD
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {members.map((member, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                className="cyber-input"
                placeholder={`Member ${i + 1} Name`}
                value={member}
                onChange={(e) => handleMemberChange(i, e.target.value)}
                required
                style={{ flex: 1 }}
              />
              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(i)}
                  title="Remove member"
                  style={{
                    background: 'rgba(255,0,51,0.05)',
                    border: '1px solid rgba(255,0,51,0.15)',
                    color: '#666',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                    transition: 'all 0.3s',
                    fontFamily: 'var(--font-rajdhani)',
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <p style={{
          marginTop: '0.5rem',
          color: '#444',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-rajdhani)',
          fontWeight: 500,
        }}>
          Team size: 1–4 members allowed.
        </p>
      </div>

      {error && (
        <div className="alert alert-error" style={{ textAlign: 'center' }}>
          ⚠ {error}
        </div>
      )}

      <button
        id="register-submit"
        type="submit"
        className="cyber-button"
        disabled={loading}
        style={{ padding: '16px', marginTop: '0.5rem', width: '100%' }}
      >
        {loading ? 'REGISTERING...' : 'REGISTER TEAM →'}
      </button>
    </form>
  );
}

export default function Register() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

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
        top: '40%',
        left: '50%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,51,0.05) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div
        className="panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          position: 'relative',
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
            margin: '0 auto 1.2rem',
          }}>
            🛡️
          </div>
          <h2 style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: '1.3rem',
            letterSpacing: '3px',
            color: '#fff',
            marginBottom: '0.4rem',
          }}>
            TEAM <span style={{ color: 'var(--red-primary)' }}>REGISTRATION</span>
          </h2>
          <p style={{
            color: '#555',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-rajdhani)',
            fontWeight: 500,
          }}>
            Register your team to join the Phish Hunt
          </p>
        </div>

        <Suspense fallback={<p style={{ textAlign: 'center', color: '#555' }}>Loading...</p>}>
          <RegisterForm />
        </Suspense>

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link href="/join" style={{
            color: '#444',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-rajdhani)',
            fontWeight: 600,
            letterSpacing: '1px',
          }}>
            ← Back to Access
          </Link>
        </div>
      </div>
    </main>
  );
}
