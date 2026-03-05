import { useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ChevronDown,
  Upload,
  ImagePlus,
  MapPin,
  CalendarDays,
  Ticket,
  Settings2,
  UserRound,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  LogOut,
  LayoutDashboard,
  Save,
  Send,
  X,
  ChevronLeft,
} from 'lucide-react';
import Footer from '../components/Footer';
import { mockCompany } from '../data/mock';
import { addEvent, updateEvent, getCategoryColor, formatDateLabel, getEvents } from '../store/eventStore';

// ── Helpers ────────────────────────────────────────────────────────────────────
const categories = [
  'Música', 'Conferencia', 'Concierto', 'Deportes', 'Arte', 'Gastronomía',
  'Comedia', 'Jazz', 'Teatro', 'Tecnología', 'Corporativo', 'Otro',
];

const subcategoriesByCategory: Record<string, string[]> = {
  Música:       ['Electrónica', 'Rock', 'Pop', 'Clásica', 'Hip-Hop', 'Reggaeton'],
  Conferencia:  ['Tecnología', 'Negocios', 'Salud', 'Educación', 'Ciencia'],
  Concierto:    ['Bandas', 'Solista', 'Orquesta', 'Tributo'],
  Deportes:     ['Fútbol', 'Baloncesto', 'Tenis', 'Running', 'Natación'],
  Arte:         ['Exposición', 'Pintura', 'Escultura', 'Fotografía'],
  Gastronomía:  ['Festival', 'Cata de Vinos', 'Showcooking', 'Maridaje'],
  Comedia:      ['Stand Up', 'Monólogo', 'Improv'],
  Jazz:         ['Big Band', 'Trio', 'Solo'],
  Teatro:       ['Drama', 'Comedia', 'Musical', 'Infantil'],
  Tecnología:   ['IA', 'Web', 'Startups', 'Ciberseguridad'],
  Corporativo:  ['Gala', 'Team Building', 'Formación', 'Lanzamiento'],
  Otro:         ['General'],
};

interface TicketType {
  id: number;
  name: string;
  price: string;
  quantity: string;
  serviceType: string;
  description: string;
  notes: string;
}

// ── Field wrappers ─────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-bold text-gray-700 mb-1.5">{children}</label>;
}

