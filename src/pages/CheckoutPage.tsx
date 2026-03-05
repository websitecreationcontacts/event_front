import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Check,
  Shield,
  Clock,
  Smartphone,
  Lock,
  CreditCard,
  ChevronLeft,
  Ticket,
  MapPin,
  Calendar,
  AlertCircle,
  Plus,
  Minus,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Download,
  ArrowRight,
  ShoppingCart,
  Trash2,
  LogIn,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartTotal,
  type CartItem,
} from '../store/cartStore';
import { saveOrder } from '../store/orderStore';
import { useApp } from '../context/AppContext';

// ── Constants ─────────────────────────────────────────────────────────────────
const SERVICE_FEE_RATE = 0.077;

// ── Group cart items by event ─────────────────────────────────────────────────
type EventGroup = {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  eventCity: string;
  eventImage: string;
  items: CartItem[];
};

function groupByEvent(cart: CartItem[]): EventGroup[] {
  const map = new Map<string, EventGroup>();
  for (const item of cart) {
    if (!map.has(item.eventId)) {
      map.set(item.eventId, {
        eventId: item.eventId,
        eventTitle: item.eventTitle,
        eventDate: item.eventDate,
        eventVenue: item.eventVenue,
        eventCity: item.eventCity,
        eventImage: item.eventImage,
        items: [],
      });
    }
    map.get(item.eventId)!.items.push(item);
  }
  return Array.from(map.values());
}

// ── Step indicator ────────────────────────────────────────────────────────────
const STEPS = ['Carrito', 'Pago', 'Confirmación'];

