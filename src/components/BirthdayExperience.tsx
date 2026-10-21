import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingDecorations, ConfettiEffect, MiniHeartBurst } from './FloatingDecorations';
import { CuteCharacter } from './CuteCharacter';
import { AnimatedGiftBox } from './AnimatedGiftBox';
import { MemoryCard } from './MemoryCard';
import { MonthCharacterLab } from './MonthCharacterLab';
import { config } from '../config';

type Screen = 'welcome' | 'celebration' | 'letter' | 'gift' | 'final';

/* ── Page transition ─────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, scale: 0.96, filter: 'blur(12px)' },
  animate: { opacity: 1, scale: 1,    filter: 'blur(0px)'  },
  exit:    { opacity: 0, scale: 1.04, filter: 'blur(16px)' },
};
const pageTransition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

/* ══════════════════════════════════════════════════════════
   SCREEN 1 — Welcome
   ══════════════════════════════════════════════════════════ */
const WelcomeScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [burst,   setBurst]   = useState<{ x: number; y: number } | null>(null);
  const [clicked, setClicked] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (clicked) return;
    setClicked(true);
    setBurst({ x: e.clientX, y: e.clientY });
    setTimeout(onNext, 900);
  };

  return (
    <div className="screen bg-dreamy center-col" style={{ position: 'relative', minHeight: '100dvh' }}>
      <FloatingDecorations variant="medium" />
      {burst && <MiniHeartBurst x={burst.x} y={burst.y} onDone={() => setBurst(null)} />}

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 24, padding: '40px 24px', maxWidth: 540, width: '100%', textAlign: 'center',
      }}>
        {/* Envelope + peeking bunny */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'relative', width: 160, height: 120, display: 'flex', justifyContent: 'center' }}
        >
          <div aria-hidden="true" style={{ position: 'absolute', right: 0, top: 8, width: 90, height: 55, borderRadius: '50% 50% 40% 40%', background: 'rgba(255,255,255,0.82)', boxShadow: '0 4px 20px rgba(255,158,196,0.15)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', right: 10, top: -2, width: 55, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.82)' }} />

          <motion.div aria-hidden="true"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{ position: 'absolute', right: 12, top: -10, zIndex: 2 }}
          >
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-label="Peeking bunny">
              <ellipse cx="17" cy="13" rx="6" ry="12" fill="#FFD6E7"/>
              <ellipse cx="17" cy="13" rx="3.5" ry="8" fill="#FFB0C8" opacity="0.7"/>
              <ellipse cx="37" cy="13" rx="6" ry="12" fill="#FFD6E7"/>
              <ellipse cx="37" cy="13" rx="3.5" ry="8" fill="#FFB0C8" opacity="0.7"/>
              <ellipse cx="27" cy="36" rx="18" ry="15" fill="#FFE4F0"/>
              <ellipse cx="21" cy="33" rx="5.5" ry="6.5" fill="white"/>
              <ellipse cx="33" cy="33" rx="5.5" ry="6.5" fill="white"/>
              <circle cx="22" cy="34" r="3.2" fill="#553B61"/>
              <circle cx="34" cy="34" r="3.2" fill="#553B61"/>
              <circle cx="23" cy="32.5" r="1.2" fill="white"/>
              <circle cx="35" cy="32.5" r="1.2" fill="white"/>
              <ellipse cx="21" cy="36" rx="5" ry="3" fill="#FFB0C8" opacity="0.4"/>
              <ellipse cx="33" cy="36" rx="5" ry="3" fill="#FFB0C8" opacity="0.4"/>
              <ellipse cx="27" cy="40" rx="2.2" ry="1.6" fill="#FF9EC4"/>
              <path d="M23 42 Q27 45.5 31 42" stroke="#FF9EC4" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            </svg>
          </motion.div>

          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: 0, top: 22 }}
          >
            <svg width="95" height="72" viewBox="0 0 95 72" fill="none" aria-label="Birthday invitation envelope">
              <defs>
                <linearGradient id="envG" x1="0" y1="0" x2="95" y2="72" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFD6E7"/><stop offset="1" stopColor="#DCD6FF"/>
                </linearGradient>
              </defs>
              <rect x="2" y="10" width="91" height="60" rx="10" fill="url(#envG)" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
              <path d="M2 18 L47.5 46 L93 18" stroke="rgba(255,158,196,0.55)" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M2 70 L32 46" stroke="rgba(255,158,196,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M93 70 L63 46" stroke="rgba(255,158,196,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <text x="38" y="36" fontSize="20">💌</text>
            </svg>
          </motion.div>
        </motion.div>

        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--plum)', lineHeight: 1.2, margin: 0 }}
        >
          Hey, <span className="gradient-text">{config.bestFriendName}...</span> 💗
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {config.welcomeLines.map((line, i) => (
            <motion.p key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.18, duration: 0.5 }}
              style={{
                fontSize: i === 0 ? '1.1rem' : '0.95rem',
                fontWeight: i === 0 ? 700 : 600,
                color: i === 2 ? 'var(--plum)' : 'var(--plum-light)',
                margin: 0, lineHeight: 1.6,
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 260, damping: 18 }}
        >
          <button
            className="btn-primary"
            onClick={handleOpen}
            disabled={clicked}
            style={{ fontSize: '1.05rem', padding: '16px 36px' }}
            aria-label="Open your birthday surprise"
          >
            Open Your Surprise ✨
          </button>
        </motion.div>

        <motion.p
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ fontSize: '0.82rem', color: 'var(--plum-light)', margin: 0 }}
        >
          ✨ Something magical awaits ✨
        </motion.p>
      </div>
    </div>
  );
};

