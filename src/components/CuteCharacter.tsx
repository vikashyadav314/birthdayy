import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CuteCharacterProps {
  state: 'idle' | 'jumping' | 'waving' | 'hugging' | 'hidden';
  size?: number;
}

export const CuteCharacter: React.FC<CuteCharacterProps> = ({ state, size = 140 }) => {
  const [blink, setBlink]     = useState(false);
  const [tilt, setTilt]       = useState(false);

  // Periodic blink
  useEffect(() => {
    if (state === 'hidden') return;
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3500 + Math.random() * 1500);
    return () => clearInterval(blinkInterval);
  }, [state]);

  // Periodic head tilt
  useEffect(() => {
    if (state !== 'idle' && state !== 'waving') return;
    const tiltInterval = setInterval(() => {
      setTilt(true);
      setTimeout(() => setTilt(false), 600);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(tiltInterval);
  }, [state]);

  if (state === 'hidden') return null;

  const s = size;

  // Proportions
  const bodyW  = s * 0.62;
  const bodyH  = s * 0.52;
  const headW  = s * 0.55;
  const headH  = s * 0.5;
  const earW   = s * 0.14;
  const earH   = s * 0.24;

  return (
    <motion.div
      style={{
        width: s,
        height: s,
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      animate={
        state === 'jumping'
          ? { y: [0, -20, 0, -10, 0] }
          : state === 'waving'
          ? { rotate: [0, -3, 3, -3, 0] }
          : state === 'hugging'
          ? { scale: [1, 1.08, 1] }
          : { y: [0, -4, 0] }
      }
      transition={
        state === 'jumping'
          ? { duration: 0.7, ease: 'easeInOut' }
          : state === 'idle'
          ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.5 }
      }
    >
      {/* SVG Character — Chubby Bunny */}
      <svg
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
        aria-label="Cute birthday bunny character"
        role="img"
      >
        {/* ── Shadow ── */}
        <ellipse
          cx={s / 2} cy={s - 4}
          rx={bodyW * 0.45} ry={6}
          fill="rgba(85,59,97,0.12)"
        />

        {/* ── Body ── */}
        <ellipse
          cx={s / 2}
          cy={s * 0.72}
          rx={bodyW / 2}
          ry={bodyH / 2}
          fill="#FFE4F0"
          style={{
            animation: state === 'idle' ? 'breathe 2.5s ease-in-out infinite' : undefined,
            transformOrigin: `${s / 2}px ${s * 0.72}px`,
          }}
        />
        {/* Body gradient sheen */}
        <ellipse
          cx={s / 2 - s * 0.06}
          cy={s * 0.62}
          rx={bodyW * 0.28}
          ry={bodyH * 0.28}
          fill="rgba(255,255,255,0.45)"
        />

        {/* ── Tummy ── */}
        <ellipse
          cx={s / 2}
          cy={s * 0.76}
          rx={bodyW * 0.28}
          ry={bodyH * 0.3}
          fill="#FFC9D8"
          opacity={0.6}
        />

        {/* ── Ears ── */}
        {/* Left ear */}
        <motion.g
          animate={tilt ? { rotate: -8 } : { rotate: 0 }}
          style={{ transformOrigin: `${s * 0.36}px ${s * 0.38}px` }}
          transition={{ duration: 0.4 }}
        >
          <ellipse cx={s * 0.36} cy={s * 0.21} rx={earW / 2} ry={earH / 2}
            fill="#FFD6E7" />
          <ellipse cx={s * 0.36} cy={s * 0.21} rx={earW * 0.4} ry={earH * 0.55}
            fill="#FFB0C8" opacity={0.7}/>
        </motion.g>
        {/* Right ear */}
        <motion.g
          animate={tilt ? { rotate: 8 } : { rotate: 0 }}
          style={{ transformOrigin: `${s * 0.64}px ${s * 0.38}px` }}
          transition={{ duration: 0.4 }}
        >
          <ellipse cx={s * 0.64} cy={s * 0.21} rx={earW / 2} ry={earH / 2}
            fill="#FFD6E7" />
          <ellipse cx={s * 0.64} cy={s * 0.21} rx={earW * 0.4} ry={earH * 0.55}
            fill="#FFB0C8" opacity={0.7}/>
        </motion.g>

        {/* ── Head ── */}
        <motion.g
          animate={tilt ? { rotate: -6 } : { rotate: 0 }}
          style={{ transformOrigin: `${s / 2}px ${s * 0.47}px` }}
          transition={{ duration: 0.4 }}
        >
          {/* Head circle */}
          <ellipse
            cx={s / 2} cy={s * 0.47}
            rx={headW / 2} ry={headH / 2}
            fill="#FFE4F0"
          />
          {/* Head sheen */}
          <ellipse
            cx={s / 2 - s * 0.06} cy={s * 0.40}
            rx={headW * 0.22} ry={headH * 0.18}
            fill="rgba(255,255,255,0.55)"
          />

          {/* ── Eyes ── */}
          {/* Left eye white */}
          <ellipse cx={s * 0.39} cy={s * 0.44} rx={s * 0.07} ry={s * 0.085}
            fill="white" />
          {/* Right eye white */}
          <ellipse cx={s * 0.61} cy={s * 0.44} rx={s * 0.07} ry={s * 0.085}
            fill="white" />
          {/* Left pupil */}
          <ellipse cx={s * 0.40} cy={s * 0.45} rx={s * 0.038} ry={blink ? s * 0.005 : s * 0.048}
            fill="#553B61"
            style={{ transition: 'ry 0.1s' }}
          />
          {/* Right pupil */}
          <ellipse cx={s * 0.62} cy={s * 0.45} rx={s * 0.038} ry={blink ? s * 0.005 : s * 0.048}
            fill="#553B61"
            style={{ transition: 'ry 0.1s' }}
          />
          {/* Eye sparkles */}
          <circle cx={s * 0.41} cy={s * 0.432} r={s * 0.012} fill="white" />
          <circle cx={s * 0.63} cy={s * 0.432} r={s * 0.012} fill="white" />

          {/* ── Rosy cheeks ── */}
          <ellipse cx={s * 0.29} cy={s * 0.50} rx={s * 0.07} ry={s * 0.04}
            fill="#FFB0C8" opacity={0.5} />
          <ellipse cx={s * 0.71} cy={s * 0.50} rx={s * 0.07} ry={s * 0.04}
            fill="#FFB0C8" opacity={0.5} />

          {/* ── Tiny nose ── */}
          <ellipse cx={s / 2} cy={s * 0.515} rx={s * 0.022} ry={s * 0.016}
            fill="#FF9EC4" />

          {/* ── Smile ── */}
          <path
            d={`M ${s * 0.44} ${s * 0.535} Q ${s * 0.5} ${s * 0.57} ${s * 0.56} ${s * 0.535}`}
            stroke="#FF9EC4"
            strokeWidth={s * 0.018}
            strokeLinecap="round"
            fill="none"
          />

          {/* ── Bow on head ── */}
          <g transform={`translate(${s * 0.68}, ${s * 0.29})`}>
            <ellipse cx={-s * 0.06} cy={0} rx={s * 0.055} ry={s * 0.032} fill="#FF9EC4" />
            <ellipse cx={s * 0.06}  cy={0} rx={s * 0.055} ry={s * 0.032} fill="#FF9EC4" />
            <circle  cx={0} cy={0} r={s * 0.022} fill="#FFD6E7" />
            <ellipse cx={-s * 0.05} cy={0} rx={s * 0.03} ry={s * 0.018} fill="rgba(255,255,255,0.4)" />
          </g>
        </motion.g>

        {/* ── Arms ── */}
        {/* Left arm */}
        <motion.g
          style={{ transformOrigin: `${s * 0.27}px ${s * 0.66}px` }}
          animate={
            state === 'waving'
              ? { rotate: [-5, -30, -5] }
              : state === 'hugging'
              ? { rotate: [0, 25, 0] }
              : { rotate: [0, -8, 0] }
          }
          transition={
            state === 'idle'
              ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.5, repeat: state === 'waving' ? Infinity : 0 }
          }
        >
          <ellipse cx={s * 0.22} cy={s * 0.68} rx={s * 0.08} ry={s * 0.06}
            fill="#FFD6E7" />
        </motion.g>
        {/* Right arm */}
        <motion.g
          style={{ transformOrigin: `${s * 0.73}px ${s * 0.66}px` }}
          animate={
            state === 'hugging'
              ? { rotate: [0, -25, 0] }
              : { rotate: [0, 8, 0] }
          }
          transition={
            state === 'idle'
              ? { duration: 3.3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }
              : { duration: 0.5 }
          }
        >
          <ellipse cx={s * 0.78} cy={s * 0.68} rx={s * 0.08} ry={s * 0.06}
            fill="#FFD6E7" />
        </motion.g>

        {/* ── Feet ── */}
        <ellipse cx={s * 0.39} cy={s * 0.91} rx={s * 0.1} ry={s * 0.06}
          fill="#FFD6E7" />
        <ellipse cx={s * 0.61} cy={s * 0.91} rx={s * 0.1} ry={s * 0.06}
          fill="#FFD6E7" />
        {/* Foot pads */}
        <ellipse cx={s * 0.39} cy={s * 0.92} rx={s * 0.05} ry={s * 0.03}
          fill="#FFB0C8" opacity={0.6} />
        <ellipse cx={s * 0.61} cy={s * 0.92} rx={s * 0.05} ry={s * 0.03}
          fill="#FFB0C8" opacity={0.6} />

        {/* ── Tail ── */}
        <circle cx={s * 0.79} cy={s * 0.75} r={s * 0.055}
          fill="white" opacity={0.85} />
      </svg>
    </motion.div>
  );
};

/* ── Speech Bubble ───────────────────────────────────────── */
interface SpeechBubbleProps {
  lines: string[];
  followUp?: string;
  visible: boolean;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ lines, followUp, visible }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [showFollowUp, setShowFollowUp]     = useState(false);

  useEffect(() => {
    if (!visible) {
      setDisplayedLines([]);
      setShowFollowUp(false);
      return;
    }

    let lineIdx = 0;
    const showNext = () => {
      if (lineIdx < lines.length) {
        const idx = lineIdx;
        lineIdx++;
        setDisplayedLines(prev => [...prev, lines[idx]]);
        setTimeout(showNext, 700 + lines[idx]?.length * 18);
      } else if (followUp) {
        setTimeout(() => setShowFollowUp(true), 500);
      }
    };
    const t = setTimeout(showNext, 300);
    return () => clearTimeout(t);
  }, [visible, lines, followUp]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        border: '2px solid rgba(255,158,196,0.5)',
        borderRadius: 24,
        padding: '18px 24px',
        maxWidth: 340,
        position: 'relative',
        boxShadow: '0 4px 24px rgba(255,158,196,0.25)',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Triangle pointer */}
      <div style={{
        position: 'absolute',
        bottom: -16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent',
        borderTop: '16px solid rgba(255,255,255,0.92)',
        filter: 'drop-shadow(0 2px 3px rgba(255,158,196,0.2))',
      }} />

      {displayedLines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            margin: i === 0 ? 0 : '6px 0 0',
            fontSize: i === 0 ? '1.05rem' : '0.95rem',
            fontWeight: i === 0 ? 800 : 600,
            color: 'var(--plum)',
            lineHeight: 1.5,
          }}
        >
          {line}
        </motion.p>
      ))}

      {showFollowUp && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            marginTop: 10,
            fontSize: '0.88rem',
            fontWeight: 600,
            color: 'var(--plum-light)',
            lineHeight: 1.5,
          }}
        >
          {followUp}
        </motion.p>
      )}
    </motion.div>
  );
};
