import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ticket,
  Heart,
  User,
  Download,
  Share2,
  Wallet,
  Mail,
  Printer,
  MapPin,
  CalendarDays,
  CreditCard,
  UserRound,
  Tag,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  MessageCircle,
  BookOpen,
} from 'lucide-react';
import Footer from '../components/Footer';
import { navLinks, mockUser, userTickets, type UserTicket } from '../data/mock';
import { useApp } from '../context/AppContext';
import { getOrdersByEmail, type Order, type OrderEvent } from '../store/orderStore';

// ── Event meta by eventId ──────────────────────────────────────────────────────
const eventMeta: Record<string, {
  venue: string; city: string; address: string;
  date: string; time: string;
  image: string; gradient: string;
  purchaseDate: string;
}> = {
  '3f8a2c1d-4e5b-6f7a-8b9c-0d1e2f3a4b5c': {
    venue: 'IFEMA Center', city: 'Madrid', address: 'Av. del Partenón, s/n, Madrid',
    date: 'Sábado, 15 de Febrero 2024', time: '20:00 – 04:00',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=300&fit=crop&auto=format',
    gradient: 'from-violet-600 to-purple-700',
    purchaseDate: '10/01/2024',
  },
  '7c9d3e2f-1a4b-5c6d-7e8f-9a0b1c2d3e4f': {
    venue: 'Palacio de Congresos', city: 'Barcelona', address: 'Av. Diagonal, 661, Barcelona',
    date: 'Jueves, 22 de Febrero 2024', time: '09:00 – 18:00',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop&auto=format',
    gradient: 'from-blue-600 to-blue-700',
    purchaseDate: '05/01/2024',
  },
  'b2c3d4e5-f6a7-8901-bcde-f12345678901': {
    venue: 'WiZink Center', city: 'Madrid', address: 'Av. Felipe II, s/n, Madrid',
    date: 'Miércoles, 28 de Febrero 2024', time: '21:30 – 23:30',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=300&fit=crop&auto=format',
    gradient: 'from-orange-500 to-red-500',
    purchaseDate: '15/01/2024',
  },
  'c3d4e5f6-a7b8-9012-cdef-a34567890123': {
    venue: 'Teatro Español', city: 'Madrid', address: 'Calle del Príncipe, 25, Madrid',
    date: 'Miércoles, 10 de Enero 2024', time: '20:00 – 22:00',
    image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=600&h=300&fit=crop&auto=format',
    gradient: 'from-gray-600 to-gray-700',
    purchaseDate: '02/12/2023',
  },
};

