'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterForm() {
  const searchParams = useSearchParams();
  const eventCode = searchParams.get('code') || '';

  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState(['']); // start with 1 member slot
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addMember = () => {
    if (members.length < 4) setMembers([...members, '']);
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) return; // must have at least 1
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
    // Ensure all visible inputs are non-empty
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
        <label
          style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.8rem', letterSpacing: '2px' }}
        >
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
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}
        >
          <label style={{ color: '#aaa', fontSize: '0.8rem', letterSpacing: '2px' }}>
            TEAM MEMBERS ({members.length} added · min 1, max 4)
          </label>
          {members.length < 4 && (
            <button
              type="button"
              onClick={addMember}
              style={{
                background: 'transparent',
                border: '1px solid var(--red-dark)',
                color: 'var(--red-primary)',
                padding: '4px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                letterSpacing: '1px',
              }}
            >
              + ADD MEMBER
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
                    background: 'transparent',
                    border: '1px solid #444',
                    color: '#888',
                    width: '36px',
                    height: '36px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <p style={{ marginTop: '0.5rem', color: '#555', fontSize: '0.78rem' }}>
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
        style={{ padding: '1rem', marginTop: '0.5rem' }}
      >
        {loading ? 'REGISTERING...' : 'REGISTER TEAM →'}
      </button>
    </form>
  );
}

export default function Register() {
  return (
    <main
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0',
      }}
    >
      <div className="panel" style={{ width: '100%', maxWidth: '560px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
          <h2 className="cyber-text-red" style={{ margin: 0 }}>
            TEAM REGISTRATION
          </h2>
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.4rem' }}>
            Register your team to join the Phish Hunt
          </p>
        </div>

        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <RegisterForm />
        </Suspense>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/join" style={{ color: '#555', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Back to Access
          </a>
        </div>
      </div>
    </main>
  );
}
