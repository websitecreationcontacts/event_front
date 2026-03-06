import { useState } from 'react';
import {
  MapPin,
  Clock,
  Briefcase,
  Heart,
  TrendingUp,
  Coffee,
  Laptop,
  GraduationCap,
  Globe,
  Smile,
  ChevronDown,
  ArrowRight,
  Search,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Mock data ──────────────────────────────────────────────────────────────────

const perks = [
  { icon: TrendingUp, title: 'Crecimiento real', description: 'Plan de carrera individualizado, mentoring y presupuesto anual para tu desarrollo profesional.', color: 'text-violet-600', bg: 'bg-violet-100' },
  { icon: Laptop, title: 'Trabajo flexible', description: 'Modalidad híbrida o remota según tu rol. Tú decides dónde eres más productivo.', color: 'text-blue-600', bg: 'bg-blue-100' },
  { icon: Heart, title: 'Salud y bienestar', description: 'Seguro médico privado, acceso a plataforma de bienestar mental y días de salud adicionales.', color: 'text-rose-500', bg: 'bg-rose-100' },
  { icon: Coffee, title: 'Oficina de lujo', description: 'Sede en el centro de Madrid con zonas de descanso, snacks ilimitados y afterworks periódicos.', color: 'text-amber-500', bg: 'bg-amber-100' },
  { icon: GraduationCap, title: 'Formación continua', description: '1.500€/año para cursos, conferencias y certificaciones de tu elección. Aprender es parte del trabajo.', color: 'text-green-600', bg: 'bg-green-100' },
  { icon: Globe, title: 'Entradas para eventos', description: 'Acceso gratuito a todos los eventos de la plataforma. Vive lo que construyes.', color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { icon: Smile, title: 'Cultura sin ego', description: 'Equipo diverso, colaborativo y horizontal donde todas las ideas cuentan y se escuchan.', color: 'text-pink-500', bg: 'bg-pink-100' },
  { icon: Briefcase, title: 'Stock options', description: 'Participación en el crecimiento de la empresa a través de un plan de opciones sobre acciones.', color: 'text-teal-600', bg: 'bg-teal-100' },
];

const departments = ['Todos', 'Ingeniería', 'Producto', 'Marketing', 'Operaciones', 'Ventas', 'Legal'];

const jobs = [
  { id: '1', title: 'Senior Frontend Engineer', department: 'Ingeniería', location: 'Madrid / Remoto', type: 'Jornada completa', description: 'Buscamos un ingeniero frontend con experiencia en React y TypeScript para liderar el desarrollo de nuevas funcionalidades de cara al usuario.' },
  { id: '2', title: 'Backend Engineer (Node.js)', department: 'Ingeniería', location: 'Madrid / Remoto', type: 'Jornada completa', description: 'Únete al equipo de backend para construir APIs escalables que soporten millones de transacciones de entradas cada mes.' },
  { id: '3', title: 'Product Manager — Compradores', department: 'Producto', location: 'Madrid', type: 'Jornada completa', description: 'Define y ejecuta la hoja de ruta del producto para la experiencia de descubrimiento y compra de entradas de nuestros usuarios.' },
  { id: '4', title: 'UX/UI Designer', department: 'Producto', location: 'Madrid / Híbrido', type: 'Jornada completa', description: 'Diseña experiencias que miles de personas usarán cada día. Trabajarás en estrecha colaboración con ingeniería y producto.' },
  { id: '5', title: 'Growth Marketing Manager', department: 'Marketing', location: 'Madrid / Híbrido', type: 'Jornada completa', description: 'Lidera las campañas de adquisición y retención de usuarios. Dominio de canales de pago, SEO y email marketing.' },
  { id: '6', title: 'Content & Social Media Specialist', department: 'Marketing', location: 'Madrid / Remoto', type: 'Jornada completa', description: 'Crea el contenido que conecta a EventHub con su comunidad en redes sociales, blog y canales de email.' },
  { id: '7', title: 'Account Manager — Organizadores', department: 'Ventas', location: 'Madrid / Barcelona', type: 'Jornada completa', description: 'Ayuda a los organizadores a sacar el máximo partido de la plataforma y convierte leads en clientes satisfechos a largo plazo.' },
  { id: '8', title: 'Customer Success Specialist', department: 'Operaciones', location: 'Madrid / Remoto', type: 'Jornada completa', description: 'Sé la voz de EventHub para compradores y organizadores. Resuelve incidencias y convierte cada contacto en una oportunidad de fidelización.' },
  { id: '9', title: 'Data Analyst', department: 'Operaciones', location: 'Madrid / Remoto', type: 'Jornada completa', description: 'Extrae insights de nuestros datos para ayudar a los equipos a tomar mejores decisiones. SQL, Python y ganas de aprender.' },
];

const processSteps = [
  { step: '01', title: 'Envía tu candidatura', description: 'Rellena el formulario de cada oferta. No necesitas carta de presentación, preferimos un portfolio o un breve texto sobre por qué quieres unirte.' },
  { step: '02', title: 'Entrevista inicial', description: 'Una videollamada de 30 minutos con alguien del equipo de Personas para conocernos y resolver tus dudas.' },
  { step: '03', title: 'Prueba técnica o de caso', description: 'Según el rol, una prueba práctica breve (máximo 3 horas) para mostrar cómo piensas y trabajas.' },
  { step: '04', title: 'Entrevistas de equipo', description: 'Dos o tres conversaciones con futuros compañeros y el manager directo. Conocerás al equipo antes de decidir.' },
  { step: '05', title: 'Oferta y bienvenida', description: 'Si todo encaja, te haremos una oferta en 48 horas. Tu onboarding empieza desde el primer día con un buddy asignado.' },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

const deptColors: Record<string, string> = {
  Ingeniería: 'bg-violet-100 text-violet-700',
  Producto: 'bg-blue-100 text-blue-700',
  Marketing: 'bg-pink-100 text-pink-700',
  Operaciones: 'bg-amber-100 text-amber-700',
  Ventas: 'bg-green-100 text-green-700',
  Legal: 'bg-gray-100 text-gray-700',
};

function JobCard({ job }: { job: typeof jobs[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${deptColors[job.department] ?? 'bg-gray-100 text-gray-700'}`}>
              {job.department}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={11} />{job.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={11} />{job.type}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 text-base">{job.title}</h3>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 flex-shrink-0 ml-4 mt-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{job.description}</p>
          <button className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
            Aplicar a esta oferta
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function TrabajaPage() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [search, setSearch] = useState('');

  const filtered = jobs.filter((j) => {
    const matchDept = activeTab === 'Todos' || j.department === activeTab;
    const matchSearch = search === '' || j.title.toLowerCase().includes(search.toLowerCase()) || j.department.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      {/* HERO */}
      <section className="bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 px-8 pt-20 pb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            {jobs.length} posiciones abiertas
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Construye el Futuro<br /><span style={{ fontFamily: "'Dancing Script', cursive", background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>de los Eventos con Nosotros</span>
          </h1>
          <p className="text-white/75 text-base leading-relaxed max-w-xl mx-auto mb-8">
            En EventHub construimos tecnología que conecta personas con experiencias únicas. Buscamos personas apasionadas, curiosas y con ganas de impactar a millones de usuarios.
          </p>
          <button
            onClick={() => document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-violet-700 hover:bg-gray-50 font-bold px-7 py-3.5 rounded-xl transition-colors text-sm shadow-lg inline-flex items-center gap-2"
          >
            Ver ofertas abiertas
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">¿Por Qué <span className="title-accent">EventHub?</span></h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Ofrecemos mucho más que un buen salario. Creemos que el entorno importa tanto como el trabajo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center mb-3`}>
                    <Icon size={20} className={p.color} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">{p.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section id="ofertas" className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Posiciones Abiertas</h2>
            <p className="text-gray-500 text-sm">Encuentra tu próximo reto. Todas las posiciones son para trabajar en España.</p>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por cargo o departamento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors shadow-sm"
            />
          </div>

          {/* Department tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setActiveTab(d)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === d
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-violet-300 hover:text-violet-600'
                }`}
              >
                {d}
                {d === 'Todos' && <span className="ml-1.5 text-xs opacity-70">({jobs.length})</span>}
                {d !== 'Todos' && (
                  <span className="ml-1.5 text-xs opacity-70">({jobs.filter(j => j.department === d).length})</span>
                )}
              </button>
            ))}
          </div>

          {/* Job cards */}
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Briefcase size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">No hay posiciones para esos criterios</p>
              <p className="text-sm mt-1">Prueba con otro departamento o envíanos tu candidatura espontánea</p>
            </div>
          )}

          {/* Spontaneous */}
          <div className="mt-8 bg-violet-50 border border-violet-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-gray-900 text-sm mb-1">¿No ves tu rol ideal?</p>
              <p className="text-gray-500 text-sm">Envíanos tu candidatura espontánea. Siempre guardamos los buenos perfiles.</p>
            </div>
            <button className="flex-shrink-0 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
              Candidatura espontánea
            </button>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Nuestro Proceso de Selección</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Transparente, rápido y centrado en conocerte a ti, no en hacerte pasar horas de pruebas.
            </p>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-violet-200" style={{ left: '3rem', right: '3rem' }} />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {processSteps.map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-violet-600 text-white font-extrabold text-sm flex items-center justify-center mb-4 relative z-10 shadow-md">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            ¿Listo para el siguiente paso?
          </h2>
          <p className="text-white/75 text-sm mb-8 max-w-md mx-auto">
            Revisa nuestras ofertas, elige la que más encaje y apúntate. El proceso es sencillo y te responderemos en menos de 5 días.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-violet-700 hover:bg-gray-50 font-bold px-7 py-3.5 rounded-xl transition-colors text-sm shadow-lg"
            >
              Ver todas las ofertas
            </button>
            <button
              onClick={() => window.location.href = '/contacto'}
              className="border border-white/40 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
            >
              Preguntar al equipo
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
