import React, { useEffect, useRef } from 'react';

interface FloatingDecorationsProps {
  variant?: 'light' | 'medium' | 'dense';
}

const DECORS = [
  { emoji: '💗', size: 16, delay: 0, dur: 6, x: 8, y: 15 },
  { emoji: '✨', size: 20, delay: 1.2, dur: 7, x: 20, y: 70 },
  { emoji: '🌸', size: 18, delay: 2.5, dur: 8, x: 88, y: 25 },
  { emoji: '⭐', size: 14, delay: 0.8, dur: 5.5, x: 75, y: 60 },
  { emoji: '💕', size: 15, delay: 3.1, dur: 6.5, x: 45, y: 85 },
  { emoji: '🌟', size: 22, delay: 1.8, dur: 9, x: 60, y: 10 },
  { emoji: '💫', size: 16, delay: 4, dur: 7.5, x: 30, y: 40 },
  { emoji: '🌺', size: 18, delay: 2, dur: 8.5, x: 92, y: 80 },
  { emoji: '✨', size: 12, delay: 5, dur: 6, x: 15, y: 90 },
  { emoji: '💜', size: 14, delay: 3.5, dur: 7, x: 70, y: 35 },
  { emoji: '🌸', size: 16, delay: 1, dur: 9.5, x: 50, y: 55 },
  { emoji: '⭐', size: 18, delay: 4.5, dur: 6.5, x: 5, y: 50 },
];

const MEDIUM_DECORS = DECORS.slice(0, 8);
const LIGHT_DECORS  = DECORS.slice(0, 5);

export const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({ variant = 'medium' }) => {
  const items = variant === 'dense' ? DECORS : variant === 'medium' ? MEDIUM_DECORS : LIGHT_DECORS;

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    >
      {items.map((d, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${d.x}%`,
            top: `${d.y}%`,
            fontSize: d.size,
            opacity: 0.55,
            animation: `float ${d.dur}s ease-in-out ${d.delay}s infinite`,
            willChange: 'transform',
            display: 'block',
            lineHeight: 1,
          }}
        >
          {d.emoji}
        </span>
      ))}

      {/* Twinkling stars */}
      {[...Array(14)].map((_, i) => (
        <div
          key={`star-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 95 + 2}%`,
            top: `${Math.random() * 90 + 2}%`,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: `hsl(${280 + i * 20}deg, 70%, 75%)`,
            animation: `twinkle ${2 + (i % 5) * 0.5}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ── Confetti Burst ──────────────────────────────────────── */
export const ConfettiEffect: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  const activeRef = useRef(false);

  useEffect(() => {
    if (!trigger || activeRef.current) return;

    // Dynamically import canvas-confetti
    import('canvas-confetti').then(({ default: confetti }) => {
      activeRef.current = true;

      const fire = (particleRatio: number, opts: object) => {
        confetti({
          origin: { y: 0.6 },
          ...opts,
          particleCount: Math.floor(180 * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55, colors: ['#FFD6E7', '#DCD6FF', '#FFE9A8', '#FFC9B9', '#FF9EC4'] });
      fire(0.2,  { spread: 60, colors: ['#C8A2FF', '#FFD6E7', '#FFC9B9'] });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#FFE9A8', '#FFD6E7', '#DCD6FF'] });
      fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#FF9EC4'] });
      fire(0.1,  { spread: 120, startVelocity: 45, colors: ['#C8A2FF', '#FFD6E7'] });

      setTimeout(() => { activeRef.current = false; }, 5000);
    });
  }, [trigger]);

  return null;
};

/* ── Floating Hearts burst on click ─────────────────────── */
interface MiniHeartBurstProps {
  x: number;
  y: number;
  onDone: () => void;
}

export const MiniHeartBurst: React.FC<MiniHeartBurstProps> = ({ x, y, onDone }) => {
  const hearts = ['💗', '💕', '✨', '💖', '⭐', '💗'];

  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', left: x, top: y, pointerEvents: 'none', zIndex: 9999 }}
    >
      {hearts.map((h, i) => {
        const angle = (i / hearts.length) * 360;
        const dist  = 50 + Math.random() * 30;
        const dx    = Math.cos((angle * Math.PI) / 180) * dist;
        const dy    = Math.sin((angle * Math.PI) / 180) * dist;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              fontSize: 14 + Math.random() * 10,
              animation: `drift-up 1.1s ease-out forwards`,
              animationDelay: `${i * 0.06}s`,
              transform: `translate(${dx}px, ${dy}px)`,
              display: 'block',
            }}
          >
            {h}
          </span>
        );
      })}
    </div>
  );
};
