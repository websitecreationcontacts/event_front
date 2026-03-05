import {
  Users,
  BarChart3,
  TrendingUp,
  Megaphone,
  LineChart,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Smartphone,
  Star,
  ArrowRight,
  Zap,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Mock data ──────────────────────────────────────────────────────────────────

const stats = [
  { value: '500K+', label: 'Compradores activos' },
  { value: '150K+', label: 'Eventos publicados' },
  { value: '98%', label: 'Satisfacción' },
  { value: '24/7', label: 'Soporte disponible' },
];

const features = [
  {
    icon: Users,
    title: 'Alcance Masivo',
    description: 'Llega a más de 500,000 compradores activos que buscan eventos en tu ciudad.',
    color: 'text-violet-600',
    bg: 'bg-violet-100',
  },
  {
    icon: BarChart3,
    title: 'Gestión en Tiempo Real',
    description: 'Controla ventas, asistentes y métricas de tu evento desde un panel centralizado.',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    icon: TrendingUp,
    title: 'Alta Rentabilidad',
    description: 'Maximiza tus ingresos con herramientas de pricing dinámico y upselling integrado.',
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    icon: Megaphone,
    title: 'Marketing Integrado',
    description: 'Campañas automáticas por email, redes sociales y notificaciones push incluidas.',
    color: 'text-pink-500',
    bg: 'bg-pink-100',
  },
  {
    icon: LineChart,
    title: 'Analíticas Avanzadas',
    description: 'Informes detallados de conversión, demografía y comportamiento de tus asistentes.',
    color: 'text-amber-500',
    bg: 'bg-amber-100',
  },
  {
    icon: ShieldCheck,
    title: 'Pagos Seguros',
    description: 'Procesamiento de pagos certificado PCI-DSS con múltiples métodos de pago.',
    color: 'text-teal-600',
    bg: 'bg-teal-100',
  },
];

const managementFeatures = [
  'Panel de control intuitivo y fácil de usar',
  'Venta de entradas con múltiples tipos de tickets',
  'Gestión de aforo y listas de espera automáticas',
  'Integración con tu web y redes sociales',
  'Exportación de datos en tiempo real',
];

const accessFeatures = [
  'Generación de QR únicos por entrada',
  'Validación instantánea con app móvil',
  'Control de acceso sin conexión a internet',
  'Registro de entradas en tiempo real',
  'Prevención de entradas duplicadas o falsas',
];

const plans = [
  {
    name: 'Básico',
    fee: '5%',
    subtitle: 'por venta',
    description: 'Perfecto para organizadores que empiezan.',
    features: [
      'Hasta 500 entradas/evento',
      'Panel básico de control',
      'Soporte por email',
      'Informes básicos',
      'QR de acceso incluido',
    ],
    cta: 'Empezar gratis',
    highlighted: false,
  },
  {
    name: 'Pro',
    fee: '3.5%',
    subtitle: 'por venta',
    description: 'Para organizadores que buscan crecer.',
    features: [
      'Entradas ilimitadas',
      'Panel avanzado + analíticas',
      'Soporte prioritario 24/7',
      'Marketing integrado',
      'Personalización de marca',
      'API de integración',
    ],
    cta: 'Empezar ahora',
    highlighted: true,
    badge: 'Más popular',
  },
  {
    name: 'Enterprise',
    fee: '2.5%',
    subtitle: 'por venta',
    description: 'Soluciones a medida para grandes organizaciones.',
    features: [
      'Todo lo de Pro incluido',
      'Gestor de cuenta dedicado',
      'SLA garantizado',
      'Integraciones personalizadas',
      'Contratos a medida',
      'Onboarding personalizado',
    ],
    cta: 'Contactar ventas',
    highlighted: false,
  },
];

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'Director de Festivales, MadridSound',
    avatar: 'CM',
    color: 'bg-violet-500',
    text: 'EventHub transformó cómo gestionamos nuestros festivales. Pasamos de vender 2,000 entradas a más de 15,000 en un solo año gracias a su alcance y herramientas de marketing.',
    stars: 5,
  },
  {
    name: 'Ana García',
    role: 'CEO, TechConf Barcelona',
    avatar: 'AG',
    color: 'bg-pink-500',
    text: 'La plataforma es increíblemente intuitiva. El panel de control en tiempo real nos permitió tomar decisiones rápidas durante el evento. Nunca volveré a otra plataforma.',
    stars: 5,
  },
  {
    name: 'Roberto Sánchez',
    role: 'Productor, Valencia Gourmet',
    avatar: 'RS',
    color: 'bg-blue-500',
    text: 'El sistema de acceso QR fue un cambio radical. Cero colas, cero problemas. Los asistentes quedaron encantados y nosotros también.',
    stars: 5,
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-extrabold text-white">{value}</p>
      <p className="text-white/70 text-sm mt-1">{label}</p>
    </div>
  );
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
        <Icon size={24} className={feature.color} />
      </div>
      <h3 className="font-bold text-gray-900 text-base mb-2">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

