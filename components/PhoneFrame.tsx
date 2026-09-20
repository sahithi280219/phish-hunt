'use client';

import React, { useState, useEffect } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  activeApp: 'home' | 'chat' | 'mail' | 'browser' | 'bank' | 'phone';
  onAppSelect?: (app: 'home' | 'chat' | 'mail' | 'browser' | 'bank' | 'phone') => void;
  timeRemainingMs?: number;
}

export default function PhoneFrame({ children, activeApp, onAppSelect, timeRemainingMs }: PhoneFrameProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (ms: number) => {
    if (ms <= 0) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      height: '800px',
      maxHeight: '90vh',
      margin: '0 auto',
      background: '#000',
      border: '12px solid #111',
      borderRadius: '40px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 20px rgba(255, 0, 51, 0.2), 0 0 40px rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        fontSize: '0.8rem',
        background: activeApp === 'home' ? 'transparent' : '#111',
        color: '#fff',
        zIndex: 10
      }}>
        <span>{currentTime}</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span>📶</span>
          <span>🔋 87%</span>
        </div>
      </div>

      {/* Screen Content */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', background: activeApp === 'home' ? 'url(/hero-hacker.jpg) center/cover' : '#1a1a1a' }}>
         {activeApp === 'home' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)' }} />}
         
         <div style={{ position: 'relative', zIndex: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {children}
         </div>
      </div>

      {/* App Dock / Navigation */}
      {onAppSelect && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '15px 10px',
          background: 'rgba(17, 17, 17, 0.95)',
          borderTop: '1px solid #333'
        }}>
          <AppIcon icon="💬" label="Chat" active={activeApp === 'chat'} onClick={() => onAppSelect('chat')} />
          <AppIcon icon="✉️" label="Mail" active={activeApp === 'mail'} onClick={() => onAppSelect('mail')} />
          <AppIcon icon="🌐" label="Web" active={activeApp === 'browser'} onClick={() => onAppSelect('browser')} />
          <AppIcon icon="🏦" label="Bank" active={activeApp === 'bank'} onClick={() => onAppSelect('bank')} />
          <AppIcon icon="📞" label="Phone" active={activeApp === 'phone'} onClick={() => onAppSelect('phone')} />
        </div>
      )}

      {/* Timer Overlay */}
      {timeRemainingMs !== undefined && (
          <div style={{
              position: 'absolute',
              top: '40px',
              right: '10px',
              background: 'rgba(255, 0, 51, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-orbitron)',
              zIndex: 20
          }}>
              {formatTimer(timeRemainingMs)}
          </div>
      )}
    </div>
  );
}

function AppIcon({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        opacity: active ? 1 : 0.6,
        transform: active ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{icon}</div>
      <div style={{ fontSize: '0.6rem', color: '#fff' }}>{label}</div>
    </div>
  );
}
