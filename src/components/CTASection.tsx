export default function CTASection() {
  return (
    <section className="py-20 px-8 bg-gradient-to-r from-violet-600 to-purple-700">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-3">¿Organizas Eventos?</h2>
        <p className="text-white/80 text-base mb-8 max-w-md mx-auto">
          Publica tus eventos y llega a miles de personas interesadas
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="bg-white text-violet-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
            Crear Evento
          </button>
          <button className="border border-white/60 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
            Saber Más
          </button>
        </div>
      </div>
    </section>
  );
}
