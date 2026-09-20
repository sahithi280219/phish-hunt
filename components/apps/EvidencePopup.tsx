import React from 'react';

interface EvidencePopupProps {
  evidence: {
    title: string;
    description: string;
    whyItMatters: string;
  };
  onContinue: () => void;
}

export default function EvidencePopup({ evidence, onContinue }: EvidencePopupProps) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      color: '#fff',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      
      <div style={{
        background: '#0a0a0a',
        border: '1px solid var(--red-primary)',
        borderRadius: '12px',
        padding: '25px',
        width: '100%',
        boxShadow: '0 0 20px rgba(255,0,51,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--red-primary)' }}>⚠️</span>
            <h3 style={{ margin: 0, color: 'var(--red-primary)', fontFamily: 'var(--font-orbitron)' }}>EVIDENCE FOUND</h3>
        </div>
        
        <h4 style={{ marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>{evidence.title}</h4>
        
        <div style={{ marginBottom: '20px', fontSize: '0.9rem', lineHeight: '1.5' }}>
            {evidence.description}
        </div>
        
        <div style={{ background: 'rgba(255,0,51,0.1)', padding: '15px', borderRadius: '8px', fontSize: '0.85rem', lineHeight: '1.5', borderLeft: '3px solid var(--red-primary)' }}>
            <strong style={{ color: 'var(--red-primary)', display: 'block', marginBottom: '5px' }}>Why This Matters:</strong>
            {evidence.whyItMatters}
        </div>
        
        <button 
            onClick={onContinue}
            style={{ 
                width: '100%', 
                background: 'var(--red-primary)', 
                color: '#000', 
                border: 'none', 
                padding: '12px', 
                borderRadius: '6px', 
                marginTop: '25px',
                fontWeight: 'bold',
                fontFamily: 'var(--font-orbitron)',
                cursor: 'pointer'
            }}
        >
            CONTINUE INVESTIGATION
        </button>
      </div>
    </div>
  );
}
