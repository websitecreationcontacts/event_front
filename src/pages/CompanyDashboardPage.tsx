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
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Clock,
  FileEdit,
  Eye,
  ArrowUpRight,
  Wallet,
  Save,
  Building2,
  Lock,
  AlertTriangle,
  CreditCard,
  Globe,
  Mail,
  Phone,
  MapPin,
  Shield,
  Check,
  X,
  Tag,
  UserRound,
} from 'lucide-react';
import {
  mockCompany,
  companyStats,
  companySales,
  getEventDetail,
  type CompanyEvent,
  type CompanySale,
} from '../data/mock';
import { getEvents } from '../store/eventStore';

// ── Sidebar nav items ─────────────────────────────────────────────────────────
const sidebarLinks = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', id: 'dashboard' },
  { icon: <CalendarDays size={18} />, label: 'Mis Eventos', id: 'eventos' },
  { icon: <TicketCheck size={18} />, label: 'Ventas', id: 'ventas' },
  { icon: <Users size={18} />, label: 'Clientes', id: 'clientes' },
  { icon: <BarChart3 size={18} />, label: 'Analytics', id: 'analytics' },
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
    clientes:  <ClientesSection />,
    analytics: <AnalyticsSection events={allEvents} />,
    config:    <ConfigSection />,
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
  const [previewEvent, setPreviewEvent] = useState<CompanyEvent | null>(null);
  const [managingEvent, setManagingEvent] = useState<CompanyEvent | null>(null);

  if (managingEvent) {
    return <EventManagementView event={managingEvent} onBack={() => setManagingEvent(null)} navigate={navigate} showToast={showToast} />;
  }

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
                    <button
                      onClick={() => setManagingEvent(ev)}
                      className="font-semibold text-gray-800 text-sm hover:text-violet-600 transition-colors text-left"
                    >
                      {ev.title}
                    </button>
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
                      onClick={() => setPreviewEvent(ev)}
                      className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                      title="Vista previa"
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
                    <button
                      onClick={() => setManagingEvent(ev)}
                      className="w-7 h-7 rounded-lg hover:bg-violet-50 flex items-center justify-center text-gray-400 hover:text-violet-600 transition-colors"
                      title="Gestionar"
                    >
                      <ChevronRight size={14} />
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

      {/* Preview Modal */}
      {previewEvent && (
        <EventPreviewModal event={previewEvent} onClose={() => setPreviewEvent(null)} />
      )}
    </div>
  );
}

// ── Event Preview Modal ────────────────────────────────────────────────────────
const DEFAULT_EVENT_IMAGES: Record<string, string> = {
  Música: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=340&fit=crop&auto=format',
  Conferencia: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=340&fit=crop&auto=format',
  Concierto: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=340&fit=crop&auto=format',
  Deportes: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=340&fit=crop&auto=format',
  Arte: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=340&fit=crop&auto=format',
  Gastronomía: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=340&fit=crop&auto=format',
  Jazz: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=340&fit=crop&auto=format',
  Tecnología: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=340&fit=crop&auto=format',
  Corporativo: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=340&fit=crop&auto=format',
};

