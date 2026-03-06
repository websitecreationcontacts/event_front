import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Zap, Ticket } from 'lucide-react';

export default function SpotlightEventSection() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Zap size={18} className="text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-amber-500 uppercase tracking-wider">Evento de la Semana</span>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex h-[540px] md:h-[600px]">

            {/* ── LEFT: Main event ─────────────────────────────────────── */}
            <div className="relative flex-[3] min-w-0">
              <img
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=700&fit=crop&auto=format"
                alt="Festival Electrónico Madrid 2024"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

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
                      className="btn-primary !font-bold !px-6 !py-3 !text-sm flex items-center gap-2 !shadow-lg"
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
              <div className="absolute bottom-6 left-8 md:left-14 hidden md:flex flex-row gap-2">
                {['Martin Garrix', 'Armin van Buuren', 'Tiësto', 'Calvin Harris'].map((artist) => (
                  <span key={artist} className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                    {artist}
                  </span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Second event ──────────────────────────────────── */}
            <div className="relative flex-[1.4] min-w-0 hidden lg:block border-l-2 border-white/10">
              <img
                src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=700&fit=crop&auto=format"
                alt="Vetusta Morla en Vivo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15" />

              {/* "Próximo" badge */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  <Ticket size={10} />
                  Próximo
                </span>
              </div>

              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-2 block">Concierto</span>
                <h3 className="text-white text-xl font-extrabold leading-tight mb-3">
                  Vetusta Morla<br />en Vivo
                </h3>
                <div className="flex flex-col gap-1.5 mb-4 text-xs text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-orange-400" />
                    13 Febrero · 21:00
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={11} className="text-orange-400" />
                    Palacio de la Música, Valencia
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-extrabold text-lg">65€</span>
                  <Link
                    to="/evento/3"
                    className="text-xs font-bold bg-white/20 hover:bg-white/35 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                  >
                    Ver más
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
