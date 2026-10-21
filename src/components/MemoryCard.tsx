import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

interface MemoryCardProps {
  memory: (typeof config.memories)[0];
  index: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index }) => {
  const [revealed, setRevealed] = useState(false);

  const pastelBgs = [
    'linear-gradient(135deg, #FFE4F0 0%, #FFD6E7 100%)',
    'linear-gradient(135deg, #EDE4FF 0%, #DCD6FF 100%)',
    'linear-gradient(135deg, #FFF0D6 0%, #FFE9A8 100%)',
    'linear-gradient(135deg, #FFE8D6 0%, #FFC9B9 100%)',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: index % 2 === 0 ? -3 : 3 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
      onClick={() => setRevealed(r => !r)}
      onKeyDown={e => e.key === 'Enter' && setRevealed(r => !r)}
      tabIndex={0}
      role="button"
      aria-label={`Memory card: ${memory.caption}`}
      aria-expanded={revealed}
      style={{
        cursor: 'pointer',
        background: pastelBgs[index % pastelBgs.length],
        border: '2px solid rgba(255,255,255,0.85)',
        borderRadius: 20,
        padding: '20px 16px',
        boxShadow: '0 4px 20px rgba(85,59,97,0.10), 0 2px 8px rgba(255,158,196,0.15)',
        width: 160,
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        transition: 'box-shadow 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Photo or illustrated placeholder */}
      {memory.photoUrl ? (
        <img
          src={memory.photoUrl}
          alt={memory.caption}
          style={{ width: 110, height: 90, borderRadius: 12, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.9)' }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            width: 110,
            height: 90,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.55)',
            border: '2px dashed rgba(255,158,196,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
          }}
        >
          {memory.emoji}
        </div>
      )}

      {/* Caption reveal */}
      <motion.p
        animate={{ opacity: revealed ? 1 : 0.4, y: revealed ? 0 : 4 }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--plum)',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {revealed ? memory.caption : 'Tap to reveal ✨'}
      </motion.p>
    </motion.div>
  );
};