function Input({ value, onChange, placeholder, type = 'text', className = '' }: {
  value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 transition ${className}`}
    />
  );
}

function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 transition appearance-none bg-white"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

function Toggle({ value, onChange, label, sub }: {
  value: boolean; onChange: (v: boolean) => void; label: string; sub?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full flex-shrink-0 transition-colors ${value ? 'bg-violet-600' : 'bg-gray-200'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

function SectionCard({ id, icon, title, children }: {
  id: string; icon: React.ReactNode; title: string; children: React.ReactNode;
}) {
  return (
    <div id={id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-20">
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function CompanyNavbar() {
  const { logout } = useApp();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 py-3.5">
      <div className="flex items-center gap-3">
        <Link to="/empresa/dashboard" className="font-bold text-xl tracking-tight text-violet-700">EventHub</Link>
        <span className="text-gray-300 text-lg">·</span>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">Panel Empresa</span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm">
        <Link to="/empresa/dashboard" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors font-medium">
          <LayoutDashboard size={14} />Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold">
          {mockCompany.logo}
        </div>
        <span className="text-sm font-semibold text-gray-800 hidden sm:block">{mockCompany.name}</span>
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="ml-2 flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={13} />
        </button>
      </div>
    </header>
  );
}

// ── Event date helpers ─────────────────────────────────────────────────────────
// Converts "15 Feb 2024" → "2024-02-15" for <input type="date">
function toInputDate(label: string): string {
  const months: Record<string, string> = {
    Ene:'01',Feb:'02',Mar:'03',Abr:'04',May:'05',Jun:'06',
    Jul:'07',Ago:'08',Sep:'09',Oct:'10',Nov:'11',Dic:'12',
  };
  const [day, mon, year] = label.split(' ');
  if (!day || !mon || !year) return '';
  return `${year}-${months[mon] ?? '01'}-${day.padStart(2,'0')}`;
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CreateEventPage() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { eventId } = useParams<{ eventId?: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-load existing event when editing
  const existing = eventId ? getEvents().find((e) => e.id === eventId) : undefined;
  const isEdit = !!existing;

  // ── Form state ──────────────────────────────────────────────────────────────
  const [name, setName]             = useState(existing?.title ?? '');
  const [category, setCategory]     = useState(existing?.category ?? '');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState(
    isEdit ? `Disfruta de una experiencia única en ${existing!.title}, uno de los eventos más esperados del año en ${existing!.city}.` : ''
  );
  const [limitAttendees, setLimitAttendees] = useState(false);
  const [website, setWebsite]       = useState('');

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragging, setDragging]     = useState(false);

  const [country, setCountry]       = useState('España');
  const [city, setCity]             = useState(existing?.city ?? '');
  const [venueName, setVenueName]   = useState(existing?.venue ?? '');
  const [address, setAddress]       = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [region, setRegion]         = useState('Madrid');
  const [startDate, setStartDate]   = useState(existing ? toInputDate(existing.date) : '');
  const [startTime, setStartTime]   = useState('');
  const [endDate, setEndDate]       = useState('');
  const [endTime, setEndTime]       = useState('');

  const [tickets, setTickets]       = useState<TicketType[]>(
    isEdit
      ? [{ id: 1, name: 'Entrada General', price: String(Math.round(existing!.revenue / Math.max(existing!.ticketsSold, 1))), quantity: String(existing!.ticketsTotal), serviceType: 'De Pago', description: '', notes: '' }]
      : [{ id: 1, name: '', price: '', quantity: '', serviceType: 'Gratuito', description: '', notes: '' }]
  );

  const [featured, setFeatured]     = useState(false);
  const [allowResale, setAllowResale] = useState(true);
  const [waitlist, setWaitlist]     = useState(false);
  const [requireApproval, setRequireApproval] = useState(false);
  const [showAttendees, setShowAttendees] = useState(false);

  const [orgName, setOrgName]       = useState(mockCompany.name);
  const [orgEmail, setOrgEmail]     = useState(mockCompany.email);
  const [orgPhone, setOrgPhone]     = useState(mockCompany.phone);
  const [orgWebsite, setOrgWebsite] = useState('');
  const [orgBio, setOrgBio]         = useState('');

  // ── Checklist ───────────────────────────────────────────────────────────────
  const checklist = [
    { label: 'Imagen del evento', done: !!imagePreview },
    { label: 'Ubicación añadida', done: !!city && !!venueName },
    { label: 'Fecha de inicio', done: !!startDate && !!startTime },
    { label: 'URL del evento', done: !!website },
  ];
  const checklistDone = checklist.filter((c) => c.done).length;

  // ── Image handlers ──────────────────────────────────────────────────────────
  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      showToast('Solo se permiten imágenes', 'error');
      return;
    }
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  // ── Ticket helpers ──────────────────────────────────────────────────────────
  function addTicket() {
    setTickets((prev) => [
      ...prev,
      { id: Date.now(), name: '', price: '', quantity: '', serviceType: 'Gratuito', description: '', notes: '' },
    ]);
  }

  function updateTicket(id: number, field: keyof TicketType, value: string) {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t));
  }

  function removeTicket(id: number) {
    if (tickets.length === 1) return;
    setTickets((prev) => prev.filter((t) => t.id !== id));
  }

  // ── Build CompanyEvent from form ────────────────────────────────────────────
  function buildEvent(status: 'activo' | 'borrador'): import('../data/mock').CompanyEvent {
    const qty   = parseInt(tickets[0]?.quantity || '0') || 0;
    const price = parseFloat(tickets[0]?.price   || '0') || 0;
    return {
      id:           isEdit ? existing!.id : `cev-${Date.now()}`,
      title:        name.trim() || 'Sin título',
      date:         formatDateLabel(startDate),
      venue:        venueName || 'Por confirmar',
      city:         city      || 'Por confirmar',
      ticketsSold:  isEdit ? existing!.ticketsSold : 0,
      ticketsTotal: qty,
      revenue:      isEdit ? existing!.revenue : 0,
      status,
      category:     category || 'Otro',
      categoryColor: getCategoryColor(category || 'Otro'),
      image:        imagePreview || existing?.image || undefined,
      price,
      description:  description || undefined,
    };
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  function handlePublish() {
    if (!name.trim()) { showToast('El nombre del evento es obligatorio', 'error'); return; }
    if (!category)    { showToast('Selecciona una categoría', 'error'); return; }
    if (!startDate)   { showToast('La fecha de inicio es obligatoria', 'error'); return; }
    const event = buildEvent('activo');
    isEdit ? updateEvent(event) : addEvent(event);
    showToast(isEdit ? '¡Cambios guardados correctamente!' : '¡Evento publicado correctamente!', 'success');
    setTimeout(() => navigate('/empresa/dashboard'), 1200);
  }

  function handleDraft() {
    if (!name.trim()) { showToast('El nombre del evento es obligatorio', 'error'); return; }
    const event = buildEvent('borrador');
    isEdit ? updateEvent(event) : addEvent(event);
    showToast(isEdit ? 'Cambios guardados como borrador' : 'Borrador guardado', 'info');
    setTimeout(() => navigate('/empresa/dashboard'), 800);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CompanyNavbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-8 py-3 flex items-center gap-2 text-xs text-gray-400">
        <Link to="/empresa/dashboard" className="hover:text-violet-600 transition-colors font-medium flex items-center gap-1">
          <ChevronLeft size={13} />Dashboard
        </Link>
        <span>/</span>
        <span className="text-gray-600 font-semibold">{isEdit ? `Editar: ${existing!.title}` : 'Crear Nuevo Evento'}</span>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT: Form ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Información Básica */}
            <SectionCard id="info" icon={<AlertCircle size={16} />} title="Información Básica">
              <div className="space-y-4">
                <div>
                  <Label>Nombre del Evento *</Label>
                  <Input value={name} onChange={setName} placeholder="Ej: Festival Electrónico Madrid 2024" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Categoría *</Label>
                    <Select value={category} onChange={(v) => { setCategory(v); setSubcategory(''); }} options={categories} placeholder="Selecciona una categoría" />
                  </div>
                  <div>
                    <Label>Subcategoría</Label>
                    <Select
                      value={subcategory}
                      onChange={setSubcategory}
                      options={category ? subcategoriesByCategory[category] ?? [] : []}
                      placeholder="Selecciona subcategoría"
                    />
                  </div>
                </div>
                <div>
                  <Label>Descripción del Evento</Label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe tu evento de forma atractiva para los asistentes…"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 transition resize-none"
                  />
                  <p className="text-[11px] text-gray-400 mt-1 text-right">{description.length} / 2000</p>
                </div>
                <Toggle value={limitAttendees} onChange={setLimitAttendees} label="Límite de asistencia" sub="Establece un número máximo de asistentes" />
                <div>
                  <Label>Sitio Web del Evento</Label>
                  <Input value={website} onChange={setWebsite} placeholder="https://mi-evento.com" type="url" />
                </div>
              </div>
            </SectionCard>

            {/* Imagen del Evento */}
            <SectionCard id="image" icon={<ImagePlus size={16} />} title="Imagen del Evento">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  dragging ? 'border-violet-400 bg-violet-50' : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
                }`}
              >
                <Upload size={32} className={`mb-3 ${dragging ? 'text-violet-500' : 'text-gray-300'}`} />
                <p className="text-sm font-semibold text-gray-600">Arrastra y suelta la imagen aquí</p>
                <p className="text-xs text-gray-400 mt-1">o haz clic para seleccionar</p>
                <button
                  type="button"
                  className="mt-4 text-xs font-semibold text-violet-600 border border-violet-200 px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                >
                  Seleccionar Imagen
                </button>
                <p className="text-[11px] text-gray-300 mt-2">PNG, JPG, WEBP · Máximo 10MB · Recomendado 1920×1080</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
              </div>

              {imagePreview && (
                <div className="mt-4 relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </SectionCard>

            {/* Ubicación y Fecha */}
            <SectionCard id="location" icon={<MapPin size={16} />} title="Ubicación y Fecha">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>País</Label>
                    <Select value={country} onChange={setCountry} options={['España', 'México', 'Argentina', 'Colombia', 'Chile', 'Otro']} />
                  </div>
                  <div>
                    <Label>Ciudad *</Label>
                    <Input value={city} onChange={setCity} placeholder="Madrid" />
                  </div>
                </div>
                <div>
                  <Label>Nombre del Lugar</Label>
                  <Input value={venueName} onChange={setVenueName} placeholder="Ej: IFEMA Center, WiZink Center…" />
                </div>
                <div>
                  <Label>Dirección</Label>
                  <Input value={address} onChange={setAddress} placeholder="Calle y número" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Código Postal</Label>
                    <Input value={postalCode} onChange={setPostalCode} placeholder="28001" />
                  </div>
                  <div>
                    <Label>Comunidad / Estado</Label>
                    <Select value={region} onChange={setRegion} options={[
                      'Madrid', 'Cataluña', 'Comunidad Valenciana', 'Andalucía', 'País Vasco',
                      'Galicia', 'Aragón', 'Castilla y León', 'Navarra', 'Otra',
                    ]} placeholder="Selecciona" />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Fechas</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Fecha de Inicio *</Label>
                      <Input value={startDate} onChange={setStartDate} type="date" />
                    </div>
                    <div>
                      <Label>Hora de Inicio *</Label>
                      <Input value={startTime} onChange={setStartTime} type="time" />
                    </div>
                    <div>
                      <Label>Fecha de Fin</Label>
                      <Input value={endDate} onChange={setEndDate} type="date" />
                    </div>
                    <div>
                      <Label>Hora de Fin</Label>
                      <Input value={endTime} onChange={setEndTime} type="time" />
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Tickets y Precios */}
            <SectionCard id="tickets" icon={<Ticket size={16} />} title="Tickets y Precios">
              <div className="space-y-5">
                {tickets.map((t, idx) => (
                  <div key={t.id} className="border border-gray-200 rounded-2xl p-4 space-y-3 relative">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[11px] font-bold">{idx + 1}</div>
                        <p className="text-sm font-bold text-gray-700">Tipo de Ticket #{idx + 1}</p>
                      </div>
                      {tickets.length > 1 && (
                        <button
                          onClick={() => removeTicket(t.id)}
                          className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <Label>Nombre del Ticket</Label>
                        <Input value={t.name} onChange={(v) => updateTicket(t.id, 'name', v)} placeholder="Ej: Entrada General, VIP…" />
                      </div>
                      <div>
                        <Label>Precio (€)</Label>
                        <Input value={t.price} onChange={(v) => updateTicket(t.id, 'price', v)} placeholder="0.00" type="number" />
                      </div>
                      <div>
                        <Label>Cantidad Disponible</Label>
                        <Input value={t.quantity} onChange={(v) => updateTicket(t.id, 'quantity', v)} placeholder="100" type="number" />
                      </div>
                      <div className="col-span-2">
                        <Label>Tipo de Servicio</Label>
                        <Select
                          value={t.serviceType}
                          onChange={(v) => updateTicket(t.id, 'serviceType', v)}
                          options={['Gratuito', 'De Pago', 'Donación', 'Por Invitación']}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Descripción del Ticket</Label>
                        <Input value={t.description} onChange={(v) => updateTicket(t.id, 'description', v)} placeholder="Qué incluye este ticket…" />
                      </div>
                      <div className="col-span-2">
                        <Label>Notas Adicionales</Label>
                        <Input value={t.notes} onChange={(v) => updateTicket(t.id, 'notes', v)} placeholder="Información extra para el comprador…" />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTicket}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-violet-300 text-gray-400 hover:text-violet-600 font-semibold text-sm py-3 rounded-2xl transition-all"
                >
                  <Plus size={16} />
                  Añadir Otro Tipo de Ticket
                </button>
              </div>
            </SectionCard>

            {/* Configuración Adicional */}
            <SectionCard id="config" icon={<Settings2 size={16} />} title="Configuración Adicional">
              <div>
                <Toggle value={featured} onChange={setFeatured} label="Evento Destacado" sub="Tu evento aparecerá en la sección de destacados de la plataforma" />
                <Toggle value={allowResale} onChange={setAllowResale} label="Reenvío de Tickets" sub="Los asistentes pueden transferir sus tickets a otras personas" />
                <Toggle value={waitlist} onChange={setWaitlist} label="Permitir Lista de Espera" sub="Los usuarios pueden apuntarse si el evento se agota" />
                <Toggle value={requireApproval} onChange={setRequireApproval} label="Requiere Aprobación" sub="Debes aprobar manualmente cada solicitud de ticket" />
                <Toggle value={showAttendees} onChange={setShowAttendees} label="Mostrar Asistentes" sub="Los usuarios podrán ver quién asistirá al evento" />
              </div>
            </SectionCard>

            {/* Información del Organizador */}
            <SectionCard id="organizer" icon={<UserRound size={16} />} title="Información del Organizador">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre del Organizador</Label>
                    <Input value={orgName} onChange={setOrgName} placeholder="Nombre de la empresa u organizador" />
                  </div>
                  <div>
                    <Label>Email de Contacto</Label>
                    <Input value={orgEmail} onChange={setOrgEmail} placeholder="contacto@empresa.com" type="email" />
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <Input value={orgPhone} onChange={setOrgPhone} placeholder="+34 600 000 000" type="tel" />
                  </div>
                  <div>
                    <Label>Sitio Web</Label>
                    <Input value={orgWebsite} onChange={setOrgWebsite} placeholder="https://miempresa.com" type="url" />
                  </div>
                </div>
                <div>
                  <Label>Sobre el Organizador</Label>
                  <textarea
                    value={orgBio}
                    onChange={(e) => setOrgBio(e.target.value)}
                    rows={3}
                    placeholder="Breve descripción de tu empresa u organización…"
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 transition resize-none"
                  />
                </div>
              </div>
            </SectionCard>

          </div>

          {/* ── RIGHT: Sidebar ──────────────────────────────────────────── */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0 space-y-4 lg:sticky lg:top-20">

            {/* Vista previa */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="relative">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-36 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <ImagePlus size={28} className="text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-gray-900 truncate">{name || 'Nombre del Evento'}</p>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <MapPin size={11} />{venueName || 'Lugar'}{city ? `, ${city}` : ''}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <CalendarDays size={11} />{startDate || 'Fecha pendiente'}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {category && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">{category}</span>
                  )}
                  {tickets[0]?.price ? (
                    <span className="text-xs font-bold text-gray-700">Desde €{tickets[0].price}</span>
                  ) : (
                    <span className="text-xs font-bold text-green-600">Gratis</span>
                  )}
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-900">Lista de Verificación</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${checklistDone === checklist.length ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-600'}`}>
                  {checklistDone}/{checklist.length}
                </span>
              </div>
              <div className="space-y-2">
                {checklist.map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    {done
                      ? <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
                      : <XCircle size={15} className="text-gray-300 flex-shrink-0" />
                    }
                    <span className={`text-xs font-medium ${done ? 'text-gray-700' : 'text-gray-400'}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2.5">
              <button
                onClick={handlePublish}
                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-md transition-colors"
              >
                <Send size={15} />
                {isEdit ? 'Guardar Cambios' : 'Publicar Evento'}
              </button>
              <button
                onClick={handleDraft}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
              >
                <Save size={15} />
                Guardar Borrador
              </button>
              <button
                onClick={() => navigate('/empresa/dashboard')}
                className="w-full text-sm text-gray-400 hover:text-gray-600 font-medium py-1 transition-colors"
              >
                Cancelar
              </button>
            </div>

            {/* Terms note */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-amber-700 mb-1.5">Términos</p>
              <p className="text-[11px] text-amber-600 leading-relaxed">
                Al publicar este evento aceptas los{' '}
                <Link to="/terminos" className="underline hover:text-amber-800">términos y condiciones</Link>{' '}
                de la plataforma y confirmas que tienes los derechos para organizar este evento.
              </p>
            </div>

            {/* Jump links */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2.5">Secciones</p>
              <div className="space-y-1">
                {[
                  { id: 'info', label: 'Información Básica' },
                  { id: 'image', label: 'Imagen del Evento' },
                  { id: 'location', label: 'Ubicación y Fecha' },
                  { id: 'tickets', label: 'Tickets y Precios' },
                  { id: 'config', label: 'Configuración Adicional' },
                  { id: 'organizer', label: 'Información del Organizador' },
                ].map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-xs font-medium text-gray-500 hover:text-violet-600 py-1 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