// ── QR Code SVG (deterministic pattern from seed string) ──────────────────────
function QRCode({ seed, size = 160 }: { seed: string; size?: number }) {
  const GRID = 21;
  const cell = size / GRID;

  // deterministic hash
  function hash(s: string): number[] {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = (h * 0x01000193) >>> 0;
    }
    const bits: number[] = [];
    for (let i = 0; i < GRID * GRID; i++) {
      h ^= i * 0x9e3779b9;
      h = ((h << 5) | (h >>> 27)) >>> 0;
      bits.push(h & 1);
    }
    return bits;
  }

  const bits = hash(seed);

  // finder pattern positions (top-left, top-right, bottom-left corners)
  const finderCells = new Set<number>();
  function addFinder(row: number, col: number) {
    for (let r = row; r < row + 7; r++)
      for (let c = col; c < col + 7; c++) {
        const isOuter = r === row || r === row + 6 || c === col || c === col + 6;
        const isInner = r >= row + 2 && r <= row + 4 && c >= col + 2 && c <= col + 4;
        if (isOuter || isInner) finderCells.add(r * GRID + c);
      }
  }
  addFinder(0, 0); addFinder(0, 14); addFinder(14, 0);

  const cells: React.ReactNode[] = [];
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const idx = r * GRID + c;
      const isFinder = finderCells.has(idx);
      const filled = isFinder ? true : bits[idx] === 1;
      // skip white finder cells (the border logic handles color)
      const isFinderWhite = (() => {
        for (const [fr, fc] of [[0,0],[0,14],[14,0]] as [number,number][]) {
          if (r >= fr && r < fr+7 && c >= fc && c < fc+7) {
            const isOuter = r===fr||r===fr+6||c===fc||c===fc+6;
            const isInner = r>=fr+2&&r<=fr+4&&c>=fc+2&&c<=fc+4;
            if (!isOuter && !isInner) return true;
          }
        }
        return false;
      })();
      if (isFinderWhite) continue;
      if (!filled && !isFinder) continue;

      cells.push(
        <rect
          key={idx}
          x={c * cell}
          y={r * cell}
          width={cell}
          height={cell}
          fill={isFinder ? '#4c1d95' : '#1f2937'}
          rx={cell * 0.1}
        />
      );
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <rect width={size} height={size} fill="white" />
      {cells}
    </svg>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function UserNavbar() {
  const [open, setOpen] = useState(false);
  const { logout } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 py-4">
      <Link to="/" className="font-bold text-xl tracking-tight text-violet-700">EventHub</Link>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link key={link.label} to={link.href} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {mockUser.firstName[0]}
          </div>
          <span className="text-sm font-semibold text-gray-800 hidden sm:block">{mockUser.name}</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
        {open && (
          <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
            <Link to="/perfil" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <User size={14} className="text-gray-400" />Mi Perfil
            </Link>
            <Link to="/usuario" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <Ticket size={14} className="text-gray-400" />Mis Tickets
            </Link>
            <Link to="/favoritos" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <Heart size={14} className="text-gray-400" />Favoritos
            </Link>
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                onClick={() => { setOpen(false); logout(); navigate('/login'); }}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ── Build tickets from a real order event ────────────────────────────────────
const ORDER_COLORS = ['bg-violet-500','bg-blue-500','bg-green-500','bg-orange-500','bg-pink-500'];

function buildOrderTickets(orderForEvent: Order, ev: OrderEvent): UserTicket[] {
  const colorIdx = ev.eventId.charCodeAt(0) % ORDER_COLORS.length;
  return ev.items.flatMap((item) =>
    Array.from({ length: item.quantity }, (_, q) => ({
      id: `${orderForEvent.id}-${item.ticketId}-${q}`,
      ticketRef: `#${orderForEvent.orderRef}-${String(q + 1).padStart(3, '0')}`,
      eventId: ev.eventId,
      eventTitle: ev.eventTitle,
      iconColor: ORDER_COLORS[colorIdx],
      iconLetter: ev.eventTitle.slice(0, 2).toUpperCase(),
      date: ev.eventDate,
      zone: item.ticketName,
      type: item.ticketName,
      price: item.ticketPrice,
      status: 'activo' as const,
    }))
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function TicketDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();

  // Hooks must be unconditional — declare before any early return
  const [current, setCurrent] = useState(0);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleAddToWallet = () => setShowWalletModal(true);

  const handleSendEmail = () => {
    // ticket / meta may not be resolved yet at handler definition — use lazy refs
    const t = tickets[current];
    const m = meta;
    const subject = encodeURIComponent(`Tu Ticket: ${t?.eventTitle ?? ''}`);
    const body = encodeURIComponent(
      `Hola ${mockUser.name},\n\nAquí tienes tu ticket para ${t?.eventTitle ?? ''}.\n\nReferencia: ${t?.ticketRef ?? ''}\nFecha: ${m?.date ?? t?.date ?? ''}\nZona: ${t?.zone ?? ''}\nPrecio: ${t?.price ?? ''}€\n\nPresenta el código QR en la entrada del evento.\n\nEventHub`
    );
    window.location.href = `mailto:${mockUser.email}?subject=${subject}&body=${body}`;
  };

  const handlePrint = () => {
    const t = tickets[current];
    const m = meta;
    const qrEl = document.getElementById('ticket-qr-container');
    const qrSvgHTML = qrEl ? qrEl.innerHTML : '';

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ticket – ${t.eventTitle}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; background:#f9fafb; padding:24px; }
    .ticket { max-width:400px; margin:0 auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.12); }
    .hdr { background:linear-gradient(135deg,#7c3aed,#6d28d9); padding:24px; color:white; }
    .hdr h1 { font-size:20px; font-weight:800; margin-bottom:4px; }
    .hdr p { font-size:13px; opacity:.75; }
    .badge { display:inline-block; background:rgba(74,222,128,.3); color:#bbf7d0; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; margin-bottom:8px; }
    .ref { font-family:monospace; font-size:13px; font-weight:700; margin-top:8px; opacity:.9; }
    .qr-sec { padding:24px; text-align:center; border-bottom:1px dashed #e5e7eb; }
    .qr-sec p { font-size:12px; color:#9ca3af; margin-top:8px; }
    .details { padding:20px; }
    .row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f3f4f6; font-size:13px; }
    .row:last-child { border-bottom:none; }
    .lbl { color:#6b7280; }
    .val { font-weight:600; color:#111827; text-align:right; max-width:55%; }
    .foot { text-align:center; padding:14px; font-size:11px; color:#9ca3af; border-top:1px solid #f3f4f6; }
    @media print { body { padding:0; background:white; } .ticket { box-shadow:none; border-radius:0; } }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="hdr">
      <div class="badge">Entrada Válida</div>
      <h1>${t.eventTitle}</h1>
      <p>${t.zone} · ${t.type}</p>
      <p class="ref">${t.ticketRef}</p>
    </div>
    <div class="qr-sec">
      ${qrSvgHTML}
      <p>Presenta este código QR en la entrada del evento</p>
    </div>
    <div class="details">
      <div class="row"><span class="lbl">Fecha</span><span class="val">${m?.date ?? t.date}</span></div>
      ${m?.time ? `<div class="row"><span class="lbl">Hora</span><span class="val">${m.time}</span></div>` : ''}
      <div class="row"><span class="lbl">Lugar</span><span class="val">${m ? `${m.venue}, ${m.city}` : '–'}</span></div>
      <div class="row"><span class="lbl">Precio</span><span class="val">${t.price}€</span></div>
      <div class="row"><span class="lbl">Titular</span><span class="val">${mockUser.name}</span></div>
      <div class="row"><span class="lbl">Email</span><span class="val">${mockUser.email}</span></div>
    </div>
    <div class="foot">EventHub · eventhub.com</div>
  </div>
  <script>window.onload = function(){ window.print(); };<\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank', 'width=520,height=760');
    if (!printWindow) {
      URL.revokeObjectURL(url);
      showToast('No se pudo abrir la ventana de impresión', 'error');
      return;
    }
    // Revoke after the window has had time to load
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  // 1. Try mock tickets
  const mockTickets: UserTicket[] = userTickets.filter((t) => t.eventId === eventId);

  // 2. Try real order tickets
  let orderForEvent: Order | null = null;
  let orderEvent: OrderEvent | null = null;
  if (mockTickets.length === 0) {
    const orders = getOrdersByEmail(mockUser.email);
    outer: for (const o of orders) {
      for (const ev of o.events) {
        if (ev.eventId === eventId) {
          orderForEvent = o;
          orderEvent = ev;
          break outer;
        }
      }
    }
  }

  const orderTickets = orderForEvent && orderEvent
    ? buildOrderTickets(orderForEvent, orderEvent)
    : [];

  const tickets: UserTicket[] = mockTickets.length > 0 ? mockTickets : orderTickets;

  if (tickets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <UserNavbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-4">No se encontraron tickets para este evento.</p>
            <Link to="/usuario" className="text-violet-600 font-semibold text-sm hover:underline">Volver al dashboard</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Build meta: from mock lookup or from order event
  const meta = mockTickets.length > 0
    ? eventMeta[eventId ?? '']
    : orderEvent
    ? {
        venue: orderEvent.eventVenue,
        city: orderEvent.eventCity,
        address: `${orderEvent.eventVenue}, ${orderEvent.eventCity}`,
        date: orderEvent.eventDate,
        time: '',
        image: orderEvent.eventImage,
        gradient: 'from-violet-600 to-purple-700',
        purchaseDate: new Date(orderForEvent!.date).toLocaleDateString('es-ES'),
      }
    : undefined;

  const ticket = tickets[current];
  const isActive = ticket.status === 'activo';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UserNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
          <Link to="/usuario" className="hover:text-violet-600 transition-colors font-medium">Mis Tickets</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{ticket.eventTitle}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── LEFT: ticket card ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Ticket header */}
            <div className={`bg-gradient-to-r ${meta?.gradient ?? 'from-violet-600 to-purple-700'} rounded-2xl p-5 text-white`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${isActive ? 'bg-green-400/30 text-green-100' : 'bg-white/20 text-white/70'}`}>
                      {isActive ? 'Entrada Válida' : 'Entrada Usada'}
                    </span>
                    {isActive && <CheckCircle2 size={14} className="text-green-300" />}
                  </div>
                  <h1 className="text-xl font-extrabold leading-tight">{ticket.eventTitle}</h1>
                  <p className="text-white/70 text-sm mt-0.5">Ticket {ticket.type} · {ticket.zone}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mb-0.5">Ticket ID</p>
                  <p className="font-mono text-sm font-bold text-white/90">{ticket.ticketRef}</p>
                </div>
              </div>
            </div>

            {/* QR section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {/* Multi-ticket navigator */}
              {tickets.length > 1 && (
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm font-bold text-gray-900">Código QR de Entrada</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Ticket <span className="font-semibold text-violet-600">{current + 1}</span> de <span className="font-semibold">{tickets.length}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                      disabled={current === 0}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {/* Dot indicators */}
                    <div className="flex items-center gap-1 px-2">
                      {tickets.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          className={`rounded-full transition-all ${i === current ? 'w-5 h-2 bg-violet-600' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrent((c) => Math.min(tickets.length - 1, c + 1))}
                      disabled={current === tickets.length - 1}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {tickets.length === 1 && (
                <p className="text-sm font-bold text-gray-900 mb-5">Código QR de Entrada</p>
              )}

              {/* QR + ref */}
              <div className="flex flex-col items-center">
                <div id="ticket-qr-container" className={`p-4 rounded-2xl border-2 mb-3 transition-all ${isActive ? 'border-violet-200 bg-violet-50/30' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
                  <QRCode seed={ticket.ticketRef} size={168} />
                </div>
                <p className="font-mono text-sm font-bold text-gray-700 mb-1">{ticket.ticketRef}</p>
                <p className="text-xs text-gray-400">Presenta este código QR en la entrada del evento</p>

                {/* Actions */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => showToast('Descargando ticket…', 'info')}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow transition-colors"
                  >
                    <Download size={15} />
                    Descargar
                  </button>
                  <button
                    onClick={() => showToast('Enlace copiado al portapapeles', 'success')}
                    className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Share2 size={15} />
                    Compartir
                  </button>
                </div>
              </div>
            </div>

            {/* Event info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Información del Evento</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <CalendarDays size={15} className="text-violet-500" />,
                    label: 'Fecha y Hora',
                    value: meta?.date ?? ticket.date,
                    sub: meta?.time,
                  },
                  {
                    icon: <CreditCard size={15} className="text-green-500" />,
                    label: 'Precio',
                    value: `${ticket.price}€ (incluye tasas)`,
                    sub: `Comprado el ${meta?.purchaseDate ?? '–'}`,
                  },
                  {
                    icon: <MapPin size={15} className="text-blue-500" />,
                    label: 'Ubicación',
                    value: meta ? `${meta.venue}` : '–',
                    sub: meta?.address,
                  },
                  {
                    icon: <UserRound size={15} className="text-orange-400" />,
                    label: 'Titular',
                    value: mockUser.name,
                    sub: mockUser.email,
                  },
                  {
                    icon: <Tag size={15} className="text-pink-500" />,
                    label: 'Tipo de Entrada',
                    value: ticket.type,
                    sub: ticket.zone,
                  },
                  {
                    icon: <CheckCircle2 size={15} className={isActive ? 'text-green-500' : 'text-gray-400'} />,
                    label: 'Estado',
                    value: isActive ? 'Válido' : 'Usado',
                    sub: undefined,
                    valueClass: isActive ? 'text-green-600 font-bold' : 'text-gray-400 font-bold',
                  },
                ].map(({ icon, label, value, sub, valueClass }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{label}</p>
                      <p className={`text-sm font-semibold text-gray-800 mt-0.5 ${valueClass ?? ''}`}>{value}</p>
                      {sub && <p className="text-xs text-gray-400">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT sidebar ─────────────────────────────────────────── */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0 space-y-4">

            {/* Event image */}
            {meta && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <img src={meta.image} alt={ticket.eventTitle} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <p className="text-sm font-bold text-gray-900">{ticket.eventTitle}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <MapPin size={11} />{meta.venue}, {meta.city}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <CalendarDays size={11} />{meta.date}
                  </p>
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-bold text-gray-900 mb-3">Acciones Rápidas</p>
              <div className="space-y-2">
                {[
                  { icon: <Wallet size={15} />, label: 'Añadir a Wallet', color: 'bg-violet-600 hover:bg-violet-700 text-white', action: handleAddToWallet },
                  { icon: <Mail size={15} />, label: 'Enviar por Email', color: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50', action: handleSendEmail },
                  { icon: <Printer size={15} />, label: 'Imprimir / PDF', color: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50', action: handlePrint },
                ].map(({ icon, label, color, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${color}`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Important info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-amber-500" />
                <p className="text-sm font-bold text-gray-900">Información Importante</p>
              </div>
              <ul className="space-y-2">
                {[
                  'Llega al menos 1 hora antes del evento',
                  'Presenta tu DNI junto al ticket QR',
                  'No se permite la reentrada al recinto',
                  'Consulta las restricciones de edad',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={14} className="text-violet-500" />
                <p className="text-sm font-bold text-gray-900">¿Necesitas Ayuda?</p>
              </div>
              <div className="space-y-2">
                <button onClick={() => showToast('Abriendo chat de soporte…', 'info')} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <MessageCircle size={14} className="text-violet-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Contactar Soporte</p>
                    <p className="text-[11px] text-gray-400">Chat en vivo disponible</p>
                  </div>
                </button>
                <button onClick={() => navigate('/contacto')} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <BookOpen size={14} className="text-violet-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Preguntas Frecuentes</p>
                    <p className="text-[11px] text-gray-400">Encuentra respuestas rápidas</p>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      {/* ── Wallet Modal ─────────────────────────────────────────────────── */}
      {showWalletModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowWalletModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-gray-900">Añadir a Wallet</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-5">Elige dónde quieres guardar tu ticket digital.</p>

            <div className="space-y-3">
              {/* Apple Wallet */}
              <button
                onClick={() => {
                  const passData = JSON.stringify({
                    formatVersion: 1,
                    passTypeIdentifier: 'pass.com.eventhub.ticket',
                    serialNumber: ticket.ticketRef,
                    teamIdentifier: 'EVENTHUB',
                    description: ticket.eventTitle,
                    eventTicket: {
                      primaryFields: [{ key: 'event', label: 'EVENTO', value: ticket.eventTitle }],
                      secondaryFields: [
                        { key: 'date', label: 'FECHA', value: meta?.date ?? ticket.date },
                        { key: 'zone', label: 'ZONA', value: ticket.zone },
                      ],
                    },
                  });
                  const blob = new Blob([passData], { type: 'application/vnd.apple.pkpass' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `ticket-${ticket.ticketRef}.pkpass`;
                  a.click();
                  URL.revokeObjectURL(url);
                  setShowWalletModal(false);
                  showToast('Ticket descargado para Apple Wallet', 'success');
                }}
                className="w-full flex items-center gap-3 bg-black hover:bg-gray-900 text-white font-semibold text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple Wallet
              </button>

              {/* Google Wallet */}
              <button
                onClick={() => {
                  const passData = JSON.stringify({
                    iss: 'eventhub@eventhub.iam.gserviceaccount.com',
                    aud: 'google',
                    typ: 'savetowallet',
                    payload: {
                      eventTicketObjects: [{
                        id: `eventhub.${ticket.ticketRef}`,
                        classId: `eventhub.${ticket.eventId}`,
                        ticketHolderName: mockUser.name,
                        ticketNumber: ticket.ticketRef,
                        seatInfo: { section: { defaultValue: { language: 'es', value: ticket.zone } } },
                      }],
                    },
                  });
                  const blob = new Blob([passData], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `ticket-${ticket.ticketRef}-google.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                  setShowWalletModal(false);
                  showToast('Ticket descargado para Google Wallet', 'success');
                }}
                className="w-full flex items-center gap-3 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold text-sm px-4 py-3 rounded-xl transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google Wallet
              </button>
            </div>

            <p className="text-[11px] text-gray-400 text-center mt-4">
              El archivo se descargará a tu dispositivo para importarlo en la app de Wallet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
