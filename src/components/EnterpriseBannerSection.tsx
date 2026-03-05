import { Link } from 'react-router-dom';
import { BarChart3, Users, Ticket, Globe, ArrowRight } from 'lucide-react';

const perks = [
  { icon: Ticket, label: 'Venta de entradas', desc: 'Gestión completa de tickets y aforos' },
  { icon: BarChart3, label: 'Analíticas en tiempo real', desc: 'Dashboard con métricas de tu evento' },
  { icon: Users, label: 'Gestión de asistentes', desc: 'Lista de invitados y check-in digital' },
  { icon: Globe, label: 'Alcance masivo', desc: 'Miles de usuarios activos en EventHub' },
];

export default function EnterpriseBannerSection() {
  return (
    <section className="py-20 px-8 bg-gradient-to-br from-violet-700 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              Para Organizadores
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              Lleva tus eventos<br />al siguiente nivel
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              Publica, gestiona y vende entradas para tus eventos con las herramientas más potentes del mercado. Sin comisiones ocultas, sin complicaciones.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Link
                to="/empresas"
                className="flex items-center gap-2 bg-white text-violet-700 hover:bg-gray-50 font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg"
              >
                Empezar Gratis
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/empresas"
                className="flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Ver planes y precios
              </Link>
            </div>
          </div>

          {/* Right — perks grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-md">
            {perks.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-white" />
                </div>
                <p className="text-white font-bold text-sm mb-1">{label}</p>
                <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
