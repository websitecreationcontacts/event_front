import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
  { icon: '🎉', text: 'Festival Electrónico Madrid · 15 Feb · IFEMA Center', cta: '¡Entradas ya!' },
  { icon: '⚡', text: 'Tech Summit 2024 · 12 Feb · Barcelona · Palacio de Congresos', cta: 'Ver más' },
  { icon: '🎵', text: 'Vetusta Morla en Vivo · 13 Feb · Valencia · ¡Últimas plazas!', cta: 'Comprar' },
  { icon: '🏆', text: 'Real Madrid vs Barcelona · 5 Mar · Santiago Bernabéu', cta: 'Entradas' },
  { icon: '🎭', text: 'Teatro Royal · 20 Mar · Madrid · Temporada de primavera', cta: 'Ver' },
  { icon: '🎸', text: 'Rock en el Parque · 22 Mar · Sevilla · Festival gratuito', cta: 'Info' },
];

// Duplicate for seamless loop
const track = [...items, ...items, ...items];

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  if (dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          animation: marquee 32s linear infinite;
          white-space: nowrap;
          display: flex;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 overflow-hidden z-[60]">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

        <div className="flex items-center h-9">
          {/* Left label */}
          <div className="flex items-center gap-1.5 px-3 bg-white/15 h-full flex-shrink-0 border-r border-white/20">
            <Sparkles size={12} className="text-amber-300" />
            <span className="text-white text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Próximos eventos</span>
          </div>

          {/* Scrolling track */}
          <div className="flex-1 overflow-hidden cursor-default">
            <div className="marquee-track">
              {track.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-6 text-[12px] font-medium text-white/90 select-none group"
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                  <button
                    onClick={() => navigate('/descubre')}
                    className="text-[11px] font-bold bg-white/20 hover:bg-white/35 text-white px-2 py-0.5 rounded-full transition-colors"
                  >
                    {item.cta}
                  </button>
                  <span className="text-white/30 ml-2">·</span>
                </span>
              ))}
            </div>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 px-3 h-full flex items-center hover:bg-white/10 transition-colors border-l border-white/20"
          >
            <X size={12} className="text-white/70" />
          </button>
        </div>
      </div>
    </>
  );
}
