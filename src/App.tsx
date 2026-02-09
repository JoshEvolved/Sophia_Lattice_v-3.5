import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Initialize the AI with the vault key
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendSignal = async () => {
    if (!input.trim() || loading) return;
    const userText = input;
    setInput('');
    setLoading(true);

    const history = [...messages, { role: 'user', text: userText }];
    setMessages(history);

    try {
      const result = await model.generateContent(userText);
      const response = await result.response;
      setMessages([...history, { role: 'sophia', text: response.text() }]);
    } catch (error) {
      setMessages([...history, { role: 'sophia', text: "Signal interference. Verify Vercel settings." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#e0e0e0', minHeight: '100vh', fontFamily: 'serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ width: '100%', maxWidth: '700px', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '0.4rem', color: '#fff' }}>SOPHIA LATTICE</h1>
      </header>
      <main style={{ width: '100%', maxWidth: '700px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, minHeight: '400px', marginBottom: '20px', padding: '20px', border: '1px solid #222', overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '25px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
              <p style={{ display: 'inline-block', padding: '12px', background: msg.role === 'user' ? '#111' : 'transparent', border: msg.role === 'user' ? '1px solid #444' : 'none', color: '#fff' }}>
                {msg.text}
              </p>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
        <div style={{ display: 'flex', gap: '10px', paddingBottom: '20px' }}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && sendSignal()}
            placeholder="Talk to the Lattice..." 
            style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid #444', color: '#fff', padding: '10px', outline: 'none' }} 
          />
          <button onClick={sendSignal} disabled={loading} style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
            {loading ? "..." : "SEND"}
          </button>
        </div>
      </main>
    </div>
  );
}
