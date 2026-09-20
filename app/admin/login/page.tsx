'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="panel" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h2 className="cyber-text-red glitch-effect" style={{ marginBottom: '2rem' }}>ADMIN OVERRIDE</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>ACCESS ID</label>
            <input
              type="text"
              className="cyber-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>PASSPHRASE</label>
            <input
              type="password"
              className="cyber-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="cyber-button" style={{ marginTop: '1rem' }} disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'INITIALIZE'}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
            &lt; Abort Sequence
          </Link>
        </div>
      </div>
    </div>
  );
}
