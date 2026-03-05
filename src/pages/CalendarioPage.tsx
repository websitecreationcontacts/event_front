import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  ListFilter,
  LayoutGrid,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { allEvents, badgeColors } from '../data/mock';
import type { Event } from '../data/mock';

// ── Helpers ────────────────────────────────────────────────────────────────────

// Map mock events to a fixed date in 2025 so the calendar shows real dots
const EVENT_DATES: Record<string, string> = {
  '1':  '2025-02-08',
  '2':  '2025-02-12',
  '3':  '2025-02-13',
  '4':  '2025-03-05',
  '5':  '2025-03-18',
  '6':  '2025-03-08',
  '7':  '2025-03-15',
  '8':  '2025-03-12',
  '9':  '2025-03-18',
  '10': '2025-02-20',
  '11': '2025-03-01',
  '12': '2025-03-15',
};

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS   = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // Returns 0=Mon … 6=Sun
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function toKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CalendarioPage() {
  const today = new Date();
  const [year, setYear]       = useState(today.getFullYear());
  const [month, setMonth]     = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView]       = useState<'month' | 'list'>('month');
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Build a map: dateKey → Event[]
  const eventsByDate: Record<string, Event[]> = {};
  allEvents.forEach((ev) => {
    const dateKey = EVENT_DATES[ev.id];
    if (dateKey) {
      if (!eventsByDate[dateKey]) eventsByDate[dateKey] = [];
      eventsByDate[dateKey].push(ev);
    }
  });

  const daysInMonth   = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelected(null);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelected(null);
  }

  const selectedEvents = selected ? (eventsByDate[selected] ?? []) : [];

  // All events this month (for list view)
  const categories = ['Todos', ...Array.from(new Set(allEvents.map(e => e.badge)))];
  const monthEvents = Object.entries(eventsByDate)
    .filter(([key]) => key.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`))
    .flatMap(([, evs]) => evs)
    .filter(ev => activeCategory === 'Todos' || ev.badge === activeCategory)
    .sort((a, b) => (EVENT_DATES[a.id] ?? '').localeCompare(EVENT_DATES[b.id] ?? ''));

  // Upcoming events (next 30 days from today) for sidebar
  const upcomingEvents = allEvents
    .filter(ev => {
      const d = EVENT_DATES[ev.id];
      if (!d) return false;
      const evDate = new Date(d);
      const diff = (evDate.getTime() - today.getTime()) / 86400000;
      return diff >= 0 && diff <= 60;
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      {/* HERO */}
      <section className="bg-gradient-to-r from-violet-700 to-purple-600 px-8 py-14">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Calendario de Eventos</h1>
            <p className="text-white/75 text-sm">Planifica tu agenda y no te pierdas ningún evento</p>
          </div>
          {/* View toggle */}
          <div className="flex items-center bg-white/15 rounded-xl p-1 gap-1">
            <button
              onClick={() => setView('month')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${view === 'month' ? 'bg-white text-violet-700 shadow' : 'text-white/80 hover:text-white'}`}
            >
              <LayoutGrid size={15} /> Mes
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${view === 'list' ? 'bg-white text-violet-700 shadow' : 'text-white/80 hover:text-white'}`}
            >
              <ListFilter size={15} /> Lista
            </button>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-10">
        {view === 'month' ? (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* CALENDAR */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Month header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <button onClick={prevMonth} className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <ChevronLeft size={18} className="text-gray-600" />
                  </button>
                  <h2 className="text-lg font-bold text-gray-900">{MONTHS[month]} {year}</h2>
                  <button onClick={nextMonth} className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <ChevronRight size={18} className="text-gray-600" />
                  </button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 border-b border-gray-100">
                  {DAYS.map(d => (
                    <div key={d} className="py-2.5 text-center text-xs font-semibold text-gray-400">{d}</div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7">
                  {/* Empty cells before first day */}
                  {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-20 border-b border-r border-gray-50" />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day   = i + 1;
                    const key   = toKey(year, month, day);
                    const evs   = eventsByDate[key] ?? [];
                    const isToday = key === toKey(today.getFullYear(), today.getMonth(), today.getDate());
                    const isSel  = key === selected;
                    const col    = (firstDayIndex + i) % 7; // 5=Sat 6=Sun
                    const isWeekend = col >= 5;

                    return (
                      <div
                        key={key}
                        onClick={() => setSelected(isSel ? null : key)}
                        className={`h-20 border-b border-r border-gray-50 p-2 cursor-pointer transition-colors flex flex-col ${
                          isSel ? 'bg-violet-50' : isWeekend ? 'bg-gray-50/60 hover:bg-gray-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold mb-1 ${
                          isToday ? 'bg-violet-600 text-white' : isSel ? 'text-violet-700' : 'text-gray-700'
                        }`}>
                          {day}
                        </span>
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          {evs.slice(0, 2).map(ev => {
                            const dot = badgeColors[ev.badge] ?? 'bg-gray-400';
                            return (
                              <span key={ev.id} className={`text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md truncate ${dot}`}>
                                {ev.title.split(' ').slice(0, 2).join(' ')}
                              </span>
                            );
                          })}
                          {evs.length > 2 && (
                            <span className="text-[10px] text-gray-400 pl-1">+{evs.length - 2} más</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4 px-1">
                {Object.entries(badgeColors).slice(0, 6).map(([name, cls]) => (
                  <span key={name} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`w-2.5 h-2.5 rounded-full ${cls}`} />
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:w-80 flex-shrink-0 space-y-5">
              {/* Selected day panel */}
              {selected ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={16} className="text-violet-600" />
                    <h3 className="font-bold text-gray-900 text-sm">
                      {new Date(selected + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h3>
                  </div>
                  {selectedEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedEvents.map(ev => {
                        const dot = badgeColors[ev.badge] ?? 'bg-gray-400';
                        return (
                          <Link key={ev.id} to={`/evento/${ev.id}`} className="block group">
                            <div className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                              <div className={`w-1.5 rounded-full flex-shrink-0 ${dot}`} />
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm group-hover:text-violet-600 transition-colors truncate">{ev.title}</p>
                                <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                                  <MapPin size={10} />{ev.venue}, {ev.city}
                                </p>
                                {ev.timeStart && (
                                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                                    <Clock size={10} />{ev.timeStart} – {ev.timeEnd}
                                  </p>
                                )}
                                <p className="text-violet-600 text-xs font-semibold mt-1">{ev.priceLabel}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm text-center py-6">No hay eventos este día</p>
                  )}
                </div>
              ) : (
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5 text-center">
                  <Calendar size={28} className="text-violet-400 mx-auto mb-2" />
                  <p className="text-sm text-violet-700 font-medium">Selecciona un día</p>
                  <p className="text-xs text-violet-500 mt-1">Haz clic en cualquier día para ver los eventos</p>
                </div>
              )}

              {/* Upcoming events */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-4">Próximos Eventos</h3>
                <div className="space-y-3">
                  {upcomingEvents.map(ev => {
                    const dateKey = EVENT_DATES[ev.id] ?? '';
                    const dot = badgeColors[ev.badge] ?? 'bg-gray-400';
                    const d = new Date(dateKey + 'T12:00:00');
                    return (
                      <Link key={ev.id} to={`/evento/${ev.id}`} className="flex gap-3 group">
                        <div className={`w-10 h-10 rounded-xl ${dot} flex flex-col items-center justify-center flex-shrink-0 text-white`}>
                          <span className="text-[10px] font-bold leading-none">{d.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()}</span>
                          <span className="text-sm font-extrabold leading-none">{d.getDate()}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm group-hover:text-violet-600 transition-colors truncate">{ev.title}</p>
                          <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                            <MapPin size={10} />{ev.city}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* LIST VIEW */
          <div>
            {/* Month nav + category filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button onClick={prevMonth} className="w-9 h-9 rounded-xl bg-white border border-gray-200 hover:border-violet-400 flex items-center justify-center transition-colors shadow-sm">
                  <ChevronLeft size={16} className="text-gray-600" />
                </button>
                <h2 className="text-lg font-bold text-gray-900 min-w-36 text-center">{MONTHS[month]} {year}</h2>
                <button onClick={nextMonth} className="w-9 h-9 rounded-xl bg-white border border-gray-200 hover:border-violet-400 flex items-center justify-center transition-colors shadow-sm">
                  <ChevronRight size={16} className="text-gray-600" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 7).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      activeCategory === cat
                        ? 'bg-violet-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {monthEvents.length > 0 ? (
              <div className="space-y-3">
                {monthEvents.map(ev => {
                  const dateKey = EVENT_DATES[ev.id] ?? '';
                  const dot = badgeColors[ev.badge] ?? 'bg-gray-400';
                  const d = new Date(dateKey + 'T12:00:00');
                  return (
                    <Link key={ev.id} to={`/evento/${ev.id}`} className="block group">
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow flex gap-4 items-center">
                        {/* Date block */}
                        <div className={`w-14 h-14 rounded-2xl ${dot} flex flex-col items-center justify-center flex-shrink-0 text-white shadow-sm`}>
                          <span className="text-[10px] font-bold uppercase leading-none">{d.toLocaleDateString('es-ES', { month: 'short' })}</span>
                          <span className="text-xl font-extrabold leading-none">{d.getDate()}</span>
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`${dot} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>{ev.badge}</span>
                            {ev.timeStart && (
                              <span className="text-gray-400 text-xs flex items-center gap-1">
                                <Clock size={10} />{ev.timeStart}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 text-base group-hover:text-violet-600 transition-colors truncate">{ev.title}</h3>
                          <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                            <MapPin size={11} />{ev.venue}, {ev.city}
                          </p>
                        </div>
                        {/* Price + CTA */}
                        <div className="flex-shrink-0 text-right hidden sm:block">
                          <p className="font-bold text-gray-900 text-sm mb-2">{ev.priceLabel}</p>
                          <span className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors inline-block">
                            Ver evento
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 text-gray-400">
                <Calendar size={44} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium text-lg">No hay eventos en {MONTHS[month]}</p>
                <p className="text-sm mt-1">Prueba con otro mes o categoría</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
