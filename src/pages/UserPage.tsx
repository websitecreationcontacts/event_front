import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Ticket,
  CheckCircle2,
  CalendarDays,
  Wallet,
  ChevronRight,
  ChevronDown,
  Search,
  Heart,
  User,
  Plus,
  MapPin,
  Clock,
} from 'lucide-react';
import Footer from '../components/Footer';
import {
  navLinks,
  mockUser,
  userStats,
  userUpcomingEvents,
  userTickets,
  recommendedEvents,
  type UserTicket,
  type UserUpcomingEvent,
} from '../data/mock';
import { getOrdersByEmail } from '../store/orderStore';

// ── Convert orders to UserTicket[] ────────────────────────────────────────────
const EVENT_ICON_COLORS = [
  'bg-violet-500', 'bg-blue-500', 'bg-green-500',
  'bg-orange-500', 'bg-pink-500', 'bg-teal-500',
];

function ordersToUserTickets(): UserTicket[] {
  const orders = getOrdersByEmail(mockUser.email);
  const tickets: UserTicket[] = [];
  orders.forEach((order) => {
    order.events.forEach((ev, ei) => {
      const colorIdx = (ev.eventId.charCodeAt(0) + ei) % EVENT_ICON_COLORS.length;
      ev.items.forEach((item) => {
        for (let q = 0; q < item.quantity; q++) {
          tickets.push({
            id: `${order.id}-${item.ticketId}-${q}`,
            ticketRef: `#${order.orderRef}-${String(q + 1).padStart(3, '0')}`,
            eventId: ev.eventId,
            eventTitle: ev.eventTitle,
            iconColor: EVENT_ICON_COLORS[colorIdx],
            iconLetter: ev.eventTitle.slice(0, 2).toUpperCase(),
            date: ev.eventDate,
            zone: item.ticketName,
            type: item.ticketName,
            price: item.ticketPrice,
            status: 'activo' as const,
          });
        }
      });
    });
  });
  return tickets;
}

function ordersToUpcomingEvents(): UserUpcomingEvent[] {
  const orders = getOrdersByEmail(mockUser.email);
  const seen = new Set<string>();
  const result: UserUpcomingEvent[] = [];
  orders.forEach((order) => {
    order.events.forEach((ev, i) => {
      if (seen.has(ev.eventId)) return;
      seen.add(ev.eventId);
      const colorIdx = (ev.eventId.charCodeAt(0) + i) % EVENT_ICON_COLORS.length;
      result.push({
        id: ev.eventId,
        title: ev.eventTitle,
        venue: ev.eventVenue,
        city: ev.eventCity,
        date: ev.eventDate,
        time: '',
        ticketCount: ev.items.reduce((s, item) => s + item.quantity, 0),
        iconColor: EVENT_ICON_COLORS[colorIdx],
        iconLetter: ev.eventTitle.slice(0, 2).toUpperCase(),
      });
    });
  });
  return result;
}

