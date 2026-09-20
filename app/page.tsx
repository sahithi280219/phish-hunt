'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLoaded(true);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <main style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Full-bleed hacker hero image */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/hacker-hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        transform: `scale(1.05) translate(${mousePos.x * 0.005}px, ${mousePos.y * 0.005}px)`,
        transition: 'transform 0.3s ease-out',
      }} />

      {/* Gradient overlay — dark left for text, transparent right for image */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: `linear-gradient(105deg, 
          rgba(3,3,3,0.95) 0%, 
          rgba(3,3,3,0.85) 30%, 
          rgba(3,3,3,0.55) 55%, 
          rgba(3,3,3,0.25) 75%,
          rgba(3,3,3,0.15) 100%)`,
        zIndex: 1,
      }} />

      {/* Red vignette glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(ellipse at 20% 80%, rgba(255,0,51,0.12) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(255,0,51,0.06) 0%, transparent 50%)`,
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Bottom red glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '350px',
        background: 'linear-gradient(to top, rgba(255,0,51,0.15), transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Top nav bar */}
      <nav style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s ease 0.2s',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'var(--font-orbitron)',
          fontSize: '0.85rem',
          letterSpacing: '3px',
          color: '#fff',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #FF0033, #990020)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: 900,
            boxShadow: '0 0 20px rgba(255,0,51,0.3)',
          }}>
            PH
          </div>
          PHISH<span style={{ color: 'var(--red-primary)' }}>HUNT</span>
        </div>
        <Link href="/admin/login" style={{
          color: '#666',
          fontSize: '0.75rem',
          letterSpacing: '2px',
          fontFamily: 'var(--font-orbitron)',
          padding: '8px 20px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '6px',
          transition: 'all 0.3s',
          textDecoration: 'none',
        }}>
          ADMIN
        </Link>
      </nav>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 48px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}>

        {/* Event badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255,0,51,0.08)',
          border: '1px solid rgba(255,0,51,0.25)',
          borderRadius: '100px',
          padding: '8px 20px',
          marginBottom: '2rem',
          fontSize: '0.7rem',
          letterSpacing: '3px',
          color: '#FF4466',
          fontFamily: 'var(--font-orbitron)',
          width: 'fit-content',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
        }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#FF0033',
            display: 'inline-block',
            boxShadow: '0 0 10px #FF0033, 0 0 20px rgba(255,0,51,0.3)',
            animation: 'pulse 2s infinite',
          }} />
          LIVE CYBER EVENT — 28.09.2026
        </div>

        {/* Main title */}
        <h1
          className="glitch-effect"
          data-text="PHISH HUNT"
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontFamily: 'var(--font-orbitron)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.95,
            marginBottom: '0.5rem',
            textShadow: '0 0 60px rgba(255,0,51,0.4), 0 0 120px rgba(255,0,51,0.1)',
            letterSpacing: '-3px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          PHISH<br />
          <span style={{
            color: 'var(--red-primary)',
            textShadow: '0 0 60px rgba(255,0,51,0.6), 0 0 120px rgba(255,0,51,0.2)',
          }}>HUNT</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
          color: '#666',
          letterSpacing: '8px',
          marginBottom: '2rem',
          fontFamily: 'var(--font-orbitron)',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
        }}>
          SPOT THE TRAP. STAY SAFE.
        </p>

        {/* Red accent line */}
        <div style={{
          width: loaded ? '100px' : '0px',
          height: '3px',
          background: 'linear-gradient(90deg, var(--red-primary), transparent)',
          marginBottom: '2rem',
          borderRadius: '2px',
          boxShadow: '0 0 15px rgba(255,0,51,0.5)',
          transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s',
        }} />

        {/* Description */}
        <p style={{
          fontSize: '1.05rem',
          color: '#777',
          maxWidth: '500px',
          lineHeight: 1.9,
          marginBottom: '3rem',
          fontFamily: 'var(--font-rajdhani)',
          fontWeight: 500,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s',
        }}>
          A live phishing investigation challenge. Analyse suspicious messages, 
          expose the attacker, and protect the network — before time runs out.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1.2rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s',
        }}>
          <Link href="/join">
            <button
              id="join-event-btn"
              className="cyber-button"
              style={{
                padding: '18px 56px',
                fontSize: '1rem',
                letterSpacing: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>▶</span> JOIN EVENT
            </button>
          </Link>

          <Link href="/leaderboard" style={{
            color: '#555',
            fontSize: '0.8rem',
            letterSpacing: '2px',
            fontFamily: 'var(--font-orbitron)',
            padding: '18px 32px',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius)',
            transition: 'all 0.3s',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            LEADERBOARD
          </Link>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          marginTop: '4rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.4s',
        }}>
          {[
            { label: 'THREAT LEVEL', value: 'HIGH' },
            { label: 'MISSIONS', value: '5+' },
            { label: 'MAX TEAM', value: '4' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--font-orbitron)',
                fontWeight: 900,
                color: i === 0 ? 'var(--red-primary)' : '#fff',
                textShadow: i === 0 ? '0 0 20px rgba(255,0,51,0.4)' : 'none',
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.65rem',
                color: '#555',
                letterSpacing: '2px',
                fontFamily: 'var(--font-orbitron)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative corner elements */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '48px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
        opacity: loaded ? 0.4 : 0,
        transition: 'opacity 1s ease 1.5s',
      }}>
        <div style={{
          fontSize: '0.6rem',
          color: '#444',
          letterSpacing: '3px',
          fontFamily: 'var(--font-orbitron)',
        }}>
          SYS://PHISHHUNT_v2.0
        </div>
        <div style={{
          fontSize: '0.55rem',
          color: '#333',
          letterSpacing: '2px',
          fontFamily: 'monospace',
        }}>
          [SECURE CONNECTION ESTABLISHED]
        </div>
      </div>
    </main>
  );
}
