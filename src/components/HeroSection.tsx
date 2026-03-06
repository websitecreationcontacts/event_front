import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const quickSearches = ['Conciertos en Madrid', 'Festivales de verano', 'Teatro y comedia'];

const CONFETTI_COLORS = [
  '#8b5cf6', '#a78bfa', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#f43f5e', '#fbbf24',
  '#6366f1', '#14b8a6',
];

function ConfettiPiece({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = (index * 31 + 2) % 98;
  const delay = (index * 0.18) % 3.5;
  const size = 5 + (index % 5) * 2;
  const duration = 2 + (index % 5) * 0.5;
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
        transform: `rotate(${index * 53}deg)`,
        opacity: 0,
      }}
    />
  );
}

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/descubre?buscar=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickSearch = (term: string) => {
    navigate(`/descubre?buscar=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative min-h-[520px] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1400&h=600&fit=crop&auto=format)',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-16 w-full">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">
            Descubre Eventos<br />
            <span
              style={{ fontFamily: "'Dancing Script', cursive", background: 'linear-gradient(90deg, #a78bfa, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              className="text-5xl md:text-6xl"
            >
              Increíbles
            </span>{' '}
            <span className="text-white">Cerca de Ti</span>
          </h1>
          <p className="text-white/80 text-base mb-6 leading-relaxed">
            Encuentra conciertos, conferencias, festivales y más. Compra tickets de forma rápida y segura.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-xl overflow-hidden shadow-xl max-w-md mb-4">
            <input
              type="text"
              placeholder="¿Qué evento buscas?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3.5 text-sm text-gray-700 outline-none placeholder-gray-400"
            />
            <button className="btn-primary !px-5 !py-3.5 !rounded-none !m-0 flex items-center gap-2 text-sm">
              <Search size={16} />
              Buscar
            </button>
          </form>

          {/* Quick search suggestions */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/60 text-xs">Popular:</span>
            {quickSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleQuickSearch(term)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white/90 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200 backdrop-blur-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Confetti falling from the top of the image */}
      <div className="absolute top-0 left-0 right-0 h-0 pointer-events-none" style={{ zIndex: 15 }}>
        {Array.from({ length: 35 }).map((_, i) => (
          <ConfettiPiece key={i} index={i} />
        ))}
      </div>
    </section>
  );
}
