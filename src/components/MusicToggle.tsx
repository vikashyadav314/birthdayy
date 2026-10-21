import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Music Toggle ───────────────────────────────────────── */
export const MusicToggle: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodes    = useRef<OscillatorNode[]>([]);
  const gainNode    = useRef<GainNode | null>(null);

  const startMusic = useCallback(() => {
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.12, ctx.currentTime);
      master.connect(ctx.destination);
      gainNode.current = master;

      // Simple birthday melody frequencies (Happy Birthday in C)
      const notes = [
        264, 264, 297, 264, 352, 330,
        264, 264, 297, 264, 396, 352,
        264, 264, 528, 440, 352, 330, 297,
        470, 470, 440, 352, 396, 352,
      ];
      const durations = [
        0.3,0.1,0.4,0.4,0.4,0.8,
        0.3,0.1,0.4,0.4,0.4,0.8,
        0.3,0.1,0.4,0.4,0.4,0.4,0.8,
        0.3,0.1,0.4,0.4,0.4,0.8,
      ];

      let t = ctx.currentTime + 0.1;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        env.gain.setValueAtTime(0, t);
        env.gain.linearRampToValueAtTime(0.6, t + 0.04);
        env.gain.linearRampToValueAtTime(0.4, t + durations[i] * 0.7);
        env.gain.linearRampToValueAtTime(0, t + durations[i]);
        osc.connect(env);
        env.connect(master);
        osc.start(t);
        osc.stop(t + durations[i]);
        t += durations[i];
        oscNodes.current.push(osc);
      });

      // Loop after full melody plays
      setTimeout(() => {
        if (audioCtxRef.current) {
          stopMusic();
          startMusic();
        }
      }, (t - ctx.currentTime + 0.5) * 1000);

    } catch {
      setAvailable(false);
    }
  }, []);

  const stopMusic = useCallback(() => {
    oscNodes.current.forEach(o => { try { o.stop(); } catch {} });
    oscNodes.current = [];
    try { audioCtxRef.current?.close(); } catch {}
    audioCtxRef.current = null;
  }, []);

  const toggle = () => {
    if (!available) return;
    if (playing) {
      stopMusic();
      setPlaying(false);
    } else {
      startMusic();
      setPlaying(true);
    }
  };

  if (!available) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggle}
      aria-label={playing ? 'Pause background music' : 'Play birthday music'}
      title={playing ? 'Pause music' : 'Play birthday music 🎵'}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid rgba(255,158,196,0.5)',
        boxShadow: '0 4px 16px rgba(255,158,196,0.25)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
      }}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.span key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            🔇
          </motion.span>
        ) : (
          <motion.span key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            🎵
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

/* ── Secret Star Easter Egg ─────────────────────────────── */
export const SecretStar: React.FC = () => {
  const [activated, setActivated] = useState(false);
  const [message, setMessage]     = useState('');

  const messages = [
    'You found a secret star! ⭐ Ann is magical!',
    '🐱 Important cat-face research: STILL PENDING',
    'Secret unlocked: Sending 847 virtual cupcakes 🧁💗',
    '✨ Which animal are you this month, Ann?! 😂',
    '🔬 The Month-Character Research Lab approves of you',
    '💗 Happy Birthday, Ann! You found the secret star!',
  ];

  const trigger = () => {
    if (activated) return;
    setActivated(true);
    const idx = Math.floor(Math.random() * messages.length);
    setMessage(messages[idx]);
    setTimeout(() => { setActivated(false); setMessage(''); }, 3000);
  };

  return (
    <>
      <motion.button
        onClick={trigger}
        aria-label="A secret star (Easter egg)"
        title="✨"
        whileHover={{ scale: 1.4, rotate: 20 }}
        whileTap={{ scale: 0.8 }}
        animate={{ opacity: [0.15, 0.4, 0.15], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 22,
          right: 22,
          zIndex: 1000,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 18,
          padding: 4,
        }}
      >
        ⭐
      </motion.button>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            style={{
              position: 'fixed',
              top: 60,
              right: 16,
              zIndex: 1001,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255,158,196,0.5)',
              borderRadius: 16,
              padding: '10px 16px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--plum)',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 20px rgba(255,158,196,0.25)',
              maxWidth: 220,
              textAlign: 'center',
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
