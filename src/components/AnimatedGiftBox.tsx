import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CuteCharacter, SpeechBubble } from './CuteCharacter';
import { config } from '../config';

type GiftState =
  | 'idle'
  | 'shaking'
  | 'bow-wiggle'
  | 'lid-lifting'
  | 'burst'
  | 'character-out'
  | 'done';

interface AnimatedGiftBoxProps {
  onComplete?: () => void;
  onNextScreen?: () => void;
}

/* ── Inside-joke callback card ───────────────────────────── */
const JokeCard: React.FC = () => {
  const { heading, lines } = config.jokeCard;
  const [starBurst, setStarBurst] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -8, opacity: 0 }}
      animate={{ scale: 1, rotate: -3, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 16, delay: 0.3 }}
      style={{
        background: 'linear-gradient(135deg, #FFF9F0 0%, #FFE4F0 100%)',
        border: '2px solid rgba(255,158,196,0.6)',
        borderRadius: 16,
        padding: '14px 16px',
        maxWidth: 290,
        boxShadow: '0 4px 20px rgba(255,158,196,0.25)',
        position: 'relative',
        cursor: 'pointer',
      }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      onClick={() => { setStarBurst(true); setTimeout(() => setStarBurst(false), 1200); }}
    >
      {/* Mini "post" header stripe */}
      <div style={{
        background: 'linear-gradient(90deg, #FF9EC4, #C8A2FF)',
        borderRadius: '10px 10px 0 0',
        margin: '-14px -16px 10px',
        padding: '6px 12px',
      }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'white', margin: 0, textAlign: 'center', letterSpacing: '0.03em' }}>
          {heading}
        </p>
      </div>

      {lines.map((line, i) => (
        <motion.p key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          style={{
            fontSize: '0.76rem', fontWeight: 600,
            color: 'var(--plum)', margin: '0 0 3px',
            lineHeight: 1.5, fontFamily: 'var(--font-body)',
          }}
        >
          {line}
        </motion.p>
      ))}

      {/* Pointing finger hint */}
      <motion.div
        animate={{ x: [-4, 4, -4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ position: 'absolute', right: -28, top: '40%', fontSize: 20 }}
        aria-hidden="true"
      >
        👆
      </motion.div>

      {/* Star burst on click */}
      {starBurst && ['⭐','✨','💗','🐱'].map((s, i) => (
        <motion.span key={i} aria-hidden="true"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0.8],
            x: Math.cos((i / 4) * Math.PI * 2) * 55,
            y: Math.sin((i / 4) * Math.PI * 2) * 55 }}
          transition={{ duration: 0.9, delay: i * 0.06 }}
          style={{ position: 'absolute', fontSize: 16, top: '50%', left: '50%', pointerEvents: 'none' }}
        >{s}</motion.span>
      ))}
    </motion.div>
  );
};

/* ── Floating hearts on hug ──────────────────────────────── */
const HugHearts: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
      {['💗','💕','❤️','💗','✨','💖'].map((h, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], y: -90 - i * 15, x: (i % 2 === 0 ? 1 : -1) * (20 + i * 12), scale: [0.5, 1.2, 0.8] }}
          transition={{ duration: 1.2, delay: i * 0.12, ease: 'easeOut' }}
          style={{ position: 'absolute', bottom: 0, left: '50%', fontSize: 18, transform: 'translateX(-50%)' }}
        >{h}</motion.span>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   ANIMATED GIFT BOX
   ══════════════════════════════════════════════════════════ */
