'use client';

import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const trail = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMove);

    const animate = () => {
      // Smooth lag for the large glow
      trail.current.x += (pos.current.x - trail.current.x) * 0.08;
      trail.current.y += (pos.current.y - trail.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 200}px, ${trail.current.y - 200}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Large soft radial glow — follows with lag */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,0,51,0.10) 0%, rgba(255,0,51,0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />

      {/* Sharp cursor dot — snaps instantly */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 0, 51, 0.8)',
          background: 'rgba(255, 0, 51, 0.15)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          boxShadow: '0 0 8px rgba(255,0,51,0.6), 0 0 20px rgba(255,0,51,0.2)',
        }}
      />
    </>
  );
}