// ── Logged-in navbar ───────────────────────────────────────────────────────────
function UserNavbar() {
  const [open, setOpen] = useState(false);
  const { logout } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 py-4">
      <Link to="/" className="font-bold text-xl tracking-tight text-violet-700">
        EventHub
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {mockUser.firstName[0]}
          </div>
          <span className="text-sm font-semibold text-gray-800 hidden sm:block">{mockUser.name}</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>

        {open && (
          <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
            <Link to="/perfil" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <User size={14} className="text-gray-400" />
              Mi Perfil
            </Link>
            <Link to="/usuario" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <Ticket size={14} className="text-gray-400" />
              Mis Tickets
            </Link>
            <Link to="/favoritos" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <Heart size={14} className="text-gray-400" />
              Favoritos
            </Link>
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                onClick={() => { setOpen(false); logout(); navigate('/login'); }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, iconBg, iconColor, prefix }: {
  label: string; value: number; icon: React.ReactNode;
  iconBg: string; iconColor: string; prefix?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
        <p className="text-2xl font-extrabold text-gray-900">
          {prefix && <span className="text-lg">{prefix}</span>}
          {value}
        </p>
      </div>
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>
    </div>
  );
}

// ── Ticket status badge ────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: 'activo' | 'usado' }) {
  return (
    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
      status === 'activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
    }`}>
      {status === 'activo' ? 'Activo' : 'Usado'}
    </span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
type TicketFilter = 'todos' | 'activos' | 'usados';

export default function UserPage() {
  const [ticketFilter, setTicketFilter] = useState<TicketFilter>('todos');

  // Real tickets from orders (newest first) + mock tickets
  const realTickets = ordersToUserTickets();
  const allTickets = [
    ...realTickets,
    ...userTickets.filter(t => !realTickets.some(r => r.eventId === t.eventId)),
  ];

  const filteredTickets = allTickets.filter((t) => {
    if (ticketFilter === 'activos') return t.status === 'activo';
    if (ticketFilter === 'usados') return t.status === 'usado';
    return true;
  });

  // Real upcoming events from orders + mock (dedup by id)
  const realUpcoming = ordersToUpcomingEvents();
  const realIds = new Set(realUpcoming.map(e => e.id));
  const allUpcoming = [
    ...realUpcoming,
    ...userUpcomingEvents.filter(e => !realIds.has(e.id)),
  ];

  // Stats: real totals + mock baseline
  const realActivos = realTickets.filter(t => t.status === 'activo').length;
  const realGastado = getOrdersByEmail(mockUser.email).reduce((s, o) => s + o.total, 0);

  const stats = {
    ticketsActivos: userStats.ticketsActivos + realActivos,
    ticketsUsados: userStats.ticketsUsados,
    proximosEventos: userStats.proximosEventos + realUpcoming.length,
    totalGastado: userStats.totalGastado + Math.round(realGastado),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UserNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">¡Hola, {mockUser.firstName}!</h1>
            <p className="text-gray-500 text-sm mt-1">Bienvenida de vuelta a tu dashboard de eventos</p>
          </div>
          <Link
            to="/descubre"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Plus size={16} />
            Explorar eventos
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Tickets Activos"
            value={stats.ticketsActivos}
            icon={<Ticket size={20} />}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            label="Tickets Usados"
            value={stats.ticketsUsados}
            icon={<CheckCircle2 size={20} />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            label="Próximos Eventos"
            value={stats.proximosEventos}
            icon={<CalendarDays size={20} />}
            iconBg="bg-violet-100"
            iconColor="text-violet-600"
          />
          <StatCard
            label="Total Gastado"
            value={stats.totalGastado}
            prefix="€"
            icon={<Wallet size={20} />}
            iconBg="bg-orange-100"
            iconColor="text-orange-500"
          />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Próximos Eventos */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray-900">Próximos Eventos</h2>
                <Link to="/descubre" className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                  Ver todos
                </Link>
              </div>

              <div className="divide-y divide-gray-50">
                {allUpcoming.map((ev) => (
                  <Link key={ev.id} to={`/mis-tickets/${ev.id}`} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0 hover:bg-gray-50 -mx-2 px-2 rounded-xl transition-colors">
                    <div className={`w-10 h-10 rounded-xl ${ev.iconColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {ev.iconLetter}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{ev.title}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={11} />{ev.venue}, {ev.city}
                        </span>
                        {ev.time && (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={11} />{ev.date}{ev.time ? `, ${ev.time}` : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 uppercase tracking-wide">
                        Activo
                      </span>
                      <span className="text-xs text-gray-400">{ev.ticketCount} {ev.ticketCount === 1 ? 'ticket' : 'tickets'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mis Tickets */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-gray-900">Mis Tickets</h2>
                  {realTickets.length > 0 && (
                    <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {realTickets.length} nueva{realTickets.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <div className="flex rounded-lg bg-gray-100 p-0.5 text-xs">
                  {(['todos', 'activos', 'usados'] as TicketFilter[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setTicketFilter(f)}
                      className={`px-3 py-1.5 rounded-md font-semibold capitalize transition-all ${
                        ticketFilter === f ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredTickets.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-8">No hay tickets para mostrar</p>
                )}
                {filteredTickets.map((t) => (
                  <Link
                    key={t.id}
                    to={`/mis-tickets/${t.eventId}`}
                    className={`block rounded-xl border p-4 transition-colors hover:shadow-md ${
                      t.status === 'usado' ? 'border-gray-100 bg-gray-50' : 'border-gray-200 bg-white hover:border-violet-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-lg ${t.iconColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${t.status === 'usado' ? 'opacity-50' : ''}`}>
                        {t.iconLetter}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${t.status === 'usado' ? 'text-gray-500' : 'text-gray-900'}`}>
                          {t.eventTitle}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">{t.ticketRef}</p>
                      </div>
                      <StatusBadge status={t.status} />
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-gray-400 font-medium mb-0.5">Fecha</p>
                        <p className={`font-semibold ${t.status === 'usado' ? 'text-gray-400' : 'text-gray-700'}`}>{t.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-medium mb-0.5">{t.status === 'usado' ? 'Asiento' : 'Zona'}</p>
                        <p className={`font-semibold truncate ${t.status === 'usado' ? 'text-gray-400' : 'text-gray-700'}`}>{t.zone}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-medium mb-0.5">Precio</p>
                        <p className={`font-semibold ${t.status === 'usado' ? 'text-gray-400' : 'text-gray-700'}`}>€{t.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0 space-y-6">

            {/* Acceso Rápido */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Acceso Rápido</h2>
              <div className="space-y-2">
                {[
                  { icon: <Search size={16} />, label: 'Buscar Eventos', to: '/descubre', color: 'bg-violet-100 text-violet-600' },
                  { icon: <Ticket size={16} />, label: 'Mis Tickets', to: '/usuario', color: 'bg-blue-100 text-blue-600' },
                  { icon: <Heart size={16} />, label: 'Favoritos', to: '/favoritos', color: 'bg-pink-100 text-pink-500' },
                  { icon: <User size={16} />, label: 'Mi Perfil', to: '/perfil', color: 'bg-green-100 text-green-600' },
                ].map(({ icon, label, to, color }) => (
                  <Link
                    key={label}
                    to={to}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
                      {icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 flex-1">{label}</span>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recomendado para Ti */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Recomendado para Ti</h2>
              <div className="space-y-4">
                {recommendedEvents.map((ev) => (
                  <Link key={ev.id} to="/descubre" className="block group">
                    <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2.5">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{ev.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400">{ev.venue}, {ev.city}</p>
                      <span className="text-xs font-bold text-violet-600">Desde €{ev.price}</span>
                    </div>
                    <span className="text-xs text-violet-500 font-medium hover:underline">Ver más</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