function StepBar({ current, onStep }: { current: number; onStep?: (step: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-0 py-6 mb-2">
      {STEPS.map((label, i) => {
        const isCompleted = i < current;
        const isActive = i === current;
        // Allow clicking completed steps only while not on confirmation
        const isClickable = isCompleted && !!onStep && current < 2;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={isClickable ? () => { window.scrollTo({ top: 0, behavior: 'smooth' }); onStep(i); } : undefined}
                disabled={!isClickable}
                title={isClickable ? `Volver a ${label}` : undefined}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-200
                  ${isCompleted
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : isActive
                    ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-200'
                    : 'bg-white border-gray-200 text-gray-400'
                  }
                  ${isClickable ? 'cursor-pointer hover:bg-violet-700 hover:border-violet-700 hover:scale-110 active:scale-95' : 'cursor-default'}
                `}
              >
                {isCompleted ? <Check size={16} /> : i + 1}
              </button>
              <span className={`text-xs font-semibold transition-colors ${
                isActive ? 'text-violet-700' : isCompleted ? 'text-violet-500' : 'text-gray-400'
              } ${isClickable ? 'cursor-pointer hover:text-violet-700' : ''}`}
                onClick={isClickable ? () => { window.scrollTo({ top: 0, behavior: 'smooth' }); onStep!(i); } : undefined}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-24 h-0.5 mx-2 mb-4 transition-colors duration-300 ${i < current ? 'bg-violet-500' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Order summary sidebar ─────────────────────────────────────────────────────
function OrderSummary({ groups, subtotal, fee, showTrust = false }: {
  groups: EventGroup[];
  subtotal: number;
  fee: number;
  showTrust?: boolean;
}) {
  const total = subtotal + fee;
  const totalItems = groups.reduce((s, g) => s + g.items.reduce((ss, i) => ss + i.quantity, 0), 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4">Resumen de Compra</h2>

      {/* Events mini list */}
      <div className="space-y-3 mb-4">
        {groups.map((g) => (
          <div key={g.eventId} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
            <img src={g.eventImage} alt={g.eventTitle} className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-900 leading-tight truncate">{g.eventTitle}</p>
              <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                <Calendar size={10} />{g.eventDate}
              </p>
              {g.items.map((item) => (
                <p key={item.ticketId} className="text-[11px] text-gray-400 mt-0.5">
                  {item.ticketName} × {item.quantity} — {(item.ticketPrice * item.quantity).toFixed(2)}€
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-100 pt-3 space-y-1.5 mb-4">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Subtotal ({totalItems} entrada{totalItems !== 1 ? 's' : ''})</span>
          <span>{subtotal.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Gastos de servicio</span>
          <span>{fee.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between font-extrabold text-gray-900 pt-1 border-t border-gray-100">
          <span className="text-sm">Total</span>
          <span className="text-xl text-violet-600">{total.toFixed(2)}€</span>
        </div>
      </div>

      {showTrust && (
        <div className="space-y-2 pt-3 border-t border-gray-100">
          {[
            { icon: <Shield size={13} />, text: 'Compra 100% segura' },
            { icon: <Clock size={13} />, text: 'Cancelación gratuita hasta 48h antes' },
            { icon: <Smartphone size={13} />, text: 'Ticket móvil instantáneo' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-green-500 flex-shrink-0">{icon}</span>
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── STEP 1: Cart review ───────────────────────────────────────────────────────
function CartStep({ groups, onRefresh, onContinue }: {
  groups: EventGroup[];
  onRefresh: () => void;
  onContinue: () => void;
}) {
  const subtotal = getCartTotal();
  const fee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100;
  const totalItems = groups.reduce((s, g) => s + g.items.reduce((ss, i) => ss + i.quantity, 0), 0);

  function handleQty(eventId: string, ticketId: string, qty: number) {
    updateCartItem(eventId, ticketId, qty);
    onRefresh();
  }
  function handleRemove(eventId: string, ticketId: string) {
    removeFromCart(eventId, ticketId);
    onRefresh();
  }

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingCart size={32} className="text-gray-300" />
        </div>
        <p className="text-lg font-bold text-gray-700">Tu carrito está vacío</p>
        <p className="text-sm text-gray-400">Explora eventos y añade entradas a tu carrito</p>
        <Link to="/descubre" className="mt-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
          Explorar eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* LEFT — cart items */}
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-gray-900">Tu Carrito</h2>
          <span className="text-sm text-gray-400">{totalItems} entrada{totalItems !== 1 ? 's' : ''} de {groups.length} evento{groups.length !== 1 ? 's' : ''}</span>
        </div>

        {groups.map((group) => (
          <div key={group.eventId} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Event header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-50 bg-gray-50/50">
              <img src={group.eventImage} alt={group.eventTitle} className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 text-sm truncate">{group.eventTitle}</p>
                <div className="flex gap-3 text-xs text-gray-500 mt-0.5">
                  <span className="flex items-center gap-1"><Calendar size={11} className="text-violet-400" />{group.eventDate}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} className="text-violet-400" />{group.eventVenue}, {group.eventCity}</span>
                </div>
              </div>
              <Link to={`/evento/${group.eventId}`} className="text-xs text-violet-500 hover:text-violet-700 font-semibold flex-shrink-0">
                Ver evento
              </Link>
            </div>

            {/* Ticket lines */}
            <div className="divide-y divide-gray-50">
              {group.items.map((item) => (
                <div key={item.ticketId} className="flex items-center gap-4 px-4 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{item.ticketName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.ticketDescription}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-800 flex-shrink-0">{item.ticketPrice}€ / ud.</span>
                  {/* Qty stepper */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleQty(item.eventId, item.ticketId, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border-2 border-gray-200 hover:border-violet-400 flex items-center justify-center text-gray-500 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center font-bold text-sm text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => handleQty(item.eventId, item.ticketId, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border-2 border-gray-200 hover:border-violet-400 flex items-center justify-center text-gray-500 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm font-extrabold text-violet-600 w-16 text-right flex-shrink-0">
                    {(item.ticketPrice * item.quantity).toFixed(2)}€
                  </span>
                  <button
                    onClick={() => handleRemove(item.eventId, item.ticketId)}
                    className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Link to="/descubre" className="flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-semibold transition-colors">
          + Añadir más entradas
        </Link>
      </div>

      {/* RIGHT sticky sidebar */}
      <div className="lg:w-80 xl:w-88 flex-shrink-0 sticky top-24 self-start space-y-4">
        <OrderSummary groups={groups} subtotal={subtotal} fee={fee} showTrust />
        <button
          onClick={onContinue}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-200 transition-all"
        >
          Continuar al Pago — {(subtotal + fee).toFixed(2)}€
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Card helpers ──────────────────────────────────────────────────────────────
function formatCardNumber(raw: string) {
  return raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}
function detectBrand(num: string): 'visa' | 'mastercard' | 'amex' | null {
  const d = num.replace(/\s/g, '');
  if (/^4/.test(d)) return 'visa';
  if (/^5[1-5]/.test(d)) return 'mastercard';
  if (/^3[47]/.test(d)) return 'amex';
  return null;
}

// ── STEP 2: Payment ───────────────────────────────────────────────────────────
function PaymentStep({ groups, subtotal, fee, onBack, onPay }: {
  groups: EventGroup[];
  subtotal: number;
  fee: number;
  onBack: () => void;
  onPay: (contact: { name: string; email: string; phone: string }) => void;
}) {
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [phone, setPhone]   = useState('');
  const [cardNum, setCardNum]   = useState('');
  const [expiry, setExpiry]     = useState('');
  const [cvc, setCvc]           = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const brand = detectBrand(cardNum);
  const total = subtotal + fee;

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Nombre requerido';
    if (!email.includes('@')) errs.email = 'Email inválido';
    if (cardNum.replace(/\s/g, '').length < 13) errs.cardNum = 'Número inválido';
    if (expiry.replace(/[\s/]/g, '').length < 4) errs.expiry = 'Fecha inválida';
    if (cvc.length < 3) errs.cvc = 'CVC inválido';
    if (!cardName.trim()) errs.cardName = 'Nombre requerido';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handlePay() {
    if (!validate()) return;
    setProcessing(true);
    // ── Stripe integration point ──────────────────────────────────────────
    // const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    // const { error } = await stripe.confirmPayment({ elements, confirmParams: { return_url: window.location.origin + '/carrito?success=1' } });
    // ─────────────────────────────────────────────────────────────────────
    setTimeout(() => { setProcessing(false); onPay({ name, email, phone }); }, 2200);
  }

  const inputCls = (f: string) =>
    `w-full px-3 py-2.5 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors ${errors[f] ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-violet-500'}`;

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className="flex-1 min-w-0 space-y-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 font-medium transition-colors">
          <ChevronLeft size={16} />Volver al carrito
        </button>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User size={16} className="text-violet-500" />Datos de contacto
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre completo *</label>
              <div className="relative">
                <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={name} onChange={e => setName(e.target.value)} placeholder="María García" className={`${inputCls('name')} pl-9`} />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Correo electrónico *</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="maria@email.com" className={`${inputCls('email')} pl-9`} />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Teléfono</label>
              <div className="relative">
                <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+34 600 000 000" className={`${inputCls('')} pl-9`} />
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CreditCard size={16} className="text-violet-500" />Método de Pago
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Procesado por</span>
              <div className="bg-[#635bff] text-white text-xs font-bold px-2 py-0.5 rounded-md tracking-wide">stripe</div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Número de tarjeta</label>
              <div className="relative">
                <input value={cardNum} onChange={e => setCardNum(formatCardNumber(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} className={`${inputCls('cardNum')} pr-14`} />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {brand === 'visa' && <svg viewBox="0 0 48 16" className="h-4 w-10"><text x="0" y="13" fill="#1A1F71" fontWeight="bold" fontSize="16" fontFamily="Arial">VISA</text></svg>}
                  {brand === 'mastercard' && <svg viewBox="0 0 32 20" className="h-5 w-8"><circle cx="11" cy="10" r="10" fill="#EB001B" /><circle cx="21" cy="10" r="10" fill="#F79E1B" /><path d="M16 4.3a10 10 0 0 1 0 11.4A10 10 0 0 1 16 4.3z" fill="#FF5F00" /></svg>}
                  {brand === 'amex' && <svg viewBox="0 0 40 14" className="h-4 w-10"><text x="0" y="11" fill="#007BC1" fontWeight="bold" fontSize="11" fontFamily="Arial">AMEX</text></svg>}
                  {!brand && <CreditCard size={16} className="text-gray-300" />}
                </div>
              </div>
              {errors.cardNum && <p className="text-xs text-red-500 mt-1">{errors.cardNum}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Vencimiento</label>
                <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM / AA" maxLength={7} className={inputCls('expiry')} />
                {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">CVC</label>
                <div className="relative">
                  <input value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="123" maxLength={4} className={inputCls('cvc')} />
                  <Lock size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre en la tarjeta</label>
              <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="MARIA GARCIA" className={inputCls('cardName')} />
              {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
            </div>
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl px-3.5 py-3 flex items-start gap-2">
            <AlertCircle size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              <span className="font-semibold">Modo prueba:</span> usa <code className="bg-blue-100 px-1 rounded font-mono">4242 4242 4242 4242</code>, fecha futura y CVC <code className="bg-blue-100 px-1 rounded font-mono">123</code>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
          {[{ icon: <Shield size={13} />, text: 'SSL 256 bits' }, { icon: <Lock size={13} />, text: '3D Secure' }, { icon: <CreditCard size={13} />, text: 'PCI DSS' }].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">{icon}{text}</div>
          ))}
        </div>
      </div>

      {/* RIGHT sticky sidebar */}
      <div className="lg:w-80 xl:w-88 flex-shrink-0 sticky top-24 self-start space-y-4">
        <OrderSummary groups={groups} subtotal={subtotal} fee={fee} />
        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-200 transition-all"
        >
          {processing ? (
            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>Procesando pago…</>
          ) : (
            <><Lock size={15} />Pagar {total.toFixed(2)}€</>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <Shield size={12} className="text-green-500" />Datos protegidos con cifrado de 256 bits
        </p>
      </div>
    </div>
  );
}

// ── STEP 3: Confirmation ──────────────────────────────────────────────────────
function ConfirmationStep({ groups, contact, orderRef, subtotal, fee }: {
  groups: EventGroup[];
  contact: { name: string; email: string; phone: string };
  orderRef: string;
  subtotal: number;
  fee: number;
}) {
  const total = subtotal + fee;
  const totalItems = groups.reduce((s, g) => s + g.items.reduce((ss, i) => ss + i.quantity, 0), 0);
  const firstEventId = groups[0]?.eventId ?? '';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-8 text-center text-white mb-6 shadow-xl shadow-violet-200">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={34} className="text-white" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">¡Compra completada!</h1>
        <p className="text-violet-200 text-sm mb-3">Recibirás tus tickets en <strong className="text-white">{contact.email || 'tu correo'}</strong></p>
        <div className="bg-white/10 rounded-xl px-4 py-2 inline-block">
          <p className="text-xs text-violet-200 uppercase tracking-widest font-semibold">Referencia de pedido</p>
          <p className="text-xl font-extrabold tracking-wide">{orderRef}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Ticket size={15} className="text-violet-500" />Detalle del pedido</h2>
          {groups.map((g) => (
            <div key={g.eventId} className="mb-3 last:mb-0">
              <p className="text-xs font-bold text-gray-700 truncate mb-1">{g.eventTitle}</p>
              {g.items.map((item) => (
                <div key={item.ticketId} className="flex justify-between text-xs text-gray-500">
                  <span>{item.ticketName} × {item.quantity}</span>
                  <span className="font-semibold">{(item.ticketPrice * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>
          ))}
          <div className="border-t border-gray-100 pt-2 mt-2 space-y-1">
            <div className="flex justify-between text-xs text-gray-500"><span>Gastos servicio</span><span>{fee.toFixed(2)}€</span></div>
            <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-1 border-t border-gray-100">
              <span>Total</span><span className="text-violet-600">{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Download size={15} className="text-violet-500" />¿Qué pasa ahora?</h2>
          <div className="space-y-3">
            {[
              { icon: <Mail size={16} className="text-violet-500" />, title: 'Email de confirmación', desc: 'Recibirás un email con tu pedido en breve.' },
              { icon: <Smartphone size={16} className="text-violet-500" />, title: `${totalItems} ticket${totalItems !== 1 ? 's' : ''} en tu cuenta`, desc: 'Ya disponibles en "Mis Tickets".' },
              { icon: <Download size={16} className="text-violet-500" />, title: 'Descarga tu QR', desc: 'Guarda o imprime el QR para acceder.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">{icon}</div>
                <div><p className="text-xs font-bold text-gray-900">{title}</p><p className="text-[11px] text-gray-500 leading-relaxed">{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to={`/mis-tickets/${firstEventId}`} className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md shadow-violet-200 transition-colors">
          <Ticket size={16} />Ver mis Tickets
        </Link>
        <Link to="/descubre" className="flex-1 border-2 border-gray-200 hover:border-violet-400 text-gray-700 font-semibold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-colors">
          Seguir explorando <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

// ── Auth gate ─────────────────────────────────────────────────────────────────
function AuthGate({ userRole }: { userRole: 'client' | 'company' | null }) {
  const isCompany = userRole === 'company';
  return (
    <div className="max-w-md mx-auto py-16 text-center">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isCompany ? 'bg-amber-100' : 'bg-violet-100'}`}>
        {isCompany
          ? <AlertCircle size={30} className="text-amber-500" />
          : <LogIn size={30} className="text-violet-500" />
        }
      </div>
      <h2 className="text-xl font-extrabold text-gray-900 mb-2">
        {isCompany ? 'Cuenta de empresa' : 'Inicia sesión para continuar'}
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        {isCompany
          ? 'Las cuentas de empresa no pueden comprar entradas. Necesitas una cuenta de cliente para completar la compra.'
          : 'Debes iniciar sesión con una cuenta de cliente para comprar entradas y gestionar tus pedidos.'
        }
      </p>
      <div className="space-y-3">
        <Link to="/login" className="block w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-colors">
          {isCompany ? 'Iniciar sesión como cliente' : 'Iniciar Sesión'}
        </Link>
        {!isCompany && (
          <Link to="/registro" className="block w-full border-2 border-gray-200 hover:border-violet-400 text-gray-700 font-semibold py-3.5 rounded-xl text-sm transition-colors">
            Crear cuenta gratuita
          </Link>
        )}
        <Link to="/descubre" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors mt-2">
          Seguir explorando sin cuenta
        </Link>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { isLoggedIn, userRole, refreshCartCount } = useApp();

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [cart, setCart] = useState<CartItem[]>(() => getCart());
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [orderRef] = useState(() => 'EH-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  // Captured before cart is cleared
  const [savedSubtotal, setSavedSubtotal] = useState(0);
  const [savedFee, setSavedFee] = useState(0);

  const groups = groupByEvent(cart);

  function refreshCart() {
    setCart(getCart());
  }

  function handlePay(c: { name: string; email: string; phone: string }) {
    const subtotal = getCartTotal();
    const fee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100;

    // Persist order linked to email
    saveOrder({
      id: Date.now().toString(),
      orderRef,
      email: c.email,
      name: c.name,
      phone: c.phone,
      date: new Date().toISOString(),
      events: groups.map(g => ({
        eventId: g.eventId,
        eventTitle: g.eventTitle,
        eventDate: g.eventDate,
        eventVenue: g.eventVenue,
        eventCity: g.eventCity,
        eventImage: g.eventImage,
        items: g.items.map(i => ({
          ticketId: i.ticketId,
          ticketName: i.ticketName,
          ticketPrice: i.ticketPrice,
          quantity: i.quantity,
        })),
      })),
      subtotal,
      fee,
      total: subtotal + fee,
    });

    setSavedSubtotal(subtotal);
    setSavedFee(fee);
    setContact(c);
    setStep(2);
    clearCart();
    refreshCartCount();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const liveSubtotal = getCartTotal();
  const liveFee = Math.round(liveSubtotal * SERVICE_FEE_RATE * 100) / 100;
  const needsAuth = !isLoggedIn || userRole === 'company';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-1.5 text-sm text-gray-500">
          <Link to="/" className="hover:text-violet-600 transition-colors">Inicio</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">Carrito</span>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-6">
        {needsAuth && step < 2 ? (
          <>
            <StepBar current={0} />
            <AuthGate userRole={userRole} />
          </>
        ) : (
          <>
            <StepBar
              current={step}
              onStep={(s) => setStep(s as 0 | 1 | 2)}
            />

            {step === 0 && (
              <CartStep
                groups={groups}
                onRefresh={refreshCart}
                onContinue={() => {
                  if (groups.length === 0) return;
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setStep(1);
                }}
              />
            )}
            {step === 1 && (
              <PaymentStep
                groups={groups}
                subtotal={liveSubtotal}
                fee={liveFee}
                onBack={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setStep(0); }}
                onPay={handlePay}
              />
            )}
            {step === 2 && (
              <ConfirmationStep
                groups={groups}
                contact={contact}
                orderRef={orderRef}
                subtotal={savedSubtotal}
                fee={savedFee}
              />
            )}
          </>
        )}
      </main>

      {step < 2 && <Footer />}
    </div>
  );
}
