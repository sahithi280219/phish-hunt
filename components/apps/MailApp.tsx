import React from 'react';

interface MailAppProps {
  scenario: any;
  onDiscover: () => void;
}

export default function MailApp({ scenario, onDiscover }: MailAppProps) {
  if (!scenario?.email) return null;
  const email = scenario.email;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff', color: '#000' }}>
      
      {/* Header */}
      <div style={{ background: '#d32f2f', color: 'white', padding: '15px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>☰</span>
          <span>Inbox</span>
      </div>

      {/* Email Meta */}
      <div style={{ padding: '20px 20px 10px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '500' }}>{email.subject}</h2>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1976d2', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {email.from.charAt(0)}
              </div>
              
              <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 'bold' }}>{email.from}</span>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>{email.date.split(',')[0]}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.85rem', color: '#666', marginTop: '2px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          to me <span>▾</span>
                      </span>
                  </div>
              </div>
          </div>
          
          {/* Expanded sender details (investigation tool) */}
          <div style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }} onClick={onDiscover}>
              <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '5px' }}>
                  <span style={{ color: '#666' }}>From:</span>
                  <span style={{ color: 'var(--red-dark)', fontWeight: 'bold' }}>{email.from} &lt;{email.fromEmail}&gt;</span>
                  
                  {email.replyTo && (
                      <>
                          <span style={{ color: '#666' }}>Reply-To:</span>
                          <span style={{ color: 'var(--red-dark)', fontWeight: 'bold' }}>{email.replyTo}</span>
                      </>
                  )}
                  
                  <span style={{ color: '#666' }}>Date:</span>
                  <span>{email.date}</span>
              </div>
              <div style={{ textAlign: 'center', marginTop: '5px', color: 'var(--red-primary)' }}>Tap to analyze headers 🔍</div>
          </div>
      </div>
      
      {/* Warning Banner */}
      {email.hasWarning && (
          <div style={{ background: '#fff3cd', color: '#856404', padding: '10px 20px', fontSize: '0.85rem', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span>⚠️</span>
              <div>Be careful with this message. Similar messages were used to steal people's personal information.</div>
          </div>
      )}

      {/* Body */}
      <div style={{ padding: '20px', flex: 1, overflowY: 'auto', fontSize: '0.95rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
          {email.body}
          
          {/* Attachments */}
          {email.attachments && email.attachments.length > 0 && (
              <div style={{ marginTop: '30px', borderTop: '1px solid #e0e0e0', paddingTop: '15px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>{email.attachments.length} Attachments</div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {email.attachments.map((att: string, idx: number) => (
                          <div key={idx} onClick={onDiscover} style={{ 
                              padding: '10px', 
                              border: '1px solid #ccc', 
                              borderRadius: '4px', 
                              fontSize: '0.85rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              background: '#f8f9fa'
                          }}>
                              <span style={{ color: 'var(--red-primary)' }}>📎</span>
                              {att}
                          </div>
                      ))}
                  </div>
              </div>
          )}
      </div>

    </div>
  );
}
