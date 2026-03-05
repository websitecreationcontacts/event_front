import { Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[520px] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&h=600&fit=crop&auto=format)',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-16 w-full">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Descubre Eventos Increíbles<br />Cerca de Ti
          </h1>
          <p className="text-white/80 text-base mb-8 leading-relaxed">
            Encuentra conciertos, conferencias, festivales y más. Compra tickets de forma rápida y segura.
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-xl max-w-md">
            <input
              type="text"
              placeholder="¿Qué evento buscas?"
              className="flex-1 px-4 py-3.5 text-sm text-gray-700 outline-none placeholder-gray-400"
            />
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3.5 flex items-center gap-2 text-sm font-semibold transition-colors">
              <Search size={16} />
              Buscar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
