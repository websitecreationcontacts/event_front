import { useEffect, useState } from 'react';
import { X, Sparkles, PartyPopper } from 'lucide-react';

// ── Confetti piece ────────────────────────────────────────────────────────────
const COLORS = [
  '#8b5cf6', '#a78bfa', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#f43f5e', '#fbbf24',
  '#6366f1', '#14b8a6',
];

function ConfettiPiece({ index }: { index: number }) {
  const color = COLORS[index % COLORS.length];
  const left = (index * 37 + 5) % 95;
  const delay = (index * 0.15) % 2;
  const size = 6 + (index % 5) * 2;
  const duration = 2.5 + (index % 4) * 0.4;
  const isCircle = index % 3 === 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: '-10px',
        width: `${size}px`,
        height: isCircle ? `${size}px` : `${size * 1.6}px`,
        backgroundColor: color,
        borderRadius: isCircle ? '50%' : '2px',
        animation: `confettiFall ${duration}s ${delay}s ease-in infinite`,
        transform: `rotate(${index * 47}deg)`,
        opacity: 0,
      }}
    />
  );
}

// ── Countdown ring ────────────────────────────────────────────────────────────
function CountdownRing({ seconds, total }: { seconds: number; total: number }) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const progress = (seconds / total) * circ;

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="40" height="40">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#e5e7eb" strokeWidth="3" />
        <circle
          cx="20" cy="20" r={r}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          strokeDasharray={`${progress} ${circ}`}
          style={{ transition: 'stroke-dasharray 1s linear' }}
        />
      </svg>
      <span className="text-xs font-bold text-violet-600 relative z-10">{seconds}</span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
const TOTAL_SECONDS = 5;
const STORAGE_KEY = 'eh_welcomed';
const PIECES = 40;

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    // Small delay so the page renders first
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (seconds <= 0) { close(); return; }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [visible, seconds]);

  function close() {
    setClosing(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    setTimeout(() => setVisible(false), 400);
  }

  if (!visible) return null;

  return (
    <>
      {/* Inject confetti keyframes once */}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(320px) rotate(720deg); opacity: 0; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 transition-opacity duration-400 ${closing ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
        onClick={close}
      >
        {/* Card */}
        <div
          className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-400 ${closing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Confetti container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: PIECES }).map((_, i) => (
              <ConfettiPiece key={i} index={i} />
            ))}
          </div>

          {/* Header gradient */}
          <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 pt-10 pb-8 text-center relative">
            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
              <PartyPopper size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">¡EventHub ha llegado!</h2>
            <p className="text-white/80 text-sm leading-relaxed">
              La nueva plataforma para descubrir, comprar y disfrutar eventos en toda España.
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            <div className="flex flex-col gap-3 mb-6">
              {[
                { emoji: '🎟️', text: 'Compra entradas de forma rápida y segura' },
                { emoji: '🔍', text: 'Descubre eventos cerca de ti en segundos' },
                { emoji: '❤️', text: 'Guarda tus favoritos y nunca te pierdas nada' },
                { emoji: '🏢', text: 'Publica tus propios eventos como empresa' },
              ].map(({ emoji, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="text-xl">{emoji}</span>
                  <span className="text-sm text-gray-700">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={close}
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles size={15} />
                ¡Explorar ahora!
              </button>
              <CountdownRing seconds={seconds} total={TOTAL_SECONDS} />
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
