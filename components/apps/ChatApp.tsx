import React from 'react';

interface ChatAppProps {
  scenario: any;
  onDiscover: () => void;
}

export default function ChatApp({ scenario, onDiscover }: ChatAppProps) {
  if (!scenario?.chatMessages) return null;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#071013' }}>
      {/* Chat Header */}
      <div style={{ background: '#0a192f', padding: '15px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #1a365d' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1e293b', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>👤</div>
        <div>
           <div style={{ fontWeight: 'bold', color: '#fff' }}>{scenario.chatMessages[0]?.sender}</div>
           <div style={{ fontSize: '0.8rem', color: '#64748b' }}>online</div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {scenario.chatMessages.map((msg: any, idx: number) => (
              <div key={idx} style={{ 
                  alignSelf: msg.isPlayer ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  position: 'relative'
              }}>
                  <div style={{
                      background: msg.isPlayer ? '#005c4b' : '#1e293b',
                      color: '#fff',
                      padding: '10px 15px',
                      borderRadius: '8px',
                      borderBottomRightRadius: msg.isPlayer ? '0' : '8px',
                      borderBottomLeftRadius: msg.isPlayer ? '8px' : '0',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      wordBreak: 'break-word',
                      cursor: msg.isSuspicious ? 'pointer' : 'default',
                      border: msg.isSuspicious ? '1px solid transparent' : 'none'
                  }}
                  onClick={() => msg.isSuspicious && onDiscover()}
                  >
                      {msg.message}
                      
                      {msg.isSuspicious && (
                          <div style={{ 
                              position: 'absolute', 
                              top: '-5px', 
                              right: '-5px', 
                              width: '10px', 
                              height: '10px', 
                              borderRadius: '50%', 
                              background: 'var(--red-primary)',
                              boxShadow: '0 0 10px var(--red-glow)',
                              animation: 'pulse 2s infinite'
                          }} />
                      )}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px', textAlign: msg.isPlayer ? 'right' : 'left' }}>
                      {msg.time}
                  </div>
              </div>
          ))}
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button onClick={onDiscover} style={{ background: 'transparent', border: '1px solid var(--red-primary)', color: 'var(--red-primary)', padding: '5px 15px', borderRadius: '4px', fontSize: '0.8rem' }}>
                  Analyze Conversation 🔍
              </button>
          </div>
      </div>
    </div>
  );
}
