import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredEvents } from '../data/mock';
import EventCard from './EventCard';

export default function EventsSection() {
  return (
    <section className="py-16 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Eventos Destacados</h2>
          <Link
            to="/descubre"
            className="flex items-center gap-1.5 text-violet-600 hover:text-violet-700 text-sm font-semibold transition-colors"
          >
            Ver todos los eventos
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="home" />
          ))}
        </div>
      </div>
    </section>
  );
}