/* ── Birthday Cake SVG ───────────────────────────────────── */
const BirthdayCakeSVG: React.FC<{ candlesOut: boolean; onCandleClick: () => void }> = ({ candlesOut, onCandleClick }) => (
  <svg viewBox="0 0 220 200" width="min(220px, 85vw)" height="auto"
    xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Birthday cake — click candles to blow them out"
    style={{ cursor: 'pointer', filter: 'drop-shadow(0 8px 24px rgba(255,158,196,0.28))', display: 'block' }}
    onClick={onCandleClick}
  >
    <defs>
      <linearGradient id="ck1" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FFD6E7"/><stop offset="1" stopColor="#FFAED8"/></linearGradient>
      <linearGradient id="ck2" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#EDE4FF"/><stop offset="1" stopColor="#C8BFFF"/></linearGradient>
      <linearGradient id="frost" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FFFFFF"/><stop offset="1" stopColor="#FFE4F0"/></linearGradient>
    </defs>
    <ellipse cx="110" cy="190" rx="92" ry="10" fill="rgba(220,214,255,0.45)"/>
    <rect x="18" y="126" width="184" height="60" rx="12" fill="url(#ck1)"/>
    {[35,62,90,118,148,175].map((x,i) => <ellipse key={i} cx={x} cy={126} rx={11} ry={6} fill="url(#frost)" opacity={0.9}/>)}
    <text x="45" y="165" fontSize="22">💗</text><text x="95" y="165" fontSize="22">🎉</text><text x="145" y="165" fontSize="22">💕</text>
    <rect x="38" y="84" width="144" height="46" rx="12" fill="url(#ck2)"/>
    {[55,84,112,142,162].map((x,i) => <ellipse key={i} cx={x} cy={84} rx={10} ry={5.5} fill="url(#frost)" opacity={0.9}/>)}
    <text x="78" y="116" fontSize="16">✨</text><text x="110" y="116" fontSize="16">⭐</text><text x="140" y="116" fontSize="16">✨</text>
    <rect x="62" y="56" width="96" height="32" rx="10" fill="url(#ck1)"/>
    {[78,110,140].map((x,i) => <ellipse key={i} cx={x} cy={56} rx={8} ry={4.5} fill="url(#frost)" opacity={0.9}/>)}
    {[82,110,138].map((cx,i) => (
      <g key={i}>
        <rect x={cx-5} y={32} width={10} height={28} rx={5} fill={['#FFD6E7','#DCD6FF','#FFE9A8'][i]}/>
        {!candlesOut ? (
          <motion.g animate={{ scaleX:[1,0.8,1.1,0.85,1], scaleY:[1,1.1,0.9,1.15,1] }}
            transition={{ duration: 0.38+i*0.08, repeat: Infinity, ease:'easeInOut' }}
            style={{ transformOrigin:`${cx}px 28px` }}>
            <ellipse cx={cx} cy={24} rx={6} ry={9} fill="#FFE082" opacity={0.9}/>
            <ellipse cx={cx} cy={27} rx={3.5} ry={6} fill="#FF8F00"/>
            <ellipse cx={cx} cy={28.5} rx={1.5} ry={3} fill="white" opacity={0.8}/>
          </motion.g>
        ) : (
          <motion.path d={`M${cx} 28 Q${cx+5} 20 ${cx} 12`}
            initial={{ opacity:0 }} animate={{ opacity:[0,0.55,0] }}
            transition={{ duration: 1.4, repeat: 2 }}
            stroke="rgba(85,59,97,0.22)" strokeWidth={2} fill="none" strokeLinecap="round"/>
        )}
        <line x1={cx} y1={32} x2={cx} y2={35} stroke="#553B61" strokeWidth={1.5} strokeLinecap="round"/>
      </g>
    ))}
    {!candlesOut && (
      <motion.ellipse cx={110} cy={56} rx={64} ry={8} fill="rgba(255,224,130,0.18)"
        animate={{ opacity:[0.18,0.45,0.18] }} transition={{ duration: 1.3, repeat: Infinity }}/>
    )}
  </svg>
);