function EventPreviewModal({ event: ev, onClose }: { event: CompanyEvent; onClose: () => void }) {
  const detail = getEventDetail(ev.id);
  const heroImg = ev.image || DEFAULT_EVENT_IMAGES[ev.category] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=340&fit=crop&auto=format';
  const tickets = detail?.tickets ?? [{ id: 't1', name: 'Entrada General', description: 'Acceso estándar', price: ev.price ?? 0, available: ev.ticketsTotal - ev.ticketsSold }];
  const pct = Math.round((ev.ticketsSold / ev.ticketsTotal) * 100);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative">
          <img src={heroImg} alt={ev.title} className="w-full h-52 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute top-3 left-3">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wide ${ev.categoryColor}`}>
              {ev.category}
            </span>
          </div>
          <div className="absolute bottom-4 left-5 right-5">
            <h2 className="text-xl font-extrabold text-white leading-tight">{ev.title}</h2>
            <p className="text-white/70 text-sm mt-0.5 flex items-center gap-1.5">
              <MapPin size={12} />{ev.venue}, {ev.city}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Info row */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                <CalendarDays size={15} className="text-violet-500" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Fecha</p>
                <p className="font-semibold text-gray-800">{ev.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <MapPin size={15} className="text-blue-500" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Lugar</p>
                <p className="font-semibold text-gray-800">{ev.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Users size={15} className="text-green-500" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">Aforo</p>
                <p className="font-semibold text-gray-800">{ev.ticketsSold} / {ev.ticketsTotal} <span className="text-gray-400 font-normal">({pct}%)</span></p>
              </div>
            </div>
          </div>

          {/* Capacity bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Ocupación</span>
              <span className="font-semibold">{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all ${pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-violet-500' : 'bg-amber-400'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Description */}
          {(detail?.description ?? ev.description) && (
            <div>
              <p className="text-sm font-bold text-gray-900 mb-2">Descripción</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {Array.isArray(detail?.description) ? detail!.description[0] : (ev.description ?? '')}
              </p>
            </div>
          )}

          {/* Tickets */}
          <div>
            <p className="text-sm font-bold text-gray-900 mb-3">Tipos de Entrada</p>
            <div className="space-y-2">
              {tickets.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                      <Tag size={14} className="text-violet-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-gray-900">{t.price === 0 ? 'Gratis' : `${t.price}€`}</p>
                    <p className="text-[11px] text-gray-400">{t.available} disponibles</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-center text-gray-400 border-t border-gray-100 pt-4">
            Vista previa · Solo lectura — los cambios deben hacerse desde "Editar"
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Event Management View ──────────────────────────────────────────────────────
function EventManagementView({ event: ev, onBack, navigate, showToast }: {
  event: CompanyEvent;
  onBack: () => void;
  navigate: ReturnType<typeof useNavigate>;
  showToast: (m: string, t?: 'success'|'error'|'info') => void;
}) {
  const detail = getEventDetail(ev.id);
  const heroImg = ev.image || DEFAULT_EVENT_IMAGES[ev.category] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=340&fit=crop&auto=format';
  const tickets = detail?.tickets ?? [{ id: 't1', name: 'Entrada General', description: 'Acceso estándar', price: ev.price ?? 0, available: ev.ticketsTotal - ev.ticketsSold }];
  const pct = Math.round((ev.ticketsSold / ev.ticketsTotal) * 100);

  // Filter sales for this event
  const eventSales = companySales.filter((s) => s.event === ev.title);

  const [buyersSearch, setBuyersSearch] = useState('');
  const filteredBuyers = eventSales.filter((s) => {
    const q = buyersSearch.toLowerCase();
    return q === '' || s.buyer.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-extrabold text-gray-900 truncate">{ev.title}</h1>
            <EventStatusBadge status={ev.status} />
          </div>
          <p className="text-sm text-gray-400 mt-0.5">{ev.date} · {ev.venue}, {ev.city}</p>
        </div>
        <button
          onClick={() => navigate(`/empresa/editar-evento/${ev.id}`)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow transition-colors flex-shrink-0"
        >
          <FileEdit size={15} />
          Editar Evento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 mb-1">Tickets Vendidos</p>
          <p className="text-2xl font-extrabold text-gray-900">{ev.ticketsSold}</p>
          <p className="text-xs text-gray-400">de {ev.ticketsTotal} disponibles</p>
          <div className="mt-2 h-1.5 rounded-full bg-gray-100">
            <div className={`h-full rounded-full ${pct >= 80 ? 'bg-green-500' : 'bg-violet-500'}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 mb-1">Ingresos</p>
          <p className="text-2xl font-extrabold text-gray-900">€{ev.revenue.toLocaleString()}</p>
          <p className="text-xs text-gray-400">total recaudado</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 mb-1">Ocupación</p>
          <p className="text-2xl font-extrabold text-gray-900">{pct}%</p>
          <p className="text-xs text-gray-400">{ev.ticketsTotal - ev.ticketsSold} plazas libres</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 mb-1">Compradores</p>
          <p className="text-2xl font-extrabold text-gray-900">{eventSales.length}</p>
          <p className="text-xs text-gray-400">transacciones</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-5">
        {/* Left: Ticket types */}
        <div className="xl:w-72 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="relative">
              <img src={heroImg} alt={ev.title} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className={`absolute top-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-full text-white ${ev.categoryColor}`}>{ev.category}</span>
            </div>
            <div className="p-4">
              <p className="text-sm font-bold text-gray-900 mb-3">Tipos de Entrada</p>
              <div className="space-y-2">
                {tickets.map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <Tag size={13} className="text-violet-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{t.name}</p>
                        <p className="text-[11px] text-gray-400">{t.available} disp.</p>
                      </div>
                    </div>
                    <p className="text-sm font-extrabold text-gray-900 flex-shrink-0 ml-2">{t.price === 0 ? 'Gratis' : `${t.price}€`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-bold text-gray-900 mb-3">Acciones</p>
            <div className="space-y-2">
              <button
                onClick={() => navigate(`/empresa/editar-evento/${ev.id}`)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white transition-colors"
              >
                <FileEdit size={14} />Editar Evento
              </button>
              <button
                onClick={() => showToast('Exportando lista de compradores…', 'info')}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <TrendingUp size={14} />Exportar Compradores
              </button>
            </div>
          </div>
        </div>

        {/* Right: Buyers list */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
              <p className="text-sm font-bold text-gray-900 flex-1">Compradores</p>
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar…"
                  value={buyersSearch}
                  onChange={(e) => setBuyersSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors w-44"
                />
              </div>
            </div>

            {filteredBuyers.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Comprador', 'Email', 'Importe', 'Fecha', 'Estado'].map((h) => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredBuyers.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-600 flex-shrink-0">
                            {sale.buyer.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                          </div>
                          <p className="text-xs font-semibold text-gray-800">{sale.buyer}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-gray-500">{sale.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className={`text-xs font-bold ${sale.status === 'reembolsado' ? 'text-red-400' : 'text-gray-800'}`}>
                          {sale.status === 'reembolsado' ? '-' : '+'}€{sale.amount}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-gray-400">{sale.date}</p>
                      </td>
                      <td className="px-4 py-3">
                        <SaleBadge status={sale.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-14 text-center">
                <UserRound size={32} className="text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400">
                  {buyersSearch ? 'No se encontraron resultados' : 'Aún no hay compradores para este evento'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Clientes section ──────────────────────────────────────────────────────────

type EmailLogStatus = 'enviado' | 'abierto' | 'rebotado';
type EmailLogType = 'Confirmación' | 'Ticket' | 'Recordatorio' | 'Reembolso' | 'Marketing';
interface EmailLog {
  id: string;
  subject: string;
  date: string;
  type: EmailLogType;
  status: EmailLogStatus;
}

const mockEmailHistory: Record<string, EmailLog[]> = {
  'carlos.m@email.com': [
    { id: 'em-1',  subject: 'Confirmación de compra – Festival Electrónico Madrid', date: 'Hace 5 min',    type: 'Confirmación',  status: 'enviado' },
    { id: 'em-2',  subject: 'Tus entradas están listas – Festival Electrónico Madrid', date: 'Hace 5 min', type: 'Ticket',        status: 'enviado' },
    { id: 'em-3',  subject: '¡Te esperamos mañana! – Festival Electrónico Madrid',    date: 'Hace 1 día',  type: 'Recordatorio',  status: 'abierto' },
    { id: 'em-4',  subject: 'Novedades de Infinity Events – Nuevos eventos disponibles', date: 'Hace 1 semana', type: 'Marketing', status: 'abierto' },
  ],
  'laura.s@email.com': [
    { id: 'em-5',  subject: 'Confirmación de compra – Tech Summit 2024',   date: 'Hace 23 min',   type: 'Confirmación', status: 'enviado' },
    { id: 'em-6',  subject: 'Tu entrada para Tech Summit 2024',            date: 'Hace 23 min',   type: 'Ticket',       status: 'enviado' },
    { id: 'em-7',  subject: 'Novedades de Infinity Events – Nuevos eventos', date: 'Hace 1 semana', type: 'Marketing',  status: 'rebotado' },
  ],
  'david.l@email.com': [
    { id: 'em-8',  subject: 'Confirmación de compra – Festival Electrónico Madrid', date: 'Hace 1h', type: 'Confirmación', status: 'abierto' },
    { id: 'em-9',  subject: 'Tus 3 entradas para Festival Electrónico Madrid',      date: 'Hace 1h', type: 'Ticket',       status: 'abierto' },
  ],
  'ana.r@email.com': [
    { id: 'em-10', subject: 'Compra pendiente de confirmación – Summer House Festival', date: 'Hace 2h', type: 'Confirmación',  status: 'enviado' },
    { id: 'em-11', subject: 'Recordatorio: Confirma tu pago – Summer House Festival',   date: 'Hace 1h', type: 'Recordatorio',  status: 'enviado' },
  ],
  'miguel.t@email.com': [
    { id: 'em-12', subject: 'Confirmación de compra – Trance Evolution',      date: 'Hace 4h', type: 'Confirmación', status: 'abierto' },
    { id: 'em-13', subject: 'Tu reembolso está en camino – Trance Evolution', date: 'Hace 3h', type: 'Reembolso',    status: 'enviado' },
  ],
  'sofia.g@email.com': [
    { id: 'em-14', subject: 'Confirmación de compra – Tech Summit 2024',       date: 'Ayer',        type: 'Confirmación', status: 'abierto' },
    { id: 'em-15', subject: 'Tus 2 entradas para Tech Summit 2024',            date: 'Ayer',        type: 'Ticket',       status: 'abierto' },
    { id: 'em-16', subject: 'Novedades de Infinity Events – Nuevos eventos',   date: 'Hace 1 semana', type: 'Marketing',  status: 'enviado' },
  ],
};

// Derive a unified client list from companySales
interface ClientRow {
  buyer: string;
  email: string;
  purchases: CompanySale[];
  totalSpent: number;
  totalTickets: number;
  totalEvents: number;
  lastPurchase: string;
}

function buildClients(): ClientRow[] {
  const map = new Map<string, ClientRow>();
  for (const s of companySales) {
    if (!map.has(s.email)) {
      map.set(s.email, { buyer: s.buyer, email: s.email, purchases: [], totalSpent: 0, totalTickets: 0, totalEvents: 0, lastPurchase: s.date });
    }
    const c = map.get(s.email)!;
    c.purchases.push(s);
    if (s.status !== 'reembolsado') c.totalSpent += s.amount;
    c.totalTickets += s.tickets;
  }
  return Array.from(map.values()).map((c) => ({
    ...c,
    totalEvents: new Set(c.purchases.map((p) => p.event)).size,
    lastPurchase: c.purchases[0]?.date ?? '–',
  }));
}

const emailLogTypeMeta: Record<EmailLogType, { color: string; bg: string }> = {
  Confirmación: { color: 'text-blue-700',   bg: 'bg-blue-50' },
  Ticket:       { color: 'text-violet-700', bg: 'bg-violet-50' },
  Recordatorio: { color: 'text-amber-700',  bg: 'bg-amber-50' },
  Reembolso:    { color: 'text-red-600',    bg: 'bg-red-50' },
  Marketing:    { color: 'text-gray-600',   bg: 'bg-gray-100' },
};

const emailStatusMeta: Record<EmailLogStatus, { label: string; color: string }> = {
  enviado:  { label: 'Enviado',  color: 'text-blue-600' },
  abierto:  { label: 'Abierto',  color: 'text-green-600' },
  rebotado: { label: 'Rebotado', color: 'text-red-500' },
};

// ── Client detail view ────────────────────────────────────────────────────────
function ClientDetailView({ client, onBack }: { client: ClientRow; onBack: () => void }) {
  const initials = client.buyer.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const emailLogs = mockEmailHistory[client.email] ?? [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-xl font-extrabold text-gray-900">Detalle de Cliente</h1>
      </div>

      {/* Client card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-start gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-extrabold text-gray-900">{client.buyer}</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Cliente Activo</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Mail size={13} className="text-gray-400" />{client.email}</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={13} className="text-gray-400" />Primer contacto: {client.purchases[client.purchases.length - 1]?.date ?? '–'}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-extrabold text-gray-900">€{client.totalSpent}</p>
          <p className="text-xs text-gray-400 font-medium">total gastado</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Eventos',          value: client.totalEvents,  icon: <CalendarDays size={18} />, bg: 'bg-violet-50', color: 'text-violet-600' },
          { label: 'Tickets Comprados', value: client.totalTickets, icon: <TicketCheck size={18} />,  bg: 'bg-green-50',  color: 'text-green-600' },
          { label: 'Total Gastado',    value: `€${client.totalSpent}`, icon: <DollarSign size={18} />, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Última Compra',    value: client.lastPurchase,  icon: <Clock size={18} />,        bg: 'bg-orange-50', color: 'text-orange-500' },
        ].map(({ label, value, icon, bg, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className={`w-9 h-9 rounded-xl ${bg} ${color} flex items-center justify-center mb-2`}>{icon}</div>
            <p className="text-xl font-extrabold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Purchases */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-900">Historial de Compras</p>
          </div>
          <div className="divide-y divide-gray-50">
            {client.purchases.map((sale) => (
              <div key={sale.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <TicketCheck size={15} className="text-violet-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{sale.event}</p>
                  <p className="text-xs text-gray-400">{sale.tickets} ticket{sale.tickets > 1 ? 's' : ''} · {sale.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${sale.status === 'reembolsado' ? 'text-red-400 line-through' : 'text-gray-900'}`}>
                    €{sale.amount}
                  </p>
                  <SaleBadge status={sale.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email history */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-900">Historial de Correos</p>
            <span className="text-xs text-gray-400">{emailLogs.length} email{emailLogs.length !== 1 ? 's' : ''}</span>
          </div>
          {emailLogs.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {emailLogs.map((log) => {
                const typeMeta = emailLogTypeMeta[log.type];
                const statusM = emailStatusMeta[log.status];
                return (
                  <div key={log.id} className="px-5 py-3.5 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${typeMeta.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Mail size={14} className={typeMeta.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 leading-snug">{log.subject}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${typeMeta.bg} ${typeMeta.color}`}>{log.type}</span>
                        <span className="text-[11px] text-gray-400">{log.date}</span>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold flex-shrink-0 ${statusM.color}`}>{statusM.label}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center">
              <Mail size={28} className="text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Sin historial de correos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Clientes list ─────────────────────────────────────────────────────────────
function ClientesSection() {
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientRow | null>(null);
  const clients = buildClients();

  if (selectedClient) {
    return <ClientDetailView client={selectedClient} onBack={() => setSelectedClient(null)} />;
  }

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return q === '' || c.buyer.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  const totalRevenue = clients.reduce((a, c) => a + c.totalSpent, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-400 mt-0.5">{clients.length} clientes únicos · €{totalRevenue.toLocaleString()} recaudados</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-extrabold text-violet-600">{clients.length}</p>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Clientes Únicos</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-extrabold text-green-600">€{Math.round(totalRevenue / (clients.length || 1))}</p>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Gasto Medio</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-extrabold text-blue-600">{clients.reduce((a, c) => a + c.totalTickets, 0)}</p>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Tickets Totales</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o email…"
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Cliente', 'Email', 'Eventos', 'Tickets', 'Total Gastado', 'Última Compra', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((client) => {
              const initials = client.buyer.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
              return (
                <tr
                  key={client.email}
                  className="hover:bg-violet-50/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {initials}
                      </div>
                      <p className="font-semibold text-gray-800">{client.buyer}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs text-gray-500">{client.email}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-gray-700">{client.totalEvents}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-gray-700">{client.totalTickets}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-bold text-gray-900">€{client.totalSpent}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs text-gray-400">{client.lastPurchase}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <ChevronRight size={16} className="text-gray-300" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-14 text-center">
            <Users size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Ventas section ────────────────────────────────────────────────────────────
const uniqueEvents = ['Todos los eventos', ...Array.from(new Set(companySales.map((s) => s.event)))];

function matchesPeriod(date: string, period: string) {
  if (period === 'todos') return true;
  const d = date.toLowerCase();
  if (period === 'hoy') return d.includes('min') || (d.includes('h') && !d.includes('hora') && !d.includes('ayer'));
  if (period === 'ayer') return d.includes('ayer') || d.includes('min') || d.includes('h');
  return true; // 'semana' = all
}

function VentasSection() {
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('Todos los eventos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [periodFilter, setPeriodFilter] = useState('todos');

  const filtered = companySales.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = q === '' || s.buyer.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.event.toLowerCase().includes(q);
    const matchEvent = eventFilter === 'Todos los eventos' || s.event === eventFilter;
    const matchStatus = statusFilter === 'todos' || s.status === statusFilter;
    const matchPeriod = matchesPeriod(s.date, periodFilter);
    return matchSearch && matchEvent && matchStatus && matchPeriod;
  });

  const totalFiltered = filtered.reduce((acc, s) => acc + (s.status !== 'reembolsado' ? s.amount : 0), 0);

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

      {/* ── Filters ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar comprador, email..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 transition-colors"
            />
          </div>

          {/* Event filter */}
          <div className="relative">
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="appearance-none text-sm bg-gray-50 border border-gray-200 text-gray-700 pl-3 pr-8 py-2 rounded-lg cursor-pointer hover:border-violet-400 focus:outline-none focus:border-violet-500 transition-colors font-medium"
            >
              {uniqueEvents.map((ev) => <option key={ev} value={ev}>{ev}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none text-sm bg-gray-50 border border-gray-200 text-gray-700 pl-3 pr-8 py-2 rounded-lg cursor-pointer hover:border-violet-400 focus:outline-none focus:border-violet-500 transition-colors font-medium"
            >
              <option value="todos">Todos los estados</option>
              <option value="completado">Completado</option>
              <option value="pendiente">Pendiente</option>
              <option value="reembolsado">Reembolsado</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Period filter */}
          <div className="relative">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="appearance-none text-sm bg-gray-50 border border-gray-200 text-gray-700 pl-3 pr-8 py-2 rounded-lg cursor-pointer hover:border-violet-400 focus:outline-none focus:border-violet-500 transition-colors font-medium"
            >
              <option value="todos">Cualquier fecha</option>
              <option value="hoy">Hoy</option>
              <option value="ayer">Ayer y hoy</option>
              <option value="semana">Esta semana</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Results count + reset */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-gray-400">
              <span className="font-bold text-gray-700">{filtered.length}</span> resultado{filtered.length !== 1 ? 's' : ''} · <span className="font-bold text-green-600">€{totalFiltered}</span>
            </span>
            {(search || eventFilter !== 'Todos los eventos' || statusFilter !== 'todos' || periodFilter !== 'todos') && (
              <button
                onClick={() => { setSearch(''); setEventFilter('Todos los eventos'); setStatusFilter('todos'); setPeriodFilter('todos'); }}
                className="text-xs text-violet-600 hover:text-violet-800 font-semibold transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
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
            {filtered.length > 0 ? filtered.map((sale) => (
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
            )) : (
              <tr>
                <td colSpan={6} className="text-center py-12 text-sm text-gray-400">No hay ventas para los filtros seleccionados</td>
              </tr>
            )}
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

// ── Config section ─────────────────────────────────────────────────────────────
function ConfigSection() {
  const [tab, setTab] = useState<'empresa' | 'plan' | 'notif' | 'seguridad'>('empresa');
  const [saved, setSaved] = useState(false);

  // Empresa form state
  const [form, setForm] = useState({
    name:   mockCompany.name,
    email:  mockCompany.email,
    phone:  mockCompany.phone,
    city:   mockCompany.city,
    sector: mockCompany.sector,
    cif:    mockCompany.cif,
    web:    'www.infinityevents.es',
  });

  // Notif toggles
  const [notif, setNotif] = useState({
    nuevaVenta:     true,
    recordatorio:   true,
    resumenSemanal: false,
    alertaStock:    true,
    newsletter:     false,
  });

  // Password form
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwMsg, setPwMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handlePwSave(e: React.FormEvent) {
    e.preventDefault();
    if (!pwForm.current) { setPwMsg({ type: 'err', text: 'Introduce tu contraseña actual.' }); return; }
    if (pwForm.next.length < 8) { setPwMsg({ type: 'err', text: 'La nueva contraseña debe tener al menos 8 caracteres.' }); return; }
    if (pwForm.next !== pwForm.confirm) { setPwMsg({ type: 'err', text: 'Las contraseñas no coinciden.' }); return; }
    setPwMsg({ type: 'ok', text: 'Contraseña actualizada correctamente.' });
    setPwForm({ current: '', next: '', confirm: '' });
    setTimeout(() => setPwMsg(null), 3000);
  }

  const tabs = [
    { id: 'empresa',   label: 'Empresa',       icon: <Building2 size={15} /> },
    { id: 'plan',      label: 'Plan',           icon: <CreditCard size={15} /> },
    { id: 'notif',     label: 'Notificaciones', icon: <Bell size={15} /> },
    { id: 'seguridad', label: 'Seguridad',      icon: <Shield size={15} /> },
  ] as const;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gestiona los datos y preferencias de tu cuenta</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === t.id ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Empresa ── */}
      {tab === 'empresa' && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900">Datos de la Empresa</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Nombre de la empresa', key: 'name',   icon: <Building2 size={14} />, placeholder: 'Nombre' },
              { label: 'CIF / NIF',            key: 'cif',    icon: <Shield size={14} />,    placeholder: 'B-12345678' },
              { label: 'Email de contacto',    key: 'email',  icon: <Mail size={14} />,      placeholder: 'email@empresa.es', type: 'email' },
              { label: 'Teléfono',             key: 'phone',  icon: <Phone size={14} />,     placeholder: '+34 91 000 00 00' },
              { label: 'Ciudad',               key: 'city',   icon: <MapPin size={14} />,    placeholder: 'Ciudad' },
              { label: 'Sector',               key: 'sector', icon: <Building2 size={14} />, placeholder: 'Sector' },
              { label: 'Sitio web',            key: 'web',    icon: <Globe size={14} />,     placeholder: 'www.empresa.es' },
            ].map(({ label, key, icon, placeholder, type }) => (
              <div key={key} className={key === 'web' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
                  <input
                    type={type ?? 'text'}
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">Miembro desde {mockCompany.memberSince}</p>
            <button
              type="submit"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              {saved ? <><Check size={15} /> Guardado</> : <><Save size={15} /> Guardar cambios</>}
            </button>
          </div>
        </form>
      )}

      {/* ── Tab: Plan ── */}
      {tab === 'plan' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">Plan Actual</h2>
                <p className="text-xs text-gray-500 mt-0.5">Tu suscripción activa</p>
              </div>
              <span className="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{mockCompany.plan}</span>
            </div>
            <div className="space-y-2.5">
              {[
                'Eventos ilimitados',
                'Hasta 10.000 tickets/mes',
                'Analytics avanzado',
                'Soporte prioritario por email',
                'API de integración',
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={14} className="text-green-500 flex-shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Próxima factura</p>
                <p className="text-sm font-bold text-gray-800">1 de abril 2026 · <span className="text-violet-600">€49/mes</span></p>
              </div>
              <button className="text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors">
                Gestionar suscripción →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Básico',    price: '€19/mes', features: ['5 eventos/mes', '500 tickets/mes', 'Soporte email'] },
              { name: 'Pro',       price: '€49/mes', features: ['Eventos ilimitados', '10k tickets/mes', 'Analytics + API'], current: true },
              { name: 'Enterprise',price: 'A medida', features: ['Sin límites', 'SLA garantizado', 'Account manager'] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-5 ${plan.current ? 'border-violet-400 bg-violet-50' : 'border-gray-100 bg-white'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-gray-900 text-sm">{plan.name}</p>
                  {plan.current && <span className="text-[10px] font-bold bg-violet-600 text-white px-2 py-0.5 rounded-full">Actual</span>}
                </div>
                <p className="text-lg font-extrabold text-violet-700 mb-3">{plan.price}</p>
                <ul className="space-y-1 mb-4">
                  {plan.features.map((f) => (
                    <li key={f} className="text-xs text-gray-600 flex items-center gap-1.5">
                      <Check size={11} className="text-green-500" />{f}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <button className="w-full text-xs font-bold border border-violet-300 text-violet-700 hover:bg-violet-50 py-1.5 rounded-lg transition-colors">
                    {plan.name === 'Enterprise' ? 'Contactar' : 'Cambiar plan'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: Notificaciones ── */}
      {tab === 'notif' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-gray-900">Preferencias de Notificación</h2>
          <p className="text-xs text-gray-500">Elige qué notificaciones quieres recibir por email.</p>
          <div className="space-y-3 pt-1">
            {[
              { key: 'nuevaVenta',     label: 'Nueva venta',         desc: 'Recibe un email cada vez que alguien compra una entrada.' },
              { key: 'recordatorio',   label: 'Recordatorio de evento', desc: 'Aviso 24 h antes del inicio de cada evento.' },
              { key: 'resumenSemanal', label: 'Resumen semanal',     desc: 'Informe de ventas y asistencia cada lunes.' },
              { key: 'alertaStock',    label: 'Alerta de stock',     desc: 'Aviso cuando quede menos del 10% de entradas.' },
              { key: 'newsletter',     label: 'Novedades de la plataforma', desc: 'Actualizaciones, nuevas funciones y consejos.' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => setNotif((n) => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                  className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 ${(notif as Record<string, boolean>)[key] ? 'bg-violet-600' : 'bg-gray-200'}`}
                  style={{ width: 40, height: 22 }}
                >
                  <span
                    className="absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform"
                    style={{ transform: (notif as Record<string, boolean>)[key] ? 'translateX(18px)' : 'translateX(0)' }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: Seguridad ── */}
      {tab === 'seguridad' && (
        <div className="space-y-4">
          {/* Change password */}
          <form onSubmit={handlePwSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Lock size={16} className="text-violet-600" />
              <h2 className="text-base font-bold text-gray-900">Cambiar Contraseña</h2>
            </div>
            {[
              { label: 'Contraseña actual',        key: 'current', placeholder: '••••••••' },
              { label: 'Nueva contraseña',         key: 'next',    placeholder: 'Mínimo 8 caracteres' },
              { label: 'Confirmar nueva contraseña', key: 'confirm', placeholder: 'Repite la contraseña' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                <input
                  type="password"
                  value={(pwForm as Record<string, string>)[key]}
                  onChange={(e) => setPwForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                />
              </div>
            ))}
            {pwMsg && (
              <p className={`text-xs font-semibold ${pwMsg.type === 'ok' ? 'text-green-600' : 'text-red-500'}`}>{pwMsg.text}</p>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              <Lock size={14} /> Actualizar contraseña
            </button>
          </form>

          {/* Danger zone */}
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-red-500" />
              <h2 className="text-base font-bold text-red-600">Zona de Peligro</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">Estas acciones son irreversibles. Procede con precaución.</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Exportar todos los datos</p>
                  <p className="text-xs text-gray-400">Descarga un ZIP con todos tus eventos y ventas.</p>
                </div>
                <button className="text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                  Exportar
                </button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-red-600">Eliminar cuenta</p>
                  <p className="text-xs text-gray-400">Borra permanentemente la cuenta y todos sus datos.</p>
                </div>
                <button className="text-xs font-bold border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