function PlanCard({ plan }: { plan: typeof plans[0] }) {
  return (
    <div
      className={`relative rounded-2xl p-7 flex flex-col ${
        plan.highlighted
          ? 'bg-gradient-to-b from-violet-600 to-purple-700 text-white shadow-2xl scale-105'
          : 'bg-white border border-gray-200 shadow-sm text-gray-900'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
          {plan.badge}
        </span>
      )}
      <p className={`text-sm font-semibold mb-1 ${plan.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
        {plan.name}
      </p>
      <div className="flex items-end gap-1 mb-1">
        <span className="text-4xl font-extrabold">{plan.fee}</span>
        <span className={`text-sm mb-1.5 ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>
          {plan.subtitle}
        </span>
      </div>
      <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
        {plan.description}
      </p>
      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <CheckCircle2
              size={16}
              className={`mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-violet-600'}`}
            />
            <span className={plan.highlighted ? 'text-white/90' : 'text-gray-700'}>{f}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
          plan.highlighted
            ? 'bg-white text-violet-700 hover:bg-gray-50'
            : 'bg-violet-600 hover:bg-violet-700 text-white'
        }`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {t.avatar}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
          <p className="text-gray-500 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function EmpresaPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      {/* HERO */}
      <section className="bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 px-8 pt-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <Zap size={12} />
              Para Organizadores
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Impulsa Tus Eventos al<br />Siguiente Nivel
            </h1>
            <p className="text-white/75 text-base leading-relaxed mb-8">
              La plataforma líder para organizadores profesionales. Vende más entradas, gestiona mejor y llega a miles de personas con las herramientas más avanzadas del mercado.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-violet-700 hover:bg-gray-50 font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg">
                Crear mi primer evento
              </button>
              <button className="border border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-colors text-sm flex items-center gap-2">
                Ver demo
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/20">
            {stats.map((s) => (
              <StatCard key={s.value} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              ¿Por Qué Elegir EventHub?
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Todo lo que necesitas para organizar eventos exitosos, en una sola plataforma.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </div>
      </section>

      {/* GESTIÓN COMPLETA */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1">
            <span className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-3 block">
              Gestión
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Gestión Completa de Eventos
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Desde la creación hasta el análisis post-evento, nuestra plataforma te acompaña en cada paso. Configura tu evento en minutos y empieza a vender de inmediato.
            </p>
            <ul className="space-y-3">
              {managementFeatures.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={17} className="text-violet-600 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
              Ver todas las funciones
            </button>
          </div>
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=420&fit=crop&auto=format"
                alt="Dashboard de gestión"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-medium opacity-80">Ventas hoy</p>
                    <p className="text-xl font-bold">3,241€</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium opacity-80">Entradas vendidas</p>
                    <p className="text-xl font-bold">148</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium opacity-80">Conversión</p>
                    <p className="text-xl font-bold text-green-300">+12%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROL DE ACCESO */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-14">
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 flex items-center justify-center min-h-72">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format"
                alt="Control de acceso digital"
                className="w-56 rounded-2xl shadow-xl rotate-3"
              />
              <div className="absolute top-6 right-6 bg-white rounded-2xl p-4 shadow-lg">
                <QrCode size={56} className="text-gray-800" />
                <p className="text-xs text-center text-gray-600 mt-2 font-medium">Escanear entrada</p>
              </div>
              <div className="absolute bottom-6 left-6 bg-white rounded-xl px-3 py-2 shadow flex items-center gap-2">
                <Smartphone size={16} className="text-violet-600" />
                <span className="text-xs font-semibold text-green-600">Entrada válida ✓</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <span className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-3 block">
              Acceso Digital
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Control de Acceso Digital
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Olvídate de colas interminables y entradas físicas. Nuestro sistema de acceso digital valida entradas en segundos con un simple escaneo de QR.
            </p>
            <ul className="space-y-3">
              {accessFeatures.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={17} className="text-violet-600 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
              Conocer el sistema de acceso
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Planes Flexibles para Cada Organizador
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Sin cuotas mensuales. Solo pagás una pequeña comisión por cada venta. Empieza gratis hoy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            Todos los planes incluyen IVA. Sin permanencia mínima. Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Más de 10,000 organizadores ya confían en EventHub para gestionar sus eventos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 px-8 bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            ¿Listo para Crear Tu Próximo<br />Evento Exitoso?
          </h2>
          <p className="text-white/75 text-base mb-10 max-w-md mx-auto">
            Únete a miles de organizadores que ya están vendiendo más con EventHub.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="bg-white text-violet-700 hover:bg-gray-50 font-bold px-8 py-3.5 rounded-xl transition-colors text-sm shadow-lg">
              Crear mi primer evento
            </button>
            <button className="border border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm">
              Hablar con ventas
            </button>
          </div>
          <p className="text-white/50 text-xs mt-6">Sin tarjeta de crédito · Configuración en 5 minutos</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
