import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Laura Martínez',
    role: 'Asistente habitual',
    avatar: 'LM',
    color: 'bg-violet-500',
    rating: 5,
    text: 'Llevo dos años usando EventHub y es la mejor plataforma para descubrir eventos en Madrid. Encontré conciertos que nunca hubiera conocido por otro medio. ¡Totalmente recomendada!',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Organizador de eventos',
    avatar: 'CR',
    color: 'bg-blue-500',
    rating: 5,
    text: 'Como organizador, EventHub nos ha permitido llegar a un público mucho mayor. Las herramientas de gestión son increíbles y el soporte siempre responde rápido.',
  },
  {
    name: 'Sofía Pérez',
    role: 'Fanática del teatro',
    avatar: 'SP',
    color: 'bg-pink-500',
    rating: 5,
    text: 'La compra de entradas es súper sencilla y segura. Me encanta poder filtrar por categoría y ciudad. Desde que uso EventHub no me pierdo ninguna obra de teatro en Barcelona.',
  },
  {
    name: 'Alejandro Torres',
    role: 'DJ y productor',
    avatar: 'AT',
    color: 'bg-orange-500',
    rating: 4,
    text: 'Publiqué mi primer evento en EventHub y en 48 horas agotamos entradas. La visibilidad que te da la plataforma es impresionante. Sin duda seguiré usándola.',
  },
  {
    name: 'Marta González',
    role: 'Estudiante universitaria',
    avatar: 'MG',
    color: 'bg-green-500',
    rating: 5,
    text: 'Me encanta que hay muchos eventos gratuitos y económicos. Perfecto para estudiantes que quieren disfrutar de la cultura sin gastar mucho. La app es muy intuitiva.',
  },
  {
    name: 'Javier Sánchez',
    role: 'Amante del deporte',
    avatar: 'JS',
    color: 'bg-teal-500',
    rating: 5,
    text: 'Conseguí entradas para el Clásico a través de EventHub cuando ya no quedaban en otros sitios. El proceso fue rapidísimo y seguro. Repeat customer sin duda.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Opiniones reales
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Lo que dicen nuestros usuarios</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span><strong className="text-gray-900">4.9</strong> / 5 basado en +2.400 reseñas</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
              <Stars count={t.rating} />
              <p className="text-gray-600 text-sm leading-relaxed my-4 flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
