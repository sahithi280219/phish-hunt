import React from 'react';

interface BankAppProps {
  scenario: any;
  onDiscover: () => void;
}

export default function BankApp({ scenario, onDiscover }: BankAppProps) {
  if (!scenario?.bankAlert) return null;
  const alert = scenario.bankAlert;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#002B5C', color: '#fff' }}>
      
      {/* Header */}
      <div style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001a38' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-orbitron)' }}>
              {alert.bankName}
          </div>
          <div>👤</div>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          
          <div style={{ background: '#fff', color: '#000', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
              <div style={{ background: 'var(--red-primary)', color: 'white', padding: '12px 15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>⚠️</span>
                  {alert.alertType}
              </div>
              
              <div style={{ padding: '20px' }}>
                  {alert.amount && (
                      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                          <div style={{ fontSize: '0.9rem', color: '#666' }}>Amount</div>
                          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--red-dark)' }}>{alert.amount}</div>
                      </div>
                  )}
                  
                  <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: '1.5', color: '#333' }}>
                      {alert.message}
                  </div>
                  
                  {alert.actionUrl && (
                      <button 
                          onClick={onDiscover}
                          style={{ 
                              width: '100%', 
                              background: '#002B5C', 
                              color: 'white', 
                              border: 'none', 
                              padding: '12px', 
                              borderRadius: '6px', 
                              marginTop: '20px',
                              fontWeight: 'bold',
                              cursor: 'pointer'
                          }}
                      >
                          TAKE ACTION NOW
                      </button>
                  )}
              </div>
              
              <div style={{ background: '#f5f5f5', padding: '10px 15px', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                  <span>A/c: ****{alert.accountEnding}</span>
                  <span>{alert.timestamp}</span>
              </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button onClick={onDiscover} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: 'white', padding: '8px 20px', borderRadius: '4px', fontSize: '0.9rem' }}>
                  Investigate Alert 🔍
              </button>
          </div>
          
      </div>
    </div>
  );
}
