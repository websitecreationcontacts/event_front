import { useState, useEffect } from 'react';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { allEvents } from '../data/mock';
import { getPublicEvents } from '../store/eventStore';

const dateOptions = ['Cualquier fecha', 'Hoy', 'Este fin de semana', 'Esta semana', 'Este mes'];
const cityOptions = ['Todas las ciudades', 'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'];
const categoryOptions = ['Todas las categorías', 'Música', 'Concierto', 'Conferencia', 'Deportes', 'Arte', 'Gastronomía', 'Teatro', 'Comedia', 'Jazz', 'Fiesta'];
const priceOptions = ['Cualquier precio', 'Gratis', 'Menos de 30€', '30€ - 80€', 'Más de 80€'];
const sortOptions = ['Popularidad', 'Fecha: más próxima', 'Precio: menor', 'Precio: mayor'];

// Map home-page category names → event badge/category values
const categoryGroupMap: Record<string, string[]> = {
  Conciertos: ['Concierto', 'Música', 'Jazz'],
  Fiestas: ['Fiesta'],
  Conferencias: ['Conferencia'],
  Deportes: ['Deportes'],
  Arte: ['Arte', 'Teatro', 'Comedia'],
  Gastronomía: ['Gastronomía'],
};

const monthMap: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  Ene: 0, Abr: 3, Mayo: 4, Jun2: 5, Ago: 7, Sep2: 8, Oct2: 9, Nov2: 10, Dic: 11,
};

function parseEventDate(dateStr: string): Date | null {
  const parts = dateStr.trim().split(' ');
  if (parts.length < 2) return null;
  const day = parseInt(parts[0], 10);
  const monthStr = parts[1];
  const monthIdx = monthMap[monthStr];
  if (isNaN(day) || monthIdx === undefined) return null;
  const year = new Date().getFullYear();
  return new Date(year, monthIdx, day);
}

function matchesDateFilter(dateStr: string, filter: string): boolean {
  if (filter === 'Cualquier fecha') return true;
  const eventDate = parseEventDate(dateStr);
  if (!eventDate) return true;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1);

  if (filter === 'Hoy') {
    return eventDate >= today && eventDate <= todayEnd;
  }
  if (filter === 'Este fin de semana') {
    const day = today.getDay(); // 0=Sun, 6=Sat
    const diffToSat = ((6 - day + 7) % 7) || 7;
    const sat = new Date(today.getTime() + diffToSat * 24 * 60 * 60 * 1000);
    const sun = new Date(sat.getTime() + 24 * 60 * 60 * 1000);
    const sunEnd = new Date(sun.getTime() + 24 * 60 * 60 * 1000 - 1);
    return eventDate >= sat && eventDate <= sunEnd;
  }
  if (filter === 'Esta semana') {
    const day = today.getDay();
    const startOfWeek = new Date(today.getTime() - ((day + 6) % 7) * 24 * 60 * 60 * 1000);
    const endOfWeek = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000 - 1);
    return eventDate >= startOfWeek && eventDate <= endOfWeek;
  }
  if (filter === 'Este mes') {
    return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
  }
  return true;
}

interface FilterSelectProps {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

function FilterSelect({ value, options, onChange }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-medium pl-3 pr-8 py-2 rounded-lg cursor-pointer hover:border-violet-400 focus:outline-none focus:border-violet-500 transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
}

export default function DescubrePage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('Cualquier fecha');
  const [cityFilter, setCityFilter] = useState('Todas las ciudades');
  const [categoryFilter, setCategoryFilter] = useState('Todas las categorías');
  const [priceFilter, setPriceFilter] = useState('Cualquier precio');
  const [sortBy, setSortBy] = useState('Popularidad');
  const [visibleCount, setVisibleCount] = useState(9);

  // Read URL params on mount / when they change
  useEffect(() => {
    const buscar = searchParams.get('buscar');
    const categoria = searchParams.get('categoria');
    if (buscar) setSearch(buscar);
    if (categoria) {
      // If it's a home-page group name, pick first badge value to display; filtering uses the group map
      setCategoryFilter(categoria);
    }
    setVisibleCount(9);
  }, [searchParams]);

