import { Link } from 'react-router-dom';
import {
  Music,
  PartyPopper,
  Mic,
  Trophy,
  Palette,
  UtensilsCrossed,
  Laugh,
  Guitar,
  Theater,
  Dumbbell,
  BookOpen,
  Film,
  Gamepad2,
  Sword,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { allEvents } from '../data/mock';

// ── Mock data ──────────────────────────────────────────────────────────────────

const mainCategories = [
  {
    id: 'musica',
    name: 'Música',
    badge: 'Música',
    description: 'Festivales, conciertos y noches de DJ para todos los gustos musicales.',
    icon: Music,
    color: 'text-violet-600',
    gradient: 'from-violet-600 to-purple-700',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
    count: 342,
    tags: ['Festival', 'Concierto', 'DJ', 'Rock', 'Pop', 'Electrónica'],
  },
  {
    id: 'deportes',
    name: 'Deportes',
    badge: 'Deportes',
    description: 'Partidos, competiciones y eventos deportivos de todas las disciplinas.',
    icon: Trophy,
    color: 'text-green-600',
    gradient: 'from-green-600 to-emerald-700',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=400&fit=crop&auto=format',
    count: 218,
    tags: ['Fútbol', 'Baloncesto', 'Tenis', 'Atletismo', 'Padel'],
  },
  {
    id: 'conferencias',
    name: 'Conferencias',
    badge: 'Conferencia',
    description: 'Cumbres, workshops y eventos de networking para profesionales.',
    icon: Mic,
    color: 'text-blue-600',
    gradient: 'from-blue-600 to-indigo-700',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format',
    count: 156,
    tags: ['Tech', 'Marketing', 'Emprendimiento', 'Salud', 'Finanzas'],
  },
  {
    id: 'arte',
    name: 'Arte',
    badge: 'Arte',
    description: 'Exposiciones, galerías, instalaciones y eventos de arte contemporáneo.',
    icon: Palette,
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-rose-600',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
    count: 134,
    tags: ['Exposición', 'Galería', 'Fotografía', 'Pintura', 'Escultura'],
  },
  {
    id: 'gastronomia',
    name: 'Gastronomía',
    badge: 'Gastronomía',
    description: 'Festivales de comida, catas, showcookings y experiencias culinarias.',
    icon: UtensilsCrossed,
    color: 'text-amber-500',
    gradient: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format',
    count: 98,
    tags: ['Cata de vinos', 'Showcooking', 'Street food', 'Fine dining'],
  },
  {
    id: 'fiestas',
    name: 'Fiestas',
    badge: 'Fiesta',
    description: 'Fiestas temáticas, rooftops, afterparties y eventos de ocio nocturno.',
    icon: PartyPopper,
    color: 'text-red-500',
    gradient: 'from-red-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop&auto=format',
    count: 187,
    tags: ['Club', 'Rooftop', 'Temática', 'Carnaval', 'Año nuevo'],
  },
  {
    id: 'friki',
    name: 'Friki & TCG',
    badge: 'Friki',
    description: 'Torneos de cartas coleccionables, Comic Con, cosplay y cultura geek en general.',
    icon: Gamepad2,
    color: 'text-fuchsia-600',
    gradient: 'from-fuchsia-600 to-purple-700',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&h=400&fit=crop&auto=format',
    count: 64,
    tags: ['Pokémon TCG', 'Magic', 'Yu-Gi-Oh!', 'Comic Con', 'Cosplay', 'Rol'],
  },
];

const secondaryCategories = [
  { name: 'Teatro', icon: Theater, color: 'text-rose-600', bg: 'bg-rose-100', count: 89 },
  { name: 'Comedia', icon: Laugh, color: 'text-yellow-500', bg: 'bg-yellow-100', count: 64 },
  { name: 'Jazz', icon: Guitar, color: 'text-indigo-500', bg: 'bg-indigo-100', count: 47 },
  { name: 'Fitness', icon: Dumbbell, color: 'text-teal-600', bg: 'bg-teal-100', count: 73 },
  { name: 'Literatura', icon: BookOpen, color: 'text-orange-500', bg: 'bg-orange-100', count: 38 },
  { name: 'Cine', icon: Film, color: 'text-cyan-600', bg: 'bg-cyan-100', count: 52 },
  { name: 'Rol & Dados', icon: Sword, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100', count: 29 },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      {/* HERO */}
      <section className="bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 px-8 pt-16 pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={12} />
            Más de 1,300 eventos disponibles
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Explora por Categorías
          </h1>
          <p className="text-white/75 text-base leading-relaxed max-w-xl mx-auto">
            Desde festivales de música hasta catas de vino. Encuentra el tipo de evento que más te apasiona y descubre lo mejor de tu ciudad.
          </p>
        </div>
      </section>

      {/* MAIN CATEGORIES GRID */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Categorías Principales</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainCategories.map((cat) => {
              const Icon = cat.icon;
              const events = allEvents.filter((e) => e.badge === cat.badge).slice(0, 1);
              return (
                <Link
                  key={cat.id}
                  to={`/descubre`}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent`} />

                    {/* Event count badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      {cat.count} eventos
                    </div>

                    {/* Icon + Name */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-extrabold text-lg leading-none">{cat.name}</h3>
                        <p className="text-white/70 text-xs mt-0.5">{events.length > 0 ? `Próximo: ${events[0]?.date}` : 'Varios eventos'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="bg-white p-4">
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{cat.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cat.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-violet-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
                      Ver eventos
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECONDARY CATEGORIES */}
      <section className="py-14 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Más Categorías</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {secondaryCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to="/descubre"
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md hover:border-violet-200 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-full ${cat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className={cat.color} />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">{cat.name}</p>
                  <p className="text-gray-400 text-xs">{cat.count} eventos</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVENTS PER CATEGORY */}
      {mainCategories.slice(0, 3).map((cat) => {
        const Icon = cat.icon;
        const events = allEvents.filter((e) => e.badge === cat.badge || e.category === cat.name);
        if (events.length === 0) return null;
        return (
          <section key={cat.id} className="py-14 px-8 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{cat.name}</h2>
                    <p className="text-gray-500 text-xs">{cat.count} eventos disponibles</p>
                  </div>
                </div>
                <Link
                  to="/descubre"
                  className="flex items-center gap-1.5 text-violet-600 hover:text-violet-700 text-sm font-semibold transition-colors"
                >
                  Ver todos
                  <ChevronRight size={15} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} variant="discover" />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 px-8 bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-white/75 text-sm mb-8 max-w-md mx-auto">
            Usa nuestro buscador con filtros avanzados para encontrar el evento perfecto por fecha, ciudad, precio y mucho más.
          </p>
          <Link
            to="/descubre"
            className="inline-flex items-center gap-2 bg-white text-violet-700 hover:bg-gray-50 font-bold px-8 py-3.5 rounded-xl transition-colors text-sm shadow-lg"
          >
            Explorar todos los eventos
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
