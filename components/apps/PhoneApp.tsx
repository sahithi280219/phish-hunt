import React from 'react';

interface PhoneAppProps {
  scenario: any;
  onDiscover: () => void;
}

export default function PhoneApp({ scenario, onDiscover }: PhoneAppProps) {
  if (!scenario?.callLog) return null;
  const call = scenario.callLog;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#000', color: '#fff' }}>
      
      {/* Active Call View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 20px', background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#333', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem' }}>
                  👤
              </div>
              <h2 style={{ fontWeight: 'normal', marginBottom: '5px' }}>{call.callerName}</h2>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{call.callerNumber}</div>
              <div style={{ color: '#4CAF50', marginTop: '10px' }}>{call.duration}</div>
          </div>
          
          {/* Transcript / Audio Waveform Simulation */}
          <div 
              onClick={onDiscover}
              style={{ 
                  flex: 1, 
                  background: 'rgba(255,255,255,0.05)', 
                  borderRadius: '16px', 
                  padding: '20px', 
                  overflowY: 'auto',
                  border: '1px solid rgba(255,0,51,0.2)',
                  cursor: 'pointer'
              }}
          >
              <div style={{ textAlign: 'center', color: 'var(--red-primary)', fontSize: '0.8rem', marginBottom: '15px' }}>
                  TAP TO ANALYZE CALL TRANSCRIPT 🔍
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {call.transcript.map((line: string, i: number) => {
                      const isYou = line.startsWith('You:');
                      return (
                          <div key={i} style={{
                              color: isYou ? '#fff' : '#aaa',
                              fontSize: '0.9rem',
                              lineHeight: '1.4',
                              borderLeft: isYou ? 'none' : '2px solid var(--red-dark)',
                              borderRight: isYou ? '2px solid #4CAF50' : 'none',
                              paddingLeft: isYou ? '0' : '10px',
                              paddingRight: isYou ? '10px' : '0',
                              textAlign: isYou ? 'right' : 'left'
                          }}>
                              {line}
                          </div>
                      );
                  })}
              </div>
          </div>
          
          {/* Call Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🎤</div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>⏸️</div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#d32f2f', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>📞</div>
          </div>
      </div>
      
    </div>
  );
}