  // Merge static events with active company-created events (deduplicate by id)
  const storeEvents = getPublicEvents();
  const storeIds = new Set(storeEvents.map((e) => e.id));
  const mergedEvents = [...storeEvents, ...allEvents.filter((e) => !storeIds.has(e.id))];

  const filtered = mergedEvents.filter((ev) => {
    const q = search.toLowerCase();
    const matchSearch =
      q === '' ||
      ev.title.toLowerCase().includes(q) ||
      ev.city.toLowerCase().includes(q) ||
      ev.venue.toLowerCase().includes(q) ||
      ev.category.toLowerCase().includes(q) ||
      ev.badge.toLowerCase().includes(q);

    const matchCity = cityFilter === 'Todas las ciudades' || ev.city === cityFilter;

    let matchCategory = categoryFilter === 'Todas las categorías';
    if (!matchCategory) {
      const group = categoryGroupMap[categoryFilter];
      if (group) {
        matchCategory = group.includes(ev.badge) || group.includes(ev.category);
      } else {
        matchCategory = ev.badge === categoryFilter || ev.category === categoryFilter;
      }
    }

    const matchDate = matchesDateFilter(ev.date, dateFilter);

    const matchPrice =
      priceFilter === 'Cualquier precio' ||
      (priceFilter === 'Gratis' && ev.price === null) ||
      (priceFilter === 'Menos de 30€' && ev.price !== null && ev.price < 30) ||
      (priceFilter === '30€ - 80€' && ev.price !== null && ev.price >= 30 && ev.price <= 80) ||
      (priceFilter === 'Más de 80€' && ev.price !== null && ev.price > 80);

    return matchSearch && matchCity && matchCategory && matchDate && matchPrice;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Fecha: más próxima') {
      const da = parseEventDate(a.date);
      const db = parseEventDate(b.date);
      if (!da || !db) return 0;
      return da.getTime() - db.getTime();
    }
    if (sortBy === 'Precio: menor') {
      return (a.price ?? 0) - (b.price ?? 0);
    }
    if (sortBy === 'Precio: mayor') {
      return (b.price ?? 0) - (a.price ?? 0);
    }
    return 0; // Popularidad = default order
  });

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-10">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Descubre <span className="title-accent">Eventos</span></h1>
          <p className="text-gray-500 text-sm">Encuentra los eventos perfectos para ti</p>
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisibleCount(9); }}
            placeholder="Buscar por nombre, ciudad, lugar..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors shadow-sm"
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="flex items-center gap-1.5 text-gray-500">
            <SlidersHorizontal size={15} />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          <FilterSelect value={dateFilter} options={dateOptions} onChange={(v) => { setDateFilter(v); setVisibleCount(9); }} />
          <FilterSelect value={cityFilter} options={cityOptions} onChange={(v) => { setCityFilter(v); setVisibleCount(9); }} />
          <FilterSelect value={categoryFilter} options={['Todas las categorías', ...Object.keys(categoryGroupMap), ...categoryOptions.slice(1).filter(c => !Object.keys(categoryGroupMap).includes(c))]} onChange={(v) => { setCategoryFilter(v); setVisibleCount(9); }} />
          <FilterSelect value={priceFilter} options={priceOptions} onChange={(v) => { setPriceFilter(v); setVisibleCount(9); }} />
        </div>

        {/* Results bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Mostrando <span className="font-semibold text-gray-800">{sorted.length}</span> eventos
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Ordenar por:</span>
            <FilterSelect value={sortBy} options={sortOptions} onChange={setSortBy} />
          </div>
        </div>

        {/* Event grid */}
        {visible.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {visible.map((event) => (
                <EventCard key={event.id} event={event} variant="discover" />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + 6)}
                  className="bg-white border border-gray-200 hover:border-violet-400 text-gray-700 hover:text-violet-600 font-semibold text-sm px-8 py-3 rounded-xl transition-colors shadow-sm"
                >
                  Cargar más eventos
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium">No se encontraron eventos</p>
            <p className="text-sm mt-1">Prueba cambiando los filtros</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
