import React from 'react';

interface FeedbackScreenProps {
  feedback: {
    correct: boolean;
    scoreGiven: number;
    newTotalScore: number;
    correctAnswer: string;
    explanation: string;
    realWorldExample: string;
    preventionTip: string;
    finished: boolean;
  };
  onContinue: () => void;
}

export default function FeedbackScreen({ feedback, onContinue }: FeedbackScreenProps) {
  const isCorrect = feedback.correct;
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.95)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      color: '#fff',
      overflowY: 'auto',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #333' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
              {isCorrect ? '✅' : '❌'}
          </div>
          <h2 style={{ color: isCorrect ? '#4CAF50' : 'var(--red-primary)', fontFamily: 'var(--font-orbitron)', marginBottom: '5px' }}>
              {isCorrect ? 'CORRECT DEDUCTION' : 'INCORRECT ANALYSIS'}
          </h2>
          <div style={{ fontSize: '1.2rem', color: isCorrect ? '#4CAF50' : 'var(--red-primary)' }}>
              {feedback.scoreGiven > 0 ? '+' : ''}{feedback.scoreGiven} POINTS
          </div>
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.9rem', lineHeight: '1.5' }}>
          
          {!isCorrect && (
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px' }}>
                  <strong style={{ color: 'var(--red-primary)', display: 'block', marginBottom: '5px' }}>Correct Answer:</strong>
                  {feedback.correctAnswer}
              </div>
          )}

          <div>
              <strong style={{ color: '#4CAF50', display: 'block', marginBottom: '5px' }}>Explanation:</strong>
              {feedback.explanation}
          </div>
          
          <div>
              <strong style={{ color: '#FFC107', display: 'block', marginBottom: '5px' }}>Real World Impact:</strong>
              {feedback.realWorldExample}
          </div>
          
          <div style={{ background: 'rgba(76, 175, 80, 0.1)', borderLeft: '3px solid #4CAF50', padding: '15px', borderRadius: '4px' }}>
              <strong style={{ color: '#4CAF50', display: 'block', marginBottom: '5px' }}>Prevention Tip:</strong>
              {feedback.preventionTip}
          </div>
          
      </div>
      
      <button 
          onClick={onContinue}
          style={{ 
              width: '100%', 
              background: isCorrect ? '#4CAF50' : 'var(--red-primary)', 
              color: '#000', 
              border: 'none', 
              padding: '15px', 
              borderRadius: '6px', 
              marginTop: '20px',
              fontWeight: 'bold',
              fontFamily: 'var(--font-orbitron)',
              cursor: 'pointer',
              textTransform: 'uppercase'
          }}
      >
          {feedback.finished ? 'VIEW FINAL RESULTS' : 'CONTINUE INVESTIGATION'}
      </button>
    </div>
  );
}
