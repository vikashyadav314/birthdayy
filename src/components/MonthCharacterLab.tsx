import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MONTHS, monthCharacterData, type MonthKey, type MonthResult } from '../config';

interface MonthCharacterLabProps {
  onClose: () => void;
}

/* ── Cute SVG Animal ─────────────────────────────────────── */
const AnimalIllustration: React.FC<{ emoji: string; name: string }> = ({ emoji, name }) => (
  <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'linear-gradient(135deg, #FFE4F0 0%, #EDE4FF 100%)',
        border: '3px solid rgba(255,158,196,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36,
        boxShadow: '0 4px 20px rgba(255,158,196,0.25)',
      }}
    >
      {emoji}
    </motion.div>
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--plum)', fontFamily: 'var(--font-body)' }}
    >
      {name}
    </motion.span>
    {/* Star burst */}
    {['⭐','✨','💗','✨'].map((s, i) => (
      <motion.span key={i} aria-hidden="true"
        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.2, 0.8],
          x: Math.cos((i / 4) * Math.PI * 2) * 48,
          y: Math.sin((i / 4) * Math.PI * 2) * 48 - 20,
        }}
        transition={{ delay: 0.1 + i * 0.08, duration: 0.9 }}
        style={{ position: 'absolute', fontSize: 13, pointerEvents: 'none', top: '50%', left: '50%' }}
      >{s}</motion.span>
    ))}
  </div>
);

/* ── Cat Face SVG ────────────────────────────────────────── */
const CatFaceSVG: React.FC<{ name: string }> = ({ name }) => {
  // Pick a cat variant based on name keyword
  const isAngel   = name.toLowerCase().includes('angel');
  const isSleepy  = name.toLowerCase().includes('sleepy') || name.toLowerCase().includes('loaf');
  const isGremlin = name.toLowerCase().includes('chaos') || name.toLowerCase().includes('gremlin');
  const isJudge   = name.toLowerCase().includes('judg');
  const isDramatic= name.toLowerCase().includes('dramatic') || name.toLowerCase().includes('princess');
  const bodyColor  = isAngel ? '#EDE4FF' : isSleepy ? '#FFE9A8' : isGremlin ? '#FFD6E7' : isDramatic ? '#DCD6FF' : '#FFE4F0';
  const innerColor = isAngel ? '#C8BFFF' : isSleepy ? '#FFC9B9' : isGremlin ? '#FF9EC4' : isDramatic ? '#C8A2FF' : '#FFB0C8';


  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 14 }}
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-label={`Cat face: ${name}`}>
        {/* Head */}
        <ellipse cx="36" cy="42" rx="26" ry="24" fill={bodyColor}/>
        {/* Ears */}
        <polygon points="14,26 20,10 28,26" fill={bodyColor}/>
        <polygon points="15,24 20,13 27,24" fill={innerColor} opacity="0.7"/>
        <polygon points="44,26 52,10 58,26" fill={bodyColor}/>
        <polygon points="45,24 52,13 57,24" fill={innerColor} opacity="0.7"/>
        {/* Face sheen */}
        <ellipse cx="29" cy="34" rx="7" ry="5" fill="rgba(255,255,255,0.45)"/>
        {/* Eyes */}
        {isSleepy ? (
          <>
            <path d="M24 36 Q28 39 32 36" stroke="#553B61" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M40 36 Q44 39 48 36" stroke="#553B61" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </>
        ) : isJudge ? (
          <>
            {/* Narrowed judgy eyes */}
            <ellipse cx="28" cy="37" rx="5.5" ry="3.5" fill="white"/>
            <ellipse cx="44" cy="37" rx="5.5" ry="3.5" fill="white"/>
            <ellipse cx="28" cy="37" rx="3" ry="2.5" fill="#553B61"/>
            <ellipse cx="44" cy="37" rx="3" ry="2.5" fill="#553B61"/>
            <path d="M22 33 Q28 35 34 33" stroke="#553B61" strokeWidth="1.5" fill="none"/>
            <path d="M38 33 Q44 35 50 33" stroke="#553B61" strokeWidth="1.5" fill="none"/>
          </>
        ) : (
          <>
            <ellipse cx="28" cy="37" rx="6" ry="7" fill="white"/>
            <ellipse cx="44" cy="37" rx="6" ry="7" fill="white"/>
            <circle cx="29" cy="38" r="4" fill="#553B61"/>
            <circle cx="45" cy="38" r="4" fill="#553B61"/>
            <circle cx="30" cy="36.5" r="1.5" fill="white"/>
            <circle cx="46" cy="36.5" r="1.5" fill="white"/>
          </>
        )}
        {/* Cheeks */}
        <ellipse cx="20" cy="44" rx="7" ry="4" fill={innerColor} opacity="0.5"/>
        <ellipse cx="52" cy="44" rx="7" ry="4" fill={innerColor} opacity="0.5"/>
        {/* Nose */}
        <ellipse cx="36" cy="46" rx="2.5" ry="1.8" fill="#FF9EC4"/>
        {/* Mouth */}
        {isDramatic ? (
          <path d="M30 50 Q36 46 42 50" stroke="#553B61" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        ) : isGremlin ? (
          <path d="M30 50 Q36 54 42 50" stroke="#553B61" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        ) : (
          <path d="M32 50 Q36 53 40 50" stroke="#553B61" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        )}
        {/* Whiskers */}
        <line x1="4"  y1="43" x2="22" y2="46" stroke="#553B61" strokeWidth="1"  opacity="0.4"/>
        <line x1="4"  y1="48" x2="22" y2="48" stroke="#553B61" strokeWidth="1"  opacity="0.4"/>
        <line x1="50" y1="46" x2="68" y2="43" stroke="#553B61" strokeWidth="1"  opacity="0.4"/>
        <line x1="50" y1="48" x2="68" y2="48" stroke="#553B61" strokeWidth="1"  opacity="0.4"/>
        {/* Angel halo */}
        {isAngel && (
          <motion.ellipse cx="36" cy="14" rx="14" ry="5"
            fill="none" stroke="#FFE9A8" strokeWidth="3"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </svg>
    </motion.div>
  );
};

