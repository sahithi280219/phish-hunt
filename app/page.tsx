'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

      {/* Full-bleed hacker image background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/hacker-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
      }} />

      {/* Dark overlay — left side darker for text contrast, right side lets the face show */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(100deg, rgba(0,0,0,0.88) 40%, rgba(0,0,0,0.35) 100%)',
        zIndex: 1,
      }} />

      {/* Scanline overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Red bottom glow from bottom edge */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '300px',
        background: 'linear-gradient(to top, rgba(255,0,51,0.18), transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'left',
        maxWidth: '1000px',
        width: '100%',
        padding: '2rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>

        {/* Event badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,0,51,0.15)',
          border: '1px solid rgba(255,0,51,0.4)',
          borderRadius: '4px',
          padding: '6px 14px',
          marginBottom: '1.5rem',
          fontSize: '0.75rem',
          letterSpacing: '3px',
          color: '#FF4466',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF0033', display: 'inline-block', boxShadow: '0 0 8px #FF0033', animation: 'pulse 1.5s infinite' }} />
          CYBER AWARENESS EVENT — 28.09.2026
        </div>

        {/* Main title */}
        <h1
          className="glitch-effect"
          data-text="PHISH HUNT"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontFamily: 'var(--font-orbitron)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
            marginBottom: '0.4rem',
            textShadow: '0 0 40px rgba(255,0,51,0.5)',
            letterSpacing: '-2px',
          }}
        >
          PHISH<span style={{ color: 'var(--red-primary)' }}> HUNT</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: '#aaa',
          letterSpacing: '5px',
          marginBottom: '2.5rem',
          fontFamily: 'var(--font-orbitron)',
        }}>
          &quot;SPOT THE TRAP. STAY SAFE.&quot;
        </p>

        {/* Divider */}
        <div style={{ width: '80px', height: '2px', background: 'var(--red-primary)', marginBottom: '2.5rem', boxShadow: '0 0 12px var(--red-primary)' }} />

        {/* Description */}
        <p style={{
          fontSize: '1rem',
          color: '#888',
          maxWidth: '480px',
          lineHeight: 1.8,
          marginBottom: '3rem',
        }}>
          A live phishing investigation challenge. Analyse clues, expose the attacker,
          and protect the network — before time runs out.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/join">
            <button
              id="join-event-btn"
              className="cyber-button"
              style={{ padding: '16px 48px', fontSize: '1.05rem', letterSpacing: '3px' }}
            >
              ▶ JOIN EVENT
            </button>
          </Link>

          <Link href="/admin/login">
            <button
              id="admin-login-btn"
              className="admin-ghost-btn"
            >
              ADMIN
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
