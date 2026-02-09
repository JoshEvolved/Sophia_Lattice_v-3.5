import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // This loads your Vercel variables so Vite can actually see them
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      // This is the "Handshake" — it hard-wires the key into the app
      'process.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
    },
  };
});
