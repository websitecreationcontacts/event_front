import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  CalendarDays,
  TicketCheck,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  TrendingUp,
  Users,
  DollarSign,
  ChevronDown,
  Search,
  Bell,
  Clock,
  FileEdit,
  Eye,
  ArrowUpRight,
  Wallet,
} from 'lucide-react';
import {
  mockCompany,
  companyStats,
  companySales,
  type CompanyEvent,
  type CompanySale,
} from '../data/mock';
import { getEvents } from '../store/eventStore';

// ── Sidebar nav items ─────────────────────────────────────────────────────────
const sidebarLinks = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', id: 'dashboard' },
  { icon: <CalendarDays size={18} />, label: 'Mis Eventos', id: 'eventos' },
  { icon: <TicketCheck size={18} />, label: 'Ventas', id: 'ventas' },
  { icon: <BarChart3 size={18} />, label: 'Analytics', id: 'analytics' },
  { icon: <Users size={18} />, label: 'Equipo', id: 'equipo' },
  { icon: <Settings size={18} />, label: 'Configuración', id: 'config' },
];

// ── Status helpers ────────────────────────────────────────────────────────────
function EventStatusBadge({ status }: { status: CompanyEvent['status'] }) {
  const map = {
    activo:     'bg-green-100 text-green-700',
    borrador:   'bg-gray-100 text-gray-500',
    finalizado: 'bg-blue-100 text-blue-600',
  };
  const labels = { activo: 'Activo', borrador: 'Borrador', finalizado: 'Finalizado' };
  return (
    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${map[status]}`}>
      {labels[status]}
    </span>
  );
}

function SaleBadge({ status }: { status: CompanySale['status'] }) {
  const map = {
    completado:  'bg-green-100 text-green-700',
    pendiente:   'bg-amber-100 text-amber-600',
    reembolsado: 'bg-red-100 text-red-500',
  };
  const labels = { completado: 'Completado', pendiente: 'Pendiente', reembolsado: 'Reembolsado' };
  return (
    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${map[status]}`}>
      {labels[status]}
    </span>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, iconBg, iconColor, change }: {
  label: string; value: string; sub?: string;
  icon: React.ReactNode; iconBg: string; iconColor: string; change?: number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-bold ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            <ArrowUpRight size={13} className={change < 0 ? 'rotate-180' : ''} />
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      <p className="text-xs font-semibold text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ value, max, color = 'bg-violet-500' }: { value: number; max: number; color?: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-500 w-8 text-right">{pct}%</span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CompanyDashboardPage() {
  const { logout, showToast } = useApp();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [eventFilter, setEventFilter] = useState<'todos' | 'activo' | 'borrador' | 'finalizado'>('todos');
  // Read from the store (refreshed on every mount after navigation)
  const [allEvents, setAllEvents] = useState<CompanyEvent[]>(() => getEvents());

  const filteredEvents = allEvents.filter(
    (e) => eventFilter === 'todos' || e.status === eventFilter
  );

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const sections: Record<string, React.ReactNode> = {
    dashboard: <DashboardSection setSection={setActiveSection} events={allEvents} />,
    eventos:   <EventosSection filter={eventFilter} setFilter={setEventFilter} events={filteredEvents} showToast={showToast} />,
    ventas:    <VentasSection />,
    analytics: <AnalyticsSection events={allEvents} />,
    equipo:    <PlaceholderSection label="Equipo" icon={<Users size={32} />} />,
    config:    <PlaceholderSection label="Configuración" icon={<Settings size={32} />} />,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 bg-white border-r border-gray-100 flex flex-col transition-all duration-200 min-h-screen`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {mockCompany.logo}
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{mockCompany.name}</p>
              <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded-md">{mockCompany.plan}</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveSection(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                activeSection === link.id
                  ? 'bg-violet-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="flex-shrink-0">{link.icon}</span>
              {sidebarOpen && <span>{link.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-2 pb-4 border-t border-gray-100 pt-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors text-left"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && 'Cerrar Sesión'}
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center gap-4 sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
          >
            <LayoutDashboard size={17} />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos, ventas…"
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setAvatarOpen(false); }}
                className="relative w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              >
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-1 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-50">
                  <p className="text-xs font-bold text-gray-700 mb-2">Notificaciones</p>
                  {[
                    { text: 'Nuevo pedido: Carlos Martínez — Festival Electrónico', time: 'Hace 5 min', dot: 'bg-green-500' },
                    { text: 'Pago pendiente confirmación — Ana Rodríguez', time: 'Hace 2h', dot: 'bg-amber-400' },
                    { text: 'Tech Summit alcanzó el 75% de aforo', time: 'Ayer', dot: 'bg-blue-500' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-2 border-b border-gray-50 last:border-0">
                      <span className={`w-2 h-2 rounded-full ${n.dot} mt-1.5 flex-shrink-0`} />
                      <div>
                        <p className="text-xs text-gray-700">{n.text}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="relative">
              <button
                onClick={() => { setAvatarOpen(!avatarOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold">
                  {mockCompany.logo}
                </div>
                <span className="text-sm font-semibold text-gray-800 hidden sm:block">{mockCompany.name}</span>
                <ChevronDown size={13} className="text-gray-400" />
              </button>
              {avatarOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link to="/" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Ver web pública</Link>
                  <button onClick={() => setActiveSection('config')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Configuración</button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">Cerrar Sesión</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 py-6">
          {sections[activeSection]}
        </main>
      </div>
    </div>
  );
}

// ── Dashboard section ─────────────────────────────────────────────────────────
function DashboardSection({ setSection, events }: { setSection: (s: string) => void; events: CompanyEvent[] }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Bienvenido, {mockCompany.name}</p>
        </div>
        <button
          onClick={() => navigate('/empresa/crear-evento')}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          <Plus size={16} />
          Crear Evento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Eventos Activos"
          value={String(events.filter(e => e.status === 'activo').length)}
          icon={<CalendarDays size={19} />}
          iconBg="bg-violet-100" iconColor="text-violet-600"
        />
        <StatCard
          label="Tickets Vendidos"
          value={companyStats.ticketsVendidos.toLocaleString()}
          sub="Este mes"
          change={companyStats.ticketsVendidosChange}
          icon={<TicketCheck size={19} />}
          iconBg="bg-green-100" iconColor="text-green-600"
        />
        <StatCard
          label="Ingresos Totales"
          value={`€${companyStats.ingresosTotales.toLocaleString()}`}
          sub="Este mes"
          change={companyStats.ingresosChange}
          icon={<DollarSign size={19} />}
          iconBg="bg-blue-100" iconColor="text-blue-600"
        />
        <StatCard
          label="Asistentes Totales"
          value={companyStats.asistentesTotales.toLocaleString()}
          icon={<Users size={19} />}
          iconBg="bg-orange-100" iconColor="text-orange-500"
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Eventos activos */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900">Eventos Activos</h2>
            <button onClick={() => setSection('eventos')} className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors">Ver todos</button>
          </div>
          <div className="space-y-4">
            {events.filter((e) => e.status === 'activo').map((ev) => (
              <div key={ev.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-white ${ev.categoryColor}`}>{ev.category}</span>
                    <p className="text-sm font-semibold text-gray-800 truncate">{ev.title}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-xs font-bold text-gray-700">{ev.ticketsSold}/{ev.ticketsTotal}</span>
                    <span className="text-xs text-gray-400">tickets</span>
                  </div>
                </div>
                <ProgressBar
                  value={ev.ticketsSold}
                  max={ev.ticketsTotal}
                  color={ev.ticketsSold / ev.ticketsTotal > 0.8 ? 'bg-green-500' : ev.ticketsSold / ev.ticketsTotal > 0.5 ? 'bg-violet-500' : 'bg-amber-400'}
                />
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={11} />{ev.date} · {ev.venue}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-600">€{ev.revenue.toLocaleString()}</span>
                    <button
                      onClick={() => navigate(`/empresa/editar-evento/${ev.id}`)}
                      className="flex items-center gap-1 text-violet-500 hover:text-violet-700 font-semibold transition-colors"
                    >
                      <FileEdit size={11} />Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: ventas recientes + acciones rápidas */}
        <div className="xl:w-80 flex-shrink-0 space-y-4">
          {/* Acciones rápidas */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Acciones Rápidas</h2>
            <div className="space-y-2">
              {[
                { icon: <Plus size={15} />, label: 'Crear Nuevo Evento', color: 'bg-violet-600 text-white hover:bg-violet-700', section: 'create' },
                { icon: <BarChart3 size={15} />, label: 'Ver Analytics', color: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50', section: 'analytics' },
                { icon: <Wallet size={15} />, label: 'Gestionar Ventas', color: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50', section: 'ventas' },
                { icon: <TrendingUp size={15} />, label: 'Exportar Informe', color: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50', section: null },
              ].map(({ icon, label, color, section }) => (
                <button
                  key={label}
                  onClick={() => section === 'create' ? navigate('/empresa/crear-evento') : section && setSection(section)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${color}`}
                >
                  {icon}{label}
                </button>
              ))}
            </div>
          </div>

          {/* Ventas recientes (mini) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-900">Últimas Ventas</h2>
              <button onClick={() => setSection('ventas')} className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors">Ver todas</button>
            </div>
            <div className="space-y-3">
              {companySales.slice(0, 4).map((sale) => (
                <div key={sale.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                    {sale.buyer.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{sale.buyer}</p>
                    <p className="text-[11px] text-gray-400 truncate">{sale.event}</p>
                  </div>
                  <span className={`text-xs font-bold flex-shrink-0 ${sale.status === 'reembolsado' ? 'text-red-400' : 'text-gray-800'}`}>
                    {sale.status === 'reembolsado' ? '-' : '+'}€{sale.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Eventos section ────────────────────────────────────────────────────────────
type EventFilter = 'todos' | CompanyEvent['status'];
function EventosSection({ filter, setFilter, events, showToast }: {
  filter: EventFilter; setFilter: (f: EventFilter) => void;
  events: CompanyEvent[]; showToast: (m: string, t?: 'success'|'error'|'info') => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">Mis Eventos</h1>
        <button
          onClick={() => navigate('/empresa/crear-evento')}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          <Plus size={16} />
          Crear Evento
        </button>
      </div>

      {/* Filters */}
      <div className="flex rounded-xl bg-gray-100 p-0.5 w-fit text-xs">
        {(['todos', 'activo', 'borrador', 'finalizado'] as EventFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${filter === f ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Evento', 'Fecha / Lugar', 'Tickets', 'Ingresos', 'Estado', 'Acciones'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {events.map((ev) => (
              <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0 ${ev.categoryColor}`}>{ev.category[0]}</span>
                    <p className="font-semibold text-gray-800 text-sm">{ev.title}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-xs font-semibold text-gray-700">{ev.date}</p>
                  <p className="text-xs text-gray-400">{ev.venue}, {ev.city}</p>
                </td>
                <td className="px-4 py-3.5">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-800">{ev.ticketsSold} / {ev.ticketsTotal}</p>
                    <ProgressBar value={ev.ticketsSold} max={ev.ticketsTotal} color="bg-violet-500" />
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm font-bold text-gray-800">€{ev.revenue.toLocaleString()}</p>
                </td>
                <td className="px-4 py-3.5">
                  <EventStatusBadge status={ev.status} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => showToast('Vista previa no disponible aún', 'info')}
                      className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                      title="Ver"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => navigate(`/empresa/editar-evento/${ev.id}`)}
                      className="w-7 h-7 rounded-lg hover:bg-violet-50 flex items-center justify-center text-gray-400 hover:text-violet-600 transition-colors"
                      title="Editar"
                    >
                      <FileEdit size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-12">No hay eventos para este filtro</p>
        )}
      </div>
    </div>
  );
}

// ── Ventas section ────────────────────────────────────────────────────────────
function VentasSection() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">Ventas</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">Total recaudado:</span>
          <span className="text-sm font-extrabold text-gray-900">€{companyStats.ingresosTotales.toLocaleString()}</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Completadas', value: companySales.filter((s) => s.status === 'completado').length, color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
          { label: 'Pendientes', value: companySales.filter((s) => s.status === 'pendiente').length, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
          { label: 'Reembolsadas', value: companySales.filter((s) => s.status === 'reembolsado').length, color: 'text-red-500', bg: 'bg-red-50 border-red-100' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`rounded-2xl border ${bg} p-4 text-center`}>
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Sales table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">Historial de Ventas</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Comprador', 'Evento', 'Tickets', 'Importe', 'Fecha', 'Estado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {companySales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600 flex-shrink-0">
                      {sale.buyer.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{sale.buyer}</p>
                      <p className="text-xs text-gray-400">{sale.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-xs font-semibold text-gray-700 max-w-[160px] truncate">{sale.event}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm font-semibold text-gray-700">{sale.tickets}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className={`text-sm font-bold ${sale.status === 'reembolsado' ? 'text-red-400 line-through' : 'text-gray-900'}`}>
                    €{sale.amount}
                  </p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-xs text-gray-400">{sale.date}</p>
                </td>
                <td className="px-4 py-3.5">
                  <SaleBadge status={sale.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Analytics section ─────────────────────────────────────────────────────────
function AnalyticsSection({ events }: { events: CompanyEvent[] }) {
  const [period, setPeriod] = useState<'semana' | 'mes' | 'año'>('mes');

  // ── Revenue line chart data (monthly) ──────────────────────────────────────
  const monthlyRevenue = [
    { label: 'Ago', value: 12400 },
    { label: 'Sep', value: 18700 },
    { label: 'Oct', value: 15200 },
    { label: 'Nov', value: 22100 },
    { label: 'Dic', value: 31500 },
    { label: 'Ene', value: 28000 },
    { label: 'Feb', value: 35800 },
    { label: 'Mar', value: 42600 },
  ];
  const weeklyRevenue = [
    { label: 'L', value: 4200 },
    { label: 'M', value: 6800 },
    { label: 'X', value: 5100 },
    { label: 'J', value: 9200 },
    { label: 'V', value: 13400 },
    { label: 'S', value: 18600 },
    { label: 'D', value: 11200 },
  ];
  const yearlyRevenue = [
    { label: '2021', value: 98000 },
    { label: '2022', value: 142000 },
    { label: '2023', value: 198000 },
    { label: '2024', value: 265000 },
  ];
  const revenueData = period === 'semana' ? weeklyRevenue : period === 'mes' ? monthlyRevenue : yearlyRevenue;

  // ── Tickets bar chart ───────────────────────────────────────────────────────
  const ticketData = events.slice(0, 6).map((e) => ({
    label: e.title.split(' ').slice(0, 2).join(' '),
    sold: e.ticketsSold,
    total: e.ticketsTotal,
  }));

  // ── Category donut data ─────────────────────────────────────────────────────
  const categoryMap: Record<string, number> = {};
  events.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] ?? 0) + e.revenue;
  });
  const catColors = ['#7c3aed', '#3b82f6', '#f97316', '#22c55e', '#ec4899', '#eab308'];
  const catEntries = Object.entries(categoryMap);
  const totalRevCat = catEntries.reduce((s, [, v]) => s + v, 0);

  // SVG donut helpers
  function donutPath(pct: number, offset: number, r = 42) {
    const circ = 2 * Math.PI * r;
    return { strokeDasharray: `${pct * circ} ${circ}`, strokeDashoffset: -offset * circ };
  }

  // ── Line chart SVG helper ───────────────────────────────────────────────────
  const W = 560, H = 160, PAD = 20;
  const maxVal = Math.max(...revenueData.map((d) => d.value));
  const pts = revenueData.map((d, i) => {
    const x = PAD + (i / (revenueData.length - 1)) * (W - PAD * 2);
    const y = H - PAD - (d.value / maxVal) * (H - PAD * 2);
    return { x, y, ...d };
  });
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath = `M${pts[0].x},${H - PAD} ` + pts.map((p) => `L${p.x},${p.y}`).join(' ') + ` L${pts[pts.length - 1].x},${H - PAD} Z`;

  // ── KPIs ───────────────────────────────────────────────────────────────────
  const totalTickets = events.reduce((s, e) => s + e.ticketsSold, 0);
  const totalRev = events.reduce((s, e) => s + e.revenue, 0);
  const avgOcc = events.length ? Math.round(events.reduce((s, e) => s + e.ticketsSold / Math.max(e.ticketsTotal, 1), 0) / events.length * 100) : 0;
  const activeCount = events.filter((e) => e.status === 'activo').length;

  // ── Sales funnel ───────────────────────────────────────────────────────────
  const funnelSteps = [
    { label: 'Impresiones', value: 128400, color: 'bg-violet-200', bar: 'bg-violet-500' },
    { label: 'Visitas página', value: 48200, color: 'bg-blue-100', bar: 'bg-blue-500' },
    { label: 'Añadidos al carrito', value: 9640, color: 'bg-cyan-100', bar: 'bg-cyan-500' },
    { label: 'Compras completadas', value: totalTickets, color: 'bg-green-100', bar: 'bg-green-500' },
  ];
  const funnelMax = funnelSteps[0].value;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Rendimiento y métricas de tus eventos</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-0.5 text-xs font-semibold">
          {(['semana', 'mes', 'año'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${period === p ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Ingresos Totales', value: `€${totalRev.toLocaleString()}`, change: +8, color: 'text-violet-600', bg: 'bg-violet-100' },
          { label: 'Tickets Vendidos', value: totalTickets.toLocaleString(), change: +12, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Ocupación Media', value: `${avgOcc}%`, change: +3, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Eventos Activos', value: String(activeCount), change: 0, color: 'text-orange-500', bg: 'bg-orange-100' },
        ].map(({ label, value, change, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
            <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-500' : 'text-gray-400'}`}>
              <ArrowUpRight size={12} className={change < 0 ? 'rotate-180' : change === 0 ? 'opacity-0' : ''} />
              {change !== 0 ? `${change > 0 ? '+' : ''}${change}% vs mes anterior` : 'Sin cambios'}
            </div>
          </div>
        ))}
      </div>

      {/* Line chart — Revenue over time */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">Evolución de Ingresos</h2>
            <p className="text-xs text-gray-400 mt-0.5">Ingresos por {period}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-extrabold text-gray-900">€{revenueData[revenueData.length - 1].value.toLocaleString()}</p>
            <p className="text-xs text-green-500 font-semibold">↑ periodo actual</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full min-w-[320px]">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const y = PAD + t * (H - PAD * 2);
              return (
                <g key={t}>
                  <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                  <text x={PAD - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">
                    €{((1 - t) * maxVal / 1000).toFixed(0)}k
                  </text>
                </g>
              );
            })}
            {/* Area fill */}
            <path d={areaPath} fill="url(#areaGrad)" />
            {/* Line */}
            <polyline points={polyline} fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {/* Points */}
            {pts.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="4" fill="white" stroke="#7c3aed" strokeWidth="2.5" />
                <text x={p.x} y={H + 14} textAnchor="middle" fontSize="10" fill="#6b7280">{p.label}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Bar chart + Donut side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Bar chart — tickets by event */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5">Tickets Vendidos por Evento</h2>
          <div className="space-y-3.5">
            {ticketData.map((d, i) => {
              const pctSold = d.total > 0 ? (d.sold / d.total) * 100 : 0;
              const colors = ['bg-violet-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500'];
              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700 truncate max-w-[180px]">{d.label}</span>
                    <span className="font-bold text-gray-900 ml-2">{d.sold} <span className="text-gray-400 font-normal">/ {d.total}</span></span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors[i % colors.length]} transition-all duration-500`}
                      style={{ width: `${pctSold}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span>{pctSold.toFixed(0)}% vendido</span>
                    <span className="text-green-600 font-semibold">€{events[i]?.revenue.toLocaleString() ?? 0}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut — revenue by category */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h2 className="text-base font-bold text-gray-900 mb-5">Ingresos por Categoría</h2>
          <div className="flex items-center gap-6 flex-1">
            <svg viewBox="0 0 100 100" className="w-28 h-28 flex-shrink-0 -rotate-90">
              {(() => {
                let offset = 0;
                return catEntries.map(([cat, rev], i) => {
                  const pct = rev / totalRevCat;
                  const { strokeDasharray, strokeDashoffset } = donutPath(pct, offset);
                  offset += pct;
                  return (
                    <circle
                      key={cat}
                      cx="50" cy="50" r="42"
                      fill="none"
                      stroke={catColors[i % catColors.length]}
                      strokeWidth="14"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                    />
                  );
                });
              })()}
              <circle cx="50" cy="50" r="28" fill="white" />
            </svg>
            <div className="flex-1 space-y-2">
              {catEntries.map(([cat, rev], i) => (
                <div key={cat} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: catColors[i % catColors.length] }} />
                  <span className="text-xs text-gray-600 flex-1 truncate">{cat}</span>
                  <span className="text-xs font-bold text-gray-800">€{rev.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400">{((rev / totalRevCat) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Funnel + Top events */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Conversion funnel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5">Embudo de Conversión</h2>
          <div className="space-y-3">
            {funnelSteps.map((step, i) => {
              const pct = (step.value / funnelMax) * 100;
              const conv = i === 0 ? 100 : ((step.value / funnelSteps[i - 1].value) * 100).toFixed(1);
              return (
                <div key={step.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">{i + 1}</span>
                      <span className="font-semibold text-gray-700">{step.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{step.value.toLocaleString()}</span>
                      {i > 0 && <span className="text-[10px] text-gray-400 ml-1">({conv}%)</span>}
                    </div>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full rounded-full ${step.bar} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Tasa de conversión global</span>
            <span className="font-extrabold text-violet-600">{((totalTickets / funnelMax) * 100).toFixed(2)}%</span>
          </div>
        </div>

        {/* Top events table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5">Top Eventos por Ingresos</h2>
          <div className="space-y-3">
            {[...events].sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((ev, i) => (
              <div key={ev.id} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0 ${
                  i === 0 ? 'bg-amber-400' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-400' : 'bg-gray-200 text-gray-500'
                }`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{ev.title}</p>
                  <p className="text-[11px] text-gray-400">{ev.city} · {ev.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-extrabold text-gray-900">€{ev.revenue.toLocaleString()}</p>
                  <p className="text-[11px] text-gray-400">{ev.ticketsSold} tickets</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Placeholder for unbuilt sections ──────────────────────────────────────────
function PlaceholderSection({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-300 gap-3">
      {icon}
      <p className="text-base font-semibold">{label} — próximamente</p>
    </div>
  );
}
