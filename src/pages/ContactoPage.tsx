import { useState } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ChevronDown,
  ChevronRight,
  Send,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Mock data ──────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: Mail,
    title: 'Email de Soporte',
    subtitle: 'Para consultas generales y soporte técnico',
    value: 'soporte@eventhub.com',
    action: 'mailto:soporte@eventhub.com',
    actionLabel: null,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    subtitle: 'Lunes a Viernes: 9:00 – 18:00',
    value: '+34 900 123 456',
    action: 'tel:+34900123456',
    actionLabel: null,
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    icon: MessageCircle,
    title: 'Chat en Vivo',
    subtitle: 'Respuesta inmediata durante horario comercial',
    value: null,
    action: '#',
    actionLabel: 'Iniciar Chat',
    color: 'text-amber-500',
    bg: 'bg-amber-100',
  },
  {
    icon: MapPin,
    title: 'Oficina Central',
    subtitle: 'Calle de Alcalá 12, 28014 Madrid, España',
    value: null,
    action: '#',
    actionLabel: null,
    color: 'text-rose-500',
    bg: 'bg-rose-100',
  },
];

const asuntoOptions = [
  'Selecciona un tema',
  'Problema con mi entrada',
  'Cancelación o reembolso',
  'Información sobre un evento',
  'Soporte técnico',
  'Para organizadores',
  'Otro',
];

const faqs = [
  {
    question: '¿Cómo puedo cancelar mi entrada?',
    answer:
      'Puedes cancelar tu entrada hasta 24 horas antes del evento desde tu cuenta y obtendrás un reembolso completo. Consulta la política de cancelación del organizador para más detalles.',
  },
  {
    question: '¿Qué pasa si se cancela un evento?',
    answer:
      'Si un evento es cancelado, recibirás un reembolso completo de forma automática en un plazo de 5 a 7 días laborables directamente en tu método de pago original.',
  },
  {
    question: '¿Qué métodos de pago aceptamos?',
    answer:
      'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, Amex), PayPal, transferencia bancaria y Bizum. Todos los pagos están protegidos con cifrado SSL.',
  },
  {
    question: '¿Cómo recibo mis entradas?',
    answer:
      'Las entradas se envían por correo electrónico en formato PDF y puedes acceder a ellas desde tu cuenta en cualquier momento desde cualquier dispositivo.',
  },
  {
    question: '¿Puedo transferir mi entrada?',
    answer:
      'Sí, puedes transferir tu entrada a otra persona desde tu perfil hasta 48 horas antes del evento. El proceso es sencillo e inmediato.',
  },
  {
    question: '¿Hay comisiones por la compra?',
    answer:
      'Las comisiones de servicio son transparentes y se muestran claramente antes de finalizar la compra. No hay cargos ocultos de ningún tipo.',
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm pr-4">{faq.question}</span>
        <ChevronDown
          size={18}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    asunto: 'Selecciona un tema',
    mensaje: '',
    privacidad: false,
  });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      {/* HERO */}
      <section className="bg-gradient-to-r from-violet-700 to-purple-600 px-8 py-14">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            Contacto y Soporte
          </h1>
          <p className="text-white/75 text-base">¿Necesitas ayuda? Estamos aquí para apoyarte</p>
        </div>
      </section>

      {/* FORM + CONTACT INFO */}
      <section className="py-14 px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

          {/* LEFT — Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Send size={28} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Te responderemos en menos de 24 horas en el correo que nos has proporcionado.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-violet-600 text-sm font-semibold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre</label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Apellidos</label>
                    <input
                      type="text"
                      placeholder="Tus apellidos"
                      required
                      value={form.apellidos}
                      onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Asunto</label>
                  <div className="relative">
                    <select
                      required
                      value={form.asunto}
                      onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                      className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-violet-500 transition-colors pr-10"
                    >
                      {asuntoOptions.map((o) => (
                        <option key={o} value={o} disabled={o === 'Selecciona un tema'}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mensaje</label>
                  <textarea
                    rows={5}
                    placeholder="Describe tu consulta o problema de forma detallada..."
                    required
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="privacidad"
                    required
                    checked={form.privacidad}
                    onChange={(e) => setForm({ ...form, privacidad: e.target.checked })}
                    className="mt-0.5 accent-violet-600 w-4 h-4 flex-shrink-0"
                  />
                  <label htmlFor="privacidad" className="text-xs text-gray-500 leading-relaxed">
                    Acepto la{' '}
                    <a href="#" className="text-violet-600 hover:underline font-medium">
                      política de privacidad
                    </a>{' '}
                    y los términos de uso del sitio
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <Send size={15} />
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>

          {/* RIGHT — Contact info */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h2>

            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
                >
                  <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={item.color} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.subtitle}</p>
                    {item.value && (
                      <a
                        href={item.action}
                        className={`text-sm font-semibold mt-1 block hover:underline ${item.color}`}
                      >
                        {item.value}
                      </a>
                    )}
                    {item.actionLabel && (
                      <a
                        href={item.action}
                        className={`inline-flex items-center gap-1 text-sm font-semibold mt-1.5 ${item.color} hover:underline`}
                      >
                        {item.actionLabel}
                        <ChevronRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Response time banner */}
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 flex items-start gap-3">
              <Clock size={18} className="text-violet-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-violet-800 mb-0.5">Tiempo de Respuesta</p>
                <p className="text-xs text-violet-700 leading-relaxed">
                  Respondemos a todos los mensajes en menos de 24 horas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Preguntas Frecuentes</h2>
            <p className="text-gray-500 text-sm">Respuestas rápidas a las consultas más comunes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} faq={faq} />
            ))}
          </div>

          <div className="text-center">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 text-sm font-semibold transition-colors"
            >
              Ver todas las preguntas frecuentes
              <ChevronRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
