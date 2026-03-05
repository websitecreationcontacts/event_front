import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { useApp } from '../context/AppContext';
import { allEvents } from '../data/mock';

export default function FavoritosPage() {
  const { favorites, isLoggedIn } = useApp();
  const favoriteEvents = allEvents.filter(e => favorites.includes(e.id));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
              <Heart size={18} className="text-red-500 fill-red-500" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Mis Favoritos</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">
            {isLoggedIn
              ? `${favoriteEvents.length} ${favoriteEvents.length === 1 ? 'evento guardado' : 'eventos guardados'}`
              : 'Inicia sesión para guardar tus eventos favoritos'}
          </p>
        </div>

        {/* Not logged in */}
        {!isLoggedIn && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
              <Heart size={36} className="text-red-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Inicia sesión para ver tus favoritos</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              Guarda los eventos que más te interesan y accede a ellos cuando quieras.
            </p>
            <Link
              to="/login"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm shadow-md"
            >
              Iniciar Sesión
            </Link>
          </div>
        )}

        {/* Logged in, no favorites */}
        {isLoggedIn && favoriteEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
              <Heart size={36} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Aún no tienes favoritos</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              Pulsa el corazón en cualquier evento para guardarlo aquí.
            </p>
            <Link
              to="/descubre"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm shadow-md"
            >
              <Search size={15} />
              Explorar Eventos
            </Link>
          </div>
        )}

        {/* Grid */}
        {isLoggedIn && favoriteEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favoriteEvents.map(event => (
              <EventCard key={event.id} event={event} variant="discover" />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
