import React, { useState } from 'react';

interface AnswerInputProps {
  question: string;
  onSubmit: (answer: string) => void;
}

export default function AnswerInput({ question, onSubmit }: AnswerInputProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '10px', lineHeight: '1.4' }}>
          <strong>Q:</strong> {question}
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter keyword (e.g., fake domain)" 
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid #444',
            color: '#fff',
            padding: '10px',
            borderRadius: '4px',
            outline: 'none',
            fontSize: '0.9rem'
          }}
        />
        <button 
          type="submit"
          disabled={!answer.trim()}
          style={{
            background: 'var(--red-primary)',
            color: '#000',
            border: 'none',
            padding: '0 15px',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: answer.trim() ? 'pointer' : 'not-allowed',
            opacity: answer.trim() ? 1 : 0.5
          }}
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
}
