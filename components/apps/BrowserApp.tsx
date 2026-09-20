import React from 'react';

interface BrowserAppProps {
  scenario: any;
  onDiscover: () => void;
}

export default function BrowserApp({ scenario, onDiscover }: BrowserAppProps) {
  if (!scenario?.browserUrl) return null;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f0f0f0', color: '#000' }}>
      
      {/* Browser Chrome */}
      <div style={{ background: '#fff', padding: '10px', display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
          <div style={{ display: 'flex', gap: '5px', color: '#666' }}>
              <span>◀</span>
              <span>▶</span>
              <span>↻</span>
          </div>
          
          <div 
              onClick={onDiscover}
              style={{ 
                  flex: 1, 
                  background: '#f1f3f4', 
                  padding: '8px 15px', 
                  borderRadius: '20px', 
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: '1px solid transparent'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--red-primary)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
              <span style={{ color: '#4CAF50' }}>🔒</span>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {scenario.browserUrl}
              </span>
          </div>
          
          <div style={{ color: '#666' }}>
              <span>⋮</span>
          </div>
      </div>

      {/* Page Content Simulation */}
      <div style={{ flex: 1, background: '#fff', overflowY: 'auto' }}>
          {/* We'll render the ASCII/text representation of the site centered */}
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
             <pre style={{ 
                 fontFamily: 'monospace', 
                 fontSize: '0.7rem', 
                 whiteSpace: 'pre-wrap', 
                 wordBreak: 'break-all',
                 background: '#f8f9fa',
                 padding: '10px',
                 border: '1px solid #dee2e6',
                 borderRadius: '4px'
             }}>
                 {scenario.browserContent}
             </pre>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '10px', padding: '20px' }}>
              <button onClick={onDiscover} style={{ background: 'transparent', border: '1px solid var(--red-primary)', color: 'var(--red-primary)', padding: '8px 20px', borderRadius: '4px', fontSize: '0.9rem' }}>
                  Analyze Page Elements 🔍
              </button>
          </div>
      </div>

    </div>
  );
}
