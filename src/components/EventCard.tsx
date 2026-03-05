import { MapPin, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Event } from '../data/mock';
import { badgeColors } from '../data/mock';
import { useApp } from '../context/AppContext';

interface EventCardProps {
  event: Event;
  variant?: 'home' | 'discover';
}

export default function EventCard({ event, variant = 'home' }: EventCardProps) {
  const badgeColor = badgeColors[event.badge] ?? 'bg-gray-600';
  const { isFavorite, toggleFavorite } = useApp();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      {/* Image */}
      <Link to={`/evento/${event.id}`} className="block relative overflow-hidden h-44">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`${badgeColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
            {event.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="bg-white text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            {event.date}
          </span>
          {variant === 'discover' && (
            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(event.id); }}
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors"
            >
              <Heart
                size={14}
                className={isFavorite(event.id) ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500 transition-colors'}
              />
            </button>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/evento/${event.id}`}>
          <h3 className="font-bold text-gray-900 text-base mb-1.5 line-clamp-1 hover:text-violet-600 transition-colors">{event.title}</h3>
        </Link>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
          <MapPin size={13} />
          <span className="line-clamp-1">
            {event.venue}, {event.city}
          </span>
        </div>
        {variant === 'discover' && event.timeStart && (
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <Clock size={13} />
            <span>{event.timeStart} - {event.timeEnd}</span>
          </div>
        )}
        <div className={`flex items-center justify-between ${variant === 'home' ? 'mt-4' : 'mt-3'}`}>
          <span className={`font-semibold text-sm ${event.price === null ? 'text-green-600' : 'text-gray-900'}`}>
            {event.priceLabel}
          </span>
          <Link
            to={`/evento/${event.id}`}
            className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {event.buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