export const AnimatedGiftBox: React.FC<AnimatedGiftBoxProps> = ({
  onComplete,
  onNextScreen,
}) => {
  const [giftState,   setGiftState]   = useState<GiftState>('idle');
  const [hugCount,    setHugCount]    = useState(0);
  const [showHearts,  setShowHearts]  = useState(false);
  const [hugMsg,      setHugMsg]      = useState('');
  const [showJokeCard,setShowJokeCard]= useState(false);
  const lockRef = useRef(false);

  const openGift = useCallback(() => {
    if (lockRef.current || giftState !== 'idle') return;
    lockRef.current = true;

    setGiftState('shaking');
    setTimeout(() => {
      setGiftState('bow-wiggle');
      setTimeout(() => {
        setGiftState('lid-lifting');
        setTimeout(() => {
          setGiftState('burst');
          setTimeout(() => {
            setGiftState('character-out');
            setTimeout(() => {
              setGiftState('done');
              onComplete?.();
              lockRef.current = false;
              // show joke card 4 s after character is out
              setTimeout(() => setShowJokeCard(true), 4000);
            }, 800);
          }, 600);
        }, 900);
      }, 700);
    }, 900);
  }, [giftState, onComplete]);

  const handleHug = () => {
    setHugCount(n => n + 1);
    setShowHearts(true);
    setHugMsg(config.hugResponseText);
    setTimeout(() => { setShowHearts(false); setHugMsg(''); }, 2800);
  };

  const showCharacter = ['character-out', 'done'].includes(giftState);
  const showBubble    = giftState === 'done';
  const showBurst     = ['burst', 'character-out', 'done'].includes(giftState);
  const showLid       = !['burst', 'character-out', 'done'].includes(giftState);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

      {/* ── Gift Box SVG Scene ──────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: 260, height: 300,
          cursor: giftState === 'idle' ? 'pointer' : 'default',
        }}
        onClick={openGift}
        onKeyDown={e => e.key === 'Enter' && openGift()}
        tabIndex={giftState === 'idle' ? 0 : -1}
        role="button"
        aria-label="Click to open your birthday gift!"
      >
        {/* Orbital sparkles (idle only) */}
        {giftState === 'idle' && (
          ['✨', '⭐', '💫', '✨'].map((s, i) => (
            <span key={i} aria-hidden="true" style={{
              position: 'absolute', top: '50%', left: '50%', fontSize: 14,
              animation: `orbit ${3 + i * 0.5}s linear ${i * 0.7}s infinite`,
              transformOrigin: '0 0',
            }}>{s}</span>
          ))
        )}

        {/* Glow beneath box */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          width: 180, height: 40, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,158,196,0.45) 0%, transparent 70%)',
          animation: 'pulse-glow 2.5s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Gift box */}
        <motion.div
          style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', width: 180 }}
          animate={
            giftState === 'shaking'
              ? { x: [-8,8,-6,6,-4,4,-2,0], rotate: [-3,3,-2,2,-1,1,0,0] }
              : giftState === 'idle'
              ? { y: [0, -6, 0] }
              : {}
          }
          transition={
            giftState === 'shaking'
              ? { duration: 0.8, ease: 'easeInOut' }
              : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <svg viewBox="0 0 180 160" width="180" height="160" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#FFD6E7"/>
                <stop offset="100%" stopColor="#FFC2E0"/>
              </linearGradient>
              <linearGradient id="boxSide" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#FFAED8"/>
                <stop offset="100%" stopColor="#FFD6E7"/>
              </linearGradient>
              <linearGradient id="lidGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#DCD6FF"/>
                <stop offset="100%" stopColor="#C8BFFF"/>
              </linearGradient>
              <linearGradient id="ribbonV2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#FF9EC4"/>
                <stop offset="50%"  stopColor="#FFD6E7"/>
                <stop offset="100%" stopColor="#FF9EC4"/>
              </linearGradient>
              <filter id="boxShadow2">
                <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#553B61" floodOpacity="0.15"/>
              </filter>
              <filter id="glowFilter2">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Box body */}
            <rect x="20" y="68" width="140" height="88" rx="6" fill="url(#boxGrad)" filter="url(#boxShadow2)"/>
            <polygon points="160,68 172,60 172,148 160,156" fill="url(#boxSide)" opacity="0.85"/>
            <polygon points="20,68 32,60 172,60 160,68" fill="#E8C8E0" opacity="0.9"/>
            {/* Ribbons */}
            <rect x="80" y="68" width="20" height="88" fill="url(#ribbonV2)" opacity="0.85"/>
            <rect x="20" y="98" width="140" height="16" fill="url(#ribbonV2)" opacity="0.85"/>
            <polygon points="160,98 172,90 172,106 160,114" fill="#FF9EC4" opacity="0.7"/>

            {/* Lid */}
            {showLid && (
              <motion.g
                animate={giftState === 'lid-lifting' ? { rotate: -85, y: -35, opacity: 0.7 } : {}}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: '90px 60px' }}
              >
                <rect x="14" y="50" width="152" height="22" rx="6" fill="url(#lidGrad2)" filter="url(#boxShadow2)"/>
                <polygon points="166,50 178,42 178,64 166,72" fill="#BEB7FF" opacity="0.85"/>
                <polygon points="14,50 26,42 178,42 166,50" fill="#D4CFFF" opacity="0.9"/>

                {/* Bow */}
                <motion.g
                  animate={giftState === 'bow-wiggle' ? { rotate: [0,-12,12,-8,8,0] } : {}}
                  transition={{ duration: 0.6 }}
                  style={{ transformOrigin: '90px 44px' }}
                >
                  <ellipse cx="72" cy="40" rx="18" ry="11" fill="#FF9EC4" transform="rotate(-25 72 40)"/>
                  <ellipse cx="108" cy="40" rx="18" ry="11" fill="#FF9EC4" transform="rotate(25 108 40)"/>
                  <ellipse cx="72" cy="40" rx="10" ry="6" fill="#FFD6E7" transform="rotate(-25 72 40)" opacity="0.6"/>
                  <ellipse cx="108" cy="40" rx="10" ry="6" fill="#FFD6E7" transform="rotate(25 108 40)" opacity="0.6"/>
                  <ellipse cx="90" cy="40" rx="9" ry="7" fill="#FF9EC4"/>
                  <ellipse cx="90" cy="40" rx="5" ry="4" fill="#FFD6E7" opacity="0.7"/>
                  <path d="M84,47 Q76,58 78,68" stroke="#FF9EC4" strokeWidth="4" strokeLinecap="round" fill="none"/>
                  <path d="M96,47 Q104,58 102,68" stroke="#FF9EC4" strokeWidth="4" strokeLinecap="round" fill="none"/>
                </motion.g>
                <rect x="82" y="50" width="16" height="22" fill="url(#ribbonV2)" opacity="0.9"/>
              </motion.g>
            )}

            {/* Polka dots */}
            {[[40,90],[50,120],[130,85],[120,130],[100,95]].map(([cx,cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={4} fill="rgba(255,255,255,0.4)"/>
            ))}

            {/* Magic light burst */}
            {showBurst && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0,1,0.7], scale: [0,1.5,2] }}
                transition={{ duration: 0.6 }}
              >
                <circle cx="90" cy="70" r="60" fill="rgba(255,245,200,0.6)" filter="url(#glowFilter2)"/>
                {[0,45,90,135,180,225,270,315].map((angle, i) => (
                  <motion.line key={i}
                    x1="90" y1="70"
                    x2={90 + Math.cos((angle * Math.PI) / 180) * 70}
                    y2={70 + Math.sin((angle * Math.PI) / 180) * 70}
                    stroke="#FFE9A8" strokeWidth={2} opacity={0.8}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  />
                ))}
              </motion.g>
            )}
          </svg>

          {/* Platform */}
          <div style={{
            width: '100%', height: 12,
            background: 'linear-gradient(135deg, rgba(255,214,231,0.6) 0%, rgba(220,214,255,0.6) 100%)',
            borderRadius: '0 0 20px 20px',
            boxShadow: '0 4px 20px rgba(255,158,196,0.2)',
          }} />
        </motion.div>

        {/* Burst particles */}
        <AnimatePresence>
          {showBurst && (
            <>
              {['💗','⭐','✨','💕','🌸','💫','⭐','💗'].map((emoji, i) => {
                const angle = (i / 8) * 360;
                const dist  = 80 + Math.random() * 40;
                const dx    = Math.cos((angle * Math.PI) / 180) * dist;
                const dy    = Math.sin((angle * Math.PI) / 180) * dist - 60;
                return (
                  <motion.span key={`burst-${i}`} aria-hidden="true"
                    initial={{ opacity:0, scale:0, x:130, y:100 }}
                    animate={{ opacity:[0,1,0], scale:[0,1.4,0.8], x:130+dx, y:100+dy }}
                    transition={{ duration:1, delay:i*0.07, ease:'easeOut' }}
                    style={{ position:'absolute', fontSize:18, pointerEvents:'none' }}
                  >{emoji}</motion.span>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Character emerges ───────────────────────────────── */}
      <AnimatePresence>
        {showCharacter && (
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.4 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 14 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', maxWidth: 400 }}
          >
            {/* Speech bubble above character */}
            {showBubble && (
              <SpeechBubble
                lines={config.giftCharacterMessage}
                followUp={config.giftFollowUpMessage}
                visible={showBubble}
              />
            )}

            {/* Character + floating hearts layer */}
            <div style={{ position: 'relative', marginTop: 20 }}>
              <CuteCharacter state="waving" size={140} />
              <HugHearts visible={showHearts} />
            </div>

            {/* Inside-joke callback card */}
            <AnimatePresence>
              {showJokeCard && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                  style={{ position: 'relative', paddingRight: 36 }}
                >
                  <JokeCard />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hug message */}
            <AnimatePresence>
              {hugMsg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  className="glass-card"
                  style={{ padding: '14px 20px', maxWidth: 320, textAlign: 'center' }}
                >
                  {hugMsg.split('\n').map((line, i) => (
                    <p key={i} style={{
                      fontSize: i === 0 ? '0.95rem' : '0.82rem',
                      fontWeight: i === 0 ? 800 : 600,
                      color: i === 0 ? 'var(--plum)' : 'var(--plum-light)',
                      margin: '0 0 4px',
                      fontFamily: 'var(--font-body)',
                    }}>{line}</p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons — shown after bubble starts */}
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.5 }}
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
              >
                <button
                  className="btn-primary"
                  onClick={handleHug}
                  style={{ fontSize: '0.9rem', padding: '12px 22px' }}
                  aria-label="Give the character a virtual hug"
                >
                  Give Me a Hug 🤗{hugCount > 0 ? ` (×${hugCount + 1})` : ''}
                </button>
                <button
                  className="btn-secondary"
                  onClick={onNextScreen}
                  style={{ fontSize: '0.9rem', padding: '12px 22px' }}
                  aria-label="Go to the final screen"
                >
                  One Last Little Surprise ✨
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle hint */}
      {giftState === 'idle' && (
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--plum-light)', fontFamily: 'var(--font-body)', marginTop: -8 }}
        >
          {config.giftHint}
        </motion.p>
      )}
    </div>
  );
};