/* Balloon */
const Balloon: React.FC<{ x: string; color: string; delay: number }> = ({ x, color, delay }) => (
  <div aria-hidden="true" style={{ position: 'absolute', left: x, bottom: '4%', animation: `balloon-drift 4s ease-in-out ${delay}s infinite`, pointerEvents: 'none' }}>
    <svg width="50" height="72" viewBox="0 0 50 72" fill="none">
      <ellipse cx="25" cy="25" rx="20" ry="24" fill={color} opacity="0.82"/>
      <ellipse cx="18" cy="15" rx="6" ry="5.5" fill="rgba(255,255,255,0.4)"/>
      <path d="M25 49 Q28 55 25 60 Q22 64 25 68" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <polygon points="22,49 28,49 25,54" fill={color} opacity="0.8"/>
    </svg>
  </div>
);

/* ══════════════════════════════════════════════════════════
   SCREEN 2 — Birthday Celebration
   ══════════════════════════════════════════════════════════ */
const BirthdayCelebration: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [candlesOut, setCandlesOut] = useState(false);
  const [candleMsg,  setCandleMsg]  = useState('');
  const [confetti,   setConfetti]   = useState(false);

  const blowCandles = () => {
    if (candlesOut) return;
    setCandlesOut(true);
    setCandleMsg(config.candleWishMessage);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 200);
  };

  const balloons = [
    { x: '4%',  color: '#FFD6E7', delay: 0   },
    { x: '88%', color: '#DCD6FF', delay: 1   },
    { x: '14%', color: '#FFE9A8', delay: 2   },
    { x: '76%', color: '#FFC9B9', delay: 0.5 },
    { x: '50%', color: '#C8A2FF', delay: 1.5 },
  ];

  return (
    <div className="screen bg-celebration center-col" style={{ position: 'relative', minHeight: '100dvh' }}>
      <FloatingDecorations variant="dense" />
      <ConfettiEffect trigger={confetti} />
      {balloons.map((b, i) => <Balloon key={i} {...b} />)}

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 20, padding: '40px 24px', maxWidth: 600, width: '100%', textAlign: 'center',
      }}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 6vw, 3rem)',
            lineHeight: 1.15, margin: 0,
            background: 'linear-gradient(135deg, #FF9EC4 0%, #C8A2FF 55%, #FF8FAB 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            fontWeight: 700,
          }}
        >
          HAPPY BIRTHDAY, {config.bestFriendName}!! 🎉💗
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--plum-light)', margin: 0, lineHeight: 1.6 }}
        >
          {config.celebrationSubtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--plum-light)', margin: 0, lineHeight: 1.6, maxWidth: 460 }}
        >
          {config.celebrationSupport}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card"
          style={{ padding: '24px 28px', display: 'inline-block' }}
        >
          <BirthdayCakeSVG candlesOut={candlesOut} onCandleClick={blowCandles} />
          <AnimatePresence mode="wait">
            {!candlesOut ? (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontSize: '0.85rem', color: 'var(--plum-light)', fontWeight: 600, marginTop: 10 }}>
                Click the candles to blow them out! 🕯️
              </motion.p>
            ) : (
              <motion.div key="msg"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 250 }}
                style={{ marginTop: 10 }}
              >
                {candleMsg.split('\n').map((line, i) => (
                  <p key={i} style={{
                    fontSize: i === 0 ? '0.95rem' : '0.85rem',
                    fontWeight: i === 0 ? 700 : 500,
                    color: 'var(--plum)',
                    margin: i === 0 ? 0 : '4px 0 0',
                    lineHeight: 1.5,
                  }}>{line}</p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <button className="btn-primary" onClick={onNext} style={{ fontSize: '1rem', padding: '14px 32px' }}>
            There's More... 👀
          </button>
        </motion.div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SCREEN 3 — Friendship Letter
   ══════════════════════════════════════════════════════════ */
const FriendshipLetter: React.FC<{ onNext: () => void; onOpenLab: () => void }> = ({ onNext, onOpenLab }) => {
  const { memories, letter, letterHeading } = config;

  return (
    <div className="screen bg-letter" style={{ position: 'relative', minHeight: '100dvh' }}>
      <FloatingDecorations variant="light" />
      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto',
        padding: '48px 24px 72px',
        display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center',
      }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', color: 'var(--plum)', margin: 0 }}>
            {letterHeading}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--plum-light)', marginTop: 6, fontWeight: 600 }}>
            Written straight from the heart (and with a little chaos) 💌
          </p>
        </motion.div>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card"
          style={{ padding: '32px 36px', width: '100%', position: 'relative' }}
        >
          <div aria-hidden="true" style={{ position: 'absolute', top: -8, left: '18%', width: 64, height: 17, borderRadius: 5, background: 'rgba(255,158,196,0.35)', transform: 'rotate(-2deg)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', top: -8, right: '13%', width: 52, height: 17, borderRadius: 5, background: 'rgba(200,162,255,0.35)', transform: 'rotate(3deg)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {letter.map((line, i) => {
              const isHeading = line.startsWith('HOW COULD') || line.startsWith('AND WHICH') || line.startsWith('Happy birthday, Ann');
              const isEmphasis = line.startsWith('The ') || line.startsWith('Our dedication');
              return (
                <motion.p key={i}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    margin: line === '' ? '4px 0' : '0',
                    fontSize: isHeading ? '1rem' : '0.93rem',
                    fontWeight: isHeading ? 800 : isEmphasis ? 600 : 500,
                    color: isHeading ? 'var(--plum)' : 'var(--plum-light)',
                    lineHeight: 1.75,
                    fontFamily: line.startsWith('Dear') || isHeading ? 'var(--font-display)' : 'var(--font-body)',
                    fontStyle: line.startsWith('Dear') ? 'italic' : 'normal',
                  }}
                >
                  {line === '' ? '\u00A0' : line}
                </motion.p>
              );
            })}
          </div>
        </motion.div>

        {/* Month-Character Lab CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 240, damping: 18 }}
          style={{
            width: '100%', textAlign: 'center',
            padding: '20px 24px',
            background: 'linear-gradient(135deg, rgba(255,214,231,0.5) 0%, rgba(220,214,255,0.5) 100%)',
            border: '2px solid rgba(255,158,196,0.4)',
            borderRadius: 24,
            boxShadow: '0 4px 20px rgba(255,158,196,0.15)',
          }}
        >
          <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--plum)', margin: '0 0 6px', fontFamily: 'var(--font-body)' }}>
            🔬 The Extremely Official Month-Character Research Lab™
          </p>
          <p style={{ fontSize: '0.83rem', color: 'var(--plum-light)', fontWeight: 500, margin: '0 0 14px', lineHeight: 1.5 }}>
            Because our extremely important investigation must continue. 😂🐱
          </p>
          <button className="btn-primary" onClick={onOpenLab} style={{ fontSize: '0.9rem', padding: '12px 26px' }}>
            Open the Research Lab 🐱✨
          </button>
        </motion.div>

        {/* Online friendship memory cards */}
        <div style={{ width: '100%' }}>
          <motion.h3
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--plum)', textAlign: 'center', marginBottom: 20 }}
          >
            Little Moments from Our Internet World 🌐💗
          </motion.h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {memories.map((mem, i) => (
              <MemoryCard key={mem.id} memory={mem} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.5 }}
        >
          <button className="btn-primary" onClick={onNext} style={{ fontSize: '1rem', padding: '14px 32px' }}>
            Wait... What's That Gift? 🎁
          </button>
        </motion.div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SCREEN 4 — Gift Box
   ══════════════════════════════════════════════════════════ */
const GiftScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [confetti, setConfetti] = useState(false);

  return (
    <div className="screen bg-gift center-col" style={{ position: 'relative', minHeight: '100dvh' }}>
      <FloatingDecorations variant="medium" />
      <ConfettiEffect trigger={confetti} />

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 16, padding: '40px 24px', maxWidth: 600, width: '100%', textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          {config.giftIntroLines.map((line, i) => (
            <motion.p key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.18, duration: 0.5 }}
              style={{
                fontSize: i === 0 ? '1.05rem' : '0.88rem',
                fontWeight: i === 0 ? 700 : i === 3 ? 800 : 500,
                color: i === 0 ? 'var(--plum)' : 'var(--plum-light)',
                margin: 0, lineHeight: 1.6,
                fontFamily: i === 0 ? 'var(--font-display)' : 'var(--font-body)',
                fontStyle: i === 0 ? 'italic' : 'normal',
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <AnimatedGiftBox
          onComplete={() => { setConfetti(true); setTimeout(() => setConfetti(false), 200); }}
          onNextScreen={onNext}
        />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SCREEN 5 — Final Birthday Wish
   ══════════════════════════════════════════════════════════ */
const FinalBirthdayWish: React.FC<{
  onReplay: () => void;
  onGiftAgain: () => void;
  onOpenLab: () => void;
}> = ({ onReplay, onGiftAgain, onOpenLab }) => {
  const [confetti, setConfetti] = useState(false);
  const { finalWish, finalHeading, finalSignLine1, finalSignLine2 } = config;
  const petals = ['🌸', '🌺', '💗', '⭐', '✨'];

  useEffect(() => {
    const t = setTimeout(() => { setConfetti(true); setTimeout(() => setConfetti(false), 200); }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen bg-final" style={{ position: 'relative', minHeight: '100dvh' }}>
      <FloatingDecorations variant="dense" />
      <ConfettiEffect trigger={confetti} />

      {[...Array(18)].map((_, i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'fixed', left: `${(i * 5.7) % 95}%`, top: '-30px',
          fontSize: 13 + (i % 5) * 3,
          animation: `petal-fall ${5 + (i % 5)}s linear ${i * 0.55}s infinite`,
          pointerEvents: 'none', zIndex: 0,
        }}>
          {petals[i % petals.length]}
        </div>
      ))}

      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 660, margin: '0 auto',
        padding: '48px 24px 72px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center',
      }}>
        {/* Character + mini cake */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}
        >
          <CuteCharacter state="idle" size={120} />
          <svg width="72" height="82" viewBox="0 0 72 82" fill="none" aria-hidden="true">
            <rect x="10" y="36" width="52" height="40" rx="9" fill="#FFD6E7"/>
            <rect x="20" y="22" width="32" height="18" rx="7" fill="#DCD6FF"/>
            <rect x="33" y="8" width="6" height="16" rx="3" fill="#FFE9A8"/>
            <ellipse cx="36" cy="7" rx="4" ry="6" fill="#FFE082" opacity={0.9}/>
            <ellipse cx="36" cy="9" rx="2.2" ry="3.5" fill="#FF8F00"/>
            <text x="36" y="66" textAnchor="middle" fontSize="20">🎂</text>
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 4vw, 1.9rem)', color: 'var(--plum)', fontStyle: 'italic', margin: 0 }}
        >
          {finalHeading}
        </motion.h2>

        {/* Final wish card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="glass-card"
          style={{ padding: '28px 32px', width: '100%' }}
        >
          {finalWish.map((line, i) => {
            const isBig = line.startsWith('Happy birthday, my favorite') || line.startsWith('WHICH CAT FACE');
            return (
              <motion.p key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.45 }}
                style={{
                  margin: line === '' ? '4px 0' : '0',
                  fontSize: line === '' ? '0.5rem' : isBig ? '1rem' : '0.92rem',
                  fontWeight: isBig ? 800 : 500,
                  color: isBig ? 'var(--plum)' : 'var(--plum-light)',
                  lineHeight: 1.75,
                  fontFamily: isBig ? 'var(--font-display)' : 'var(--font-body)',
                }}
              >
                {line === '' ? '\u00A0' : line}
              </motion.p>
            );
          })}
        </motion.div>

        {/* Sign-off */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--plum)', margin: 0 }}>
            {finalSignLine1}
          </p>
          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--plum-light)', margin: 0 }}>
            <strong style={{ color: 'var(--plum)' }}>{finalSignLine2}</strong>
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.5 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button className="btn-secondary" onClick={onReplay} aria-label="Replay our little adventure from the beginning">
            Replay Our Little Adventure ↻
          </button>
          <button className="btn-primary" onClick={onGiftAgain} aria-label="Open the gift again">
            Open My Gift Again 🎁
          </button>
          <button className="btn-secondary" onClick={onOpenLab} aria-label="Reopen the month-character research lab"
            style={{ borderColor: 'rgba(200,162,255,0.5)' }}>
            Our Research Continues 🐱
          </button>
        </motion.div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   ROOT ORCHESTRATOR
   ══════════════════════════════════════════════════════════ */
export const BirthdayExperience: React.FC = () => {
  const [screen,      setScreen]     = useState<Screen>('welcome');
  const [instanceKey, setInstanceKey] = useState(0);
  const [showLab,     setShowLab]    = useState(false);

  const goTo = (s: Screen) => setScreen(s);

  const replay = () => {
    setInstanceKey(k => k + 1);
    setScreen('welcome');
  };

  const giftAgain = () => {
    setInstanceKey(k => k + 1);
    setScreen('gift');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {screen === 'welcome' && (
          <motion.div key={`welcome-${instanceKey}`} style={{ position: 'absolute', inset: 0 }}
            variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <WelcomeScreen onNext={() => goTo('celebration')} />
          </motion.div>
        )}
        {screen === 'celebration' && (
          <motion.div key="celebration" style={{ position: 'absolute', inset: 0 }}
            variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <BirthdayCelebration onNext={() => goTo('letter')} />
          </motion.div>
        )}
        {screen === 'letter' && (
          <motion.div key="letter" style={{ position: 'absolute', inset: 0 }}
            variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <FriendshipLetter onNext={() => goTo('gift')} onOpenLab={() => setShowLab(true)} />
          </motion.div>
        )}
        {screen === 'gift' && (
          <motion.div key={`gift-${instanceKey}`} style={{ position: 'absolute', inset: 0 }}
            variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <GiftScreen onNext={() => goTo('final')} />
          </motion.div>
        )}
        {screen === 'final' && (
          <motion.div key="final" style={{ position: 'absolute', inset: 0 }}
            variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <FinalBirthdayWish onReplay={replay} onGiftAgain={giftAgain} onOpenLab={() => setShowLab(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Month-Character Lab modal — lives at the root so it overlays any screen */}
      <AnimatePresence>
        {showLab && <MonthCharacterLab onClose={() => setShowLab(false)} />}
      </AnimatePresence>
    </div>
  );
};
