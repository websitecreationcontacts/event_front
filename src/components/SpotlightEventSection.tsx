import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Zap } from 'lucide-react';

export default function SpotlightEventSection() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Zap size={18} className="text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-amber-500 uppercase tracking-wider">Evento de la Semana</span>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Background image */}
          <div className="relative h-[420px] md:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&h=600&fit=crop&auto=format"
              alt="Festival Electrónico Madrid 2024"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-14 max-w-2xl">
                <span className="inline-block bg-violet-600 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                  Música · Electrónica
                </span>

                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                  Festival Electrónico<br />Madrid 2024
                </h2>

                <div className="flex flex-wrap gap-4 mb-6 text-sm text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-violet-400" />
                    15 Febrero 2024
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-violet-400" />
                    20:00 – 02:00
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-violet-400" />
                    IFEMA Center, Madrid
                  </span>
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-lg">
                  La experiencia musical más electrizante del año. Martin Garrix, Armin van Buuren, Tiësto y Calvin Harris en un mismo escenario. Zonas VIP, food trucks y efectos LED de última generación.
                </p>

                <div className="flex items-center gap-4">
                  <Link
                    to="/evento/1"
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg"
                  >
                    Comprar Entradas
                    <ArrowRight size={15} />
                  </Link>
                  <div className="text-white">
                    <span className="text-xs text-white/60">Desde</span>
                    <p className="text-2xl font-extrabold">45€</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Artist chips */}
            <div className="absolute bottom-6 right-6 hidden md:flex flex-col gap-2">
              {['Martin Garrix', 'Armin van Buuren', 'Tiësto', 'Calvin Harris'].map((artist) => (
                <span key={artist} className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                  {artist}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
