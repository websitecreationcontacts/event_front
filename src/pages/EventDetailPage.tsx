import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Check,
  Minus,
  Plus,
  Share2,
  Facebook,
  Twitter,
  Heart,
  ChevronRight,
  ShoppingCart,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { getEventDetail, allEvents, badgeColors, type EventDetail } from '../data/mock';
import { getEvents, getPublicEvents } from '../store/eventStore';
import { addToCart } from '../store/cartStore';
import { useApp } from '../context/AppContext';

function buildDetailFromStore(id: string): EventDetail | undefined {
  const ce = getEvents().find((e) => e.id === id);
  if (!ce) return undefined;
  const DEFAULT_IMAGES: Record<string, string> = {
    Música: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&h=500&fit=crop&auto=format',
    Conferencia: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&h=500&fit=crop&auto=format',
    Concierto: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1400&h=500&fit=crop&auto=format',
    Deportes: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1400&h=500&fit=crop&auto=format',
    Arte: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1400&h=500&fit=crop&auto=format',
    Gastronomía: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=500&fit=crop&auto=format',
    Jazz: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1400&h=500&fit=crop&auto=format',
    Tecnología: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=500&fit=crop&auto=format',
    Corporativo: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&h=500&fit=crop&auto=format',
    Otro: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&h=500&fit=crop&auto=format',
  };
  const heroImage = ce.image || DEFAULT_IMAGES[ce.category] || DEFAULT_IMAGES['Otro'];
  const allPub = getPublicEvents();
  return {
    id: ce.id,
    title: ce.title,
    category: ce.category,
    categoryColor: ce.categoryColor,
    date: ce.date,
    venue: ce.venue,
    city: ce.city,
    price: ce.price ?? null,
    priceLabel: ce.price ? `Desde ${ce.price}€` : 'Gratis',
    buttonLabel: 'Comprar',
    image: heroImage,
    badge: ce.category,
    fullDate: ce.date,
    heroImage,
    description: ce.description
      ? [ce.description]
      : [`Disfruta de una experiencia única en ${ce.title} — uno de los eventos más esperados en ${ce.city}.`],
    includes: ['Acceso al recinto', 'Programa completo del evento'],
    artists: [],
    tickets: [
      { id: 't1', name: 'Entrada General', description: 'Acceso estándar', price: ce.price ?? 0, available: ce.ticketsTotal - ce.ticketsSold },
    ],
    similarEventIds: allPub.filter((e) => e.id !== id && e.category === ce.category).slice(0, 3).map((e) => e.id),
  };
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const event = getEventDetail(id ?? '') ?? buildDetailFromStore(id ?? '');

  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { isFavorite, toggleFavorite, userRole, showToast, refreshCartCount } = useApp();

  function buildCartItems() {
    if (!event) return [];
    return event.tickets
      .filter((t) => (quantities[t.id] ?? 0) > 0)
      .map((t) => ({
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.fullDate,
        eventVenue: event.venue,
        eventCity: event.city,
        eventImage: event.heroImage,
        ticketId: t.id,
        ticketName: t.name,
        ticketDescription: t.description,
        ticketPrice: t.price,
        quantity: quantities[t.id] ?? 0,
      }));
  }

  function handleAddToCart() {
    const items = buildCartItems();
    if (items.length === 0) return;
    addToCart(items);
    refreshCartCount();
    const total = items.reduce((s, i) => s + i.quantity, 0);
    showToast(`${total} entrada${total > 1 ? 's' : ''} añadida${total > 1 ? 's' : ''} al carrito`, 'success');
    setQuantities({});
  }

  function handleBuyNow() {
    const items = buildCartItems();
    if (items.length === 0) return;
    addToCart(items);
    refreshCartCount();
    navigate('/carrito');
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar transparent={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 mb-2">Evento no encontrado</p>
            <Link to="/descubre" className="text-violet-600 hover:underline text-sm">
              Volver a eventos
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const badgeColor = badgeColors[event.badge] ?? 'bg-gray-600';
  const similarEvents = allEvents.filter((e) => event.similarEventIds.includes(e.id));

  function getQty(id: string) { return quantities[id] ?? 0; }
  function setQty(id: string, val: number) {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, val) }));
  }

  const totalEntradas = event.tickets.reduce((sum, t) => sum + getQty(t.id), 0);
  const total = event.tickets.reduce((sum, t) => sum + t.price * getQty(t.id), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-sm text-gray-500">
          <Link to="/" className="hover:text-violet-600 transition-colors">Inicio</Link>
          <ChevronRight size={14} />
          <Link to="/descubre" className="hover:text-violet-600 transition-colors">Eventos</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium truncate">{event.title}</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-8">
        {/* Hero image */}
        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
          <img
            src={event.heroImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className={`${badgeColor} text-white text-sm font-semibold px-3 py-1.5 rounded-full`}>
              {event.badge}
            </span>
          </div>
          <button
            onClick={() => toggleFavorite(event.id)}
            className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <Heart size={16} className={isFavorite(event.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
          </button>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{event.title}</h1>

            {/* Meta info */}
            <div className="flex flex-wrap gap-5 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-violet-500" />
                <span>{event.fullDate}</span>
              </div>
              {event.timeStart && (
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-violet-500" />
                  <span>{event.timeStart} - {event.timeEnd}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-violet-500" />
                <span>{event.venue}, {event.city}</span>
              </div>
            </div>

            {/* Description */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Descripción del Evento</h2>
              <div className="space-y-3">
                {event.description.map((para, i) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed">{para}</p>
                ))}
              </div>
            </section>

            {/* Includes */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Lo que incluye tu ticket</h2>
              <ul className="space-y-2">
                {event.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-violet-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Artists */}
            {event.artists.length > 0 && (
              <section className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Line-up de Artistas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.artists.map((artist) => (
                    <div
                      key={artist.id}
                      className="flex items-center gap-3 bg-white rounded-xl p-3.5 shadow-sm border border-gray-100"
                    >
                      <div className={`w-11 h-11 rounded-full ${artist.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                        {artist.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{artist.name}</p>
                        <p className="text-gray-500 text-xs">
                          {artist.role}{artist.time ? ` · ${artist.time}` : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Similar events */}
            {similarEvents.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Eventos Similares</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarEvents.map((ev) => (
                    <EventCard key={ev.id} event={ev} variant="discover" />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN — sticky sidebar */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24">
              {userRole === 'company' ? (
                /* Company account — cannot purchase tickets */
                <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-amber-500">
                      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">Cuenta de empresa</h3>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Para comprar entradas necesitas una cuenta de cliente. Las cuentas de empresa solo pueden gestionar y publicar eventos.
                  </p>
                  <Link
                    to="/login"
                    className="block w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-md mb-3"
                  >
                    Iniciar sesión como cliente
                  </Link>
                  <Link
                    to="/registro"
                    className="block w-full border border-gray-200 hover:border-violet-400 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    Crear cuenta de cliente
                  </Link>
                  {/* Share */}
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-3 text-center">Compartir evento</p>
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                        <Facebook size={13} />
                        Facebook
                      </button>
                      <button className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                        <Twitter size={13} />
                        Twitter
                      </button>
                      <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                        <Share2 size={13} />
                        Copiar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Normal purchase sidebar */
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <p className="text-2xl font-extrabold text-gray-900 mb-5">
                    Desde {event.tickets[0]?.price ?? event.price}€
                  </p>

                  {/* Ticket types with individual quantity */}
                  <div className="space-y-3 mb-5">
                    {event.tickets.map((t) => {
                      const qty = getQty(t.id);
                      return (
                        <div
                          key={t.id}
                          className={`p-3.5 rounded-xl border-2 transition-colors ${
                            qty > 0 ? 'border-violet-500 bg-violet-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                              <p className="text-gray-500 text-xs mt-0.5">{t.description}</p>
                            </div>
                            <span className="font-bold text-gray-900 text-sm shrink-0">{t.price}€</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {qty > 0 ? `${(t.price * qty).toFixed(2).replace('.00', '')}€` : 'Sin seleccionar'}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setQty(t.id, qty - 1)}
                                className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
                                  qty === 0
                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                    : 'border-gray-300 hover:border-violet-400 text-gray-600'
                                }`}
                                disabled={qty === 0}
                              >
                                <Minus size={13} />
                              </button>
                              <span className="font-semibold text-gray-900 w-5 text-center text-sm">{qty}</span>
                              <button
                                onClick={() => setQty(t.id, qty + 1)}
                                className="w-7 h-7 rounded-full border border-gray-300 hover:border-violet-400 text-gray-600 flex items-center justify-center transition-colors"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Total */}
                  {totalEntradas > 0 && (
                    <div className="border-t border-gray-100 pt-4 mb-4 space-y-1.5">
                      {event.tickets.filter(t => getQty(t.id) > 0).map(t => (
                        <div key={t.id} className="flex items-center justify-between text-xs text-gray-500">
                          <span>{t.name} × {getQty(t.id)}</span>
                          <span>{(t.price * getQty(t.id)).toFixed(2).replace('.00', '')}€</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between text-sm font-bold text-gray-900 pt-1.5 border-t border-gray-100">
                        <span>Total ({totalEntradas} {totalEntradas === 1 ? 'entrada' : 'entradas'})</span>
                        <span>{total.toFixed(2).replace('.00', '')}€</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mt-1">
                    <button
                      onClick={handleAddToCart}
                      disabled={totalEntradas === 0}
                      className={`w-full font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 ${
                        totalEntradas > 0
                          ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={15} />
                      {totalEntradas === 0 ? 'Selecciona entradas' : 'Añadir al carrito'}
                    </button>
                    {totalEntradas > 0 && (
                      <button
                        onClick={handleBuyNow}
                        className="w-full border-2 border-violet-500 text-violet-600 hover:bg-violet-50 font-bold py-3 rounded-xl transition-colors text-sm"
                      >
                        Comprar ahora
                      </button>
                    )}
                  </div>

                  <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                    <Check size={11} />
                    Ticket disponible · Compra segura
                  </p>

                  {/* Share */}
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-3 text-center">Compartir evento</p>
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                        <Facebook size={13} />
                        Facebook
                      </button>
                      <button className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                        <Twitter size={13} />
                        Twitter
                      </button>
                      <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                        <Share2 size={13} />
                        Copiar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
