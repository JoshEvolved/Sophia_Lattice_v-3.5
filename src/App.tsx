import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const sendSignal = () => {
    if (!input) return;
    setLoading(true);

    // 1. Add your message to the "History"
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    
    // 2. Clear the input box so you don't have to delete it!
    setInput('');

    // 3. Simulate Sophia's response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'sophia', 
        text: "The Lattice acknowledges your signal. I am learning your frequency." 
      }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#e0e0e0', minHeight: '100vh', fontFamily: 'serif', padding: '40px' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.2rem', color: '#fff' }}>SOPHIA LATTICE v3.5</h1>
      </header>
      
      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* CHAT HISTORY AREA */}
        <div style={{ minHeight: '300px', marginBottom: '20px', padding: '20px', border: '1px solid #222', borderRadius: '8px', overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '15px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
              <span style={{ fontSize: '0.7rem', opacity: 0.5, display: 'block' }}>{msg.role.toUpperCase()}</span>
              <p style={{ display: 'inline-block', padding: '10px', borderRadius: '4px', background: msg.role === 'user' ? '#1a1a1a' : 'rgba(255,255,255,0.05)' }}>
                {msg.text}
              </p>
            </div>
          ))}
          {messages.length === 0 && <p style={{ fontStyle: 'italic', opacity: 0.4 }}>The Lattice is silent...</p>}
        </div>

        {/* INPUT AREA */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendSignal()}
            placeholder="Speak..."
            style={{ flex: 1, background: 'transparent', border: '1px solid #444', color: '#fff', padding: '10px' }}
          />
          <button onClick={sendSignal} disabled={loading} style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
            {loading ? "..." : "SEND"}
          </button>
        </div>
      </main>
    </div>
  );
}