/* ── Single Lab Card ─────────────────────────────────────── */
type CardType = 'animal' | 'nature' | 'catFace';

interface LabCardProps {
  type: CardType;
  title: string;
  desc: string;
  buttonLabel: string;
  selectedMonth: MonthKey | null;
  result: MonthResult | null;
  onReveal: () => void;
  onReset: () => void;
  bgGradient: string;
}

const LabCard: React.FC<LabCardProps> = ({
  type, title, desc, buttonLabel, selectedMonth, result, onReveal, onReset, bgGradient,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: bgGradient,
        border: '2px solid rgba(255,255,255,0.85)',
        borderRadius: 24,
        padding: '22px 20px',
        boxShadow: '0 4px 24px rgba(85,59,97,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        flex: '1 1 220px',
        maxWidth: 260,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <p style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--plum)', margin: 0, fontFamily: 'var(--font-body)' }}>
        {title}
      </p>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.p key="desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ fontSize: '0.82rem', color: 'var(--plum-light)', fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
            {desc}
          </motion.p>
        ) : (
          <motion.div key="result"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            {type === 'catFace'
              ? <CatFaceSVG name={result.name} />
              : <AnimalIllustration emoji={result.emoji} name={result.name} />}
            <motion.p
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              style={{ fontSize: '0.8rem', color: 'var(--plum-light)', fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
              {result.desc}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!result ? (
        <button
          className="btn-primary"
          onClick={onReveal}
          disabled={!selectedMonth}
          title={!selectedMonth ? 'Pick your birth month first!' : undefined}
          style={{ fontSize: '0.82rem', padding: '10px 20px' }}
          aria-label={buttonLabel}
        >
          {buttonLabel}
        </button>
      ) : (
        <button className="btn-secondary" onClick={onReset}
          style={{ fontSize: '0.8rem', padding: '8px 18px' }}>
          Try Again 🔄
        </button>
      )}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════
   MONTH-CHARACTER LAB — Main Component
   ══════════════════════════════════════════════════════════ */
export const MonthCharacterLab: React.FC<MonthCharacterLabProps> = ({ onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState<MonthKey | null>(null);
  const [animalResult,  setAnimalResult]  = useState<MonthResult | null>(null);
  const [natureResult,  setNatureResult]  = useState<MonthResult | null>(null);
  const [catResult,     setCatResult]     = useState<MonthResult | null>(null);

  const resetAll = () => {
    setAnimalResult(null);
    setNatureResult(null);
    setCatResult(null);
  };

  const handleMonthChange = (m: MonthKey) => {
    setSelectedMonth(m);
    resetAll();
  };

  const revealAnimal  = () => selectedMonth && setAnimalResult(monthCharacterData[selectedMonth].animal);
  const revealNature  = () => selectedMonth && setNatureResult(monthCharacterData[selectedMonth].nature);
  const revealCat     = () => selectedMonth && setCatResult(monthCharacterData[selectedMonth].catFace);

  const allRevealed = !!(animalResult && natureResult && catResult);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(85,59,97,0.35)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        style={{
          background: 'rgba(255,249,240,0.96)',
          backdropFilter: 'blur(24px)',
          border: '2px solid rgba(255,255,255,0.9)',
          borderRadius: 32,
          padding: '32px 28px',
          maxWidth: 860,
          width: '100%',
          boxShadow: '0 12px 60px rgba(85,59,97,0.22)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close the Month-Character Lab"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,158,196,0.2)', border: '1.5px solid rgba(255,158,196,0.4)',
            borderRadius: '50%', width: 36, height: 36,
            cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--plum)',
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: 'var(--plum)', margin: '0 0 8px' }}
          >
            🔬 The Extremely Official Month-Character Research Lab™
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            style={{ fontSize: '0.88rem', color: 'var(--plum-light)', fontWeight: 600, margin: 0, lineHeight: 1.5 }}
          >
            Because apparently, your birth month decides your animal face, your nature, AND your cat face.
            <br/>Very serious scientific business. 😂
          </motion.p>
        </div>

        {/* Month picker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        >
          <label
            htmlFor="month-select"
            style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--plum)', fontFamily: 'var(--font-body)' }}
          >
            First things first — pick your birth month! 🗓️
          </label>
          <select
            id="month-select"
            value={selectedMonth ?? ''}
            onChange={e => handleMonthChange(e.target.value as MonthKey)}
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              border: '2px solid rgba(255,158,196,0.5)',
              background: 'rgba(255,255,255,0.9)',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--plum)',
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 2px 12px rgba(255,158,196,0.2)',
              minWidth: 180,
            }}
            aria-label="Select your birth month"
          >
            <option value="" disabled>Choose your month...</option>
            {MONTHS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {!selectedMonth && (
            <p style={{ fontSize: '0.78rem', color: 'var(--plum-light)', margin: 0, fontStyle: 'italic' }}>
              (Pick your month to unlock the very important research below)
            </p>
          )}
        </motion.div>

        {/* Three cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          <LabCard
            type="animal"
            title="🐻 Which Animal Are You?"
            desc="Your birth month has entered the chat. Let's see which little creature the internet assigns you."
            buttonLabel="Reveal My Animal 🐾"
            selectedMonth={selectedMonth}
            result={animalResult}
            onReveal={revealAnimal}
            onReset={() => setAnimalResult(null)}
            bgGradient="linear-gradient(135deg, #FFE4F0 0%, #FFD6E7 100%)"
          />
          <LabCard
            type="nature"
            title="🌸 What's Your Nature Type?"
            desc="Sweet sunshine? Chaotic little storm? Mysterious moonlight? Let's investigate."
            buttonLabel="Reveal My Nature 🌷"
            selectedMonth={selectedMonth}
            result={natureResult}
            onReveal={revealNature}
            onReset={() => setNatureResult(null)}
            bgGradient="linear-gradient(135deg, #EDE4FF 0%, #DCD6FF 100%)"
          />
          <LabCard
            type="catFace"
            title="🐱 Which Cat Face Are You?"
            desc="This is clearly the most important investigation of them all."
            buttonLabel="Reveal My Cat Face 😼"
            selectedMonth={selectedMonth}
            result={catResult}
            onReveal={revealCat}
            onReset={() => setCatResult(null)}
            bgGradient="linear-gradient(135deg, #FFF0D6 0%, #FFE9A8 100%)"
          />
        </div>

        {/* All-revealed celebration */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              style={{
                marginTop: 24,
                padding: '16px 20px',
                borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(255,214,231,0.6) 0%, rgba(220,214,255,0.6) 100%)',
                border: '1.5px solid rgba(255,158,196,0.4)',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--plum)', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                🎉 Research complete! The universe has spoken!
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--plum-light)', fontWeight: 500, margin: 0 }}>
                Scientific accuracy: 0%. Entertainment value: immeasurable. 😂💗
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--plum-light)', margin: '8px 0 0', fontStyle: 'italic' }}>
                "Our Research Continues..." 🔬🐱
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={resetAll}
            style={{ fontSize: '0.82rem', padding: '10px 20px' }}>
            Reset All 🔄
          </button>
          <button className="btn-primary" onClick={onClose}
            style={{ fontSize: '0.82rem', padding: '10px 20px' }}>
            Back to the Birthday 🎂
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
