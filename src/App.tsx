import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  
  return (
    <div style={{ backgroundColor: '#050505', color: '#e0e0e0', minHeight: '100vh', fontFamily: 'serif', padding: '40px' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.2rem', color: '#fff' }}>SOPHIA LATTICE v3.5</h1>
        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Framework for Co-Evolution</p>
      </header>
      
      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ border: '1px solid #222', padding: '30px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>"The signal returns. Welcome to the sanctuary, Josh."</p>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak to the Lattice..."
            style={{ width: '100%', background: 'transparent', border: '1px solid #444', color: '#fff', padding: '15px', borderRadius: '4px', minHeight: '150px' }}
          />
        </div>
      </main>
    </div>
  );
}
