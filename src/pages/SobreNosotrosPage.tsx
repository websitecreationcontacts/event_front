import {
  Target,
  Eye,
  Heart,
  Users,
  Globe,
  Lightbulb,
  ShieldCheck,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Mock data ──────────────────────────────────────────────────────────────────

const stats = [
  { value: '2018', label: 'Año de fundación' },
  { value: '500K+', label: 'Usuarios activos' },
  { value: '150K+', label: 'Eventos publicados' },
  { value: '12', label: 'Ciudades en España' },
];

const values = [
  {
    icon: Heart,
    title: 'Pasión por los eventos',
    description: 'Creemos que los eventos unen a las personas y crean recuerdos que duran toda la vida. Eso es lo que nos mueve cada día.',
    color: 'text-rose-500',
    bg: 'bg-rose-100',
  },
  {
    icon: ShieldCheck,
    title: 'Confianza y seguridad',
    description: 'Cada transacción en nuestra plataforma está protegida. Compradores y organizadores merecen total tranquilidad.',
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    icon: Lightbulb,
    title: 'Innovación constante',
    description: 'Nunca dejamos de mejorar. Escuchamos a nuestra comunidad y construimos las herramientas que realmente necesitan.',
    color: 'text-amber-500',
    bg: 'bg-amber-100',
  },
  {
    icon: Users,
    title: 'Comunidad primero',
    description: 'Somos más que una plataforma: somos la comunidad que conecta a quienes crean con quienes disfrutan.',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    icon: Globe,
    title: 'Accesibilidad universal',
    description: 'Queremos que cualquier persona, en cualquier ciudad, pueda descubrir y asistir a eventos increíbles sin barreras.',
    color: 'text-violet-600',
    bg: 'bg-violet-100',
  },
  {
    icon: Rocket,
    title: 'Crecimiento compartido',
    description: 'El éxito de los organizadores es nuestro éxito. Crecemos juntos, y eso define cómo construimos cada funcionalidad.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
  },
];

const team = [
  {
    name: 'Alejandro Ruiz',
    role: 'CEO & Co-fundador',
    bio: 'Ex-directivo de Ticketmaster Europa. Lleva más de 15 años en el sector del entretenimiento y la tecnología.',
    avatar: 'AR',
    color: 'bg-violet-500',
  },
  {
    name: 'Sofía Martínez',
    role: 'CTO & Co-fundadora',
    bio: 'Ingeniera de software con experiencia en Amazon y Glovo. Apasionada de los sistemas escalables y la experiencia de usuario.',
    avatar: 'SM',
    color: 'bg-pink-500',
  },
  {
    name: 'Carlos Navarro',
    role: 'CPO — Producto',
    bio: 'Diseñador de producto con raíces en el mundo de los festivales. Ha lanzado más de 20 productos digitales en Europa.',
    avatar: 'CN',
    color: 'bg-blue-500',
  },
  {
    name: 'Laura Gómez',
    role: 'CMO — Marketing',
    bio: 'Experta en growth marketing y comunidades digitales. Anterior responsable de expansión en Eventbrite para el sur de Europa.',
    avatar: 'LG',
    color: 'bg-green-500',
  },
  {
    name: 'Marcos Fernández',
    role: 'CFO — Finanzas',
    bio: 'Financiero con experiencia en startups de alto crecimiento. Ha liderado rondas de financiación por más de 30M€.',
    avatar: 'MF',
    color: 'bg-amber-500',
  },
  {
    name: 'Elena Torres',
    role: 'Head of Operations',
    bio: 'Especialista en operaciones y atención al cliente. Garantiza que cada interacción con EventHub sea impecable.',
    avatar: 'ET',
    color: 'bg-teal-500',
  },
];

const milestones = [
  {
    year: '2018',
    title: 'El inicio',
    description: 'Alejandro y Sofía fundan EventHub en Madrid con la misión de democratizar el acceso a los eventos culturales.',
  },
  {
    year: '2019',
    title: 'Primera ronda seed',
    description: 'Cerramos una ronda de 1,5M€ y lanzamos la plataforma en Madrid y Barcelona con 500 eventos el primer mes.',
  },
  {
    year: '2020',
    title: 'Pivote digital',
    description: 'Ante la pandemia, desarrollamos en tiempo récord herramientas para eventos virtuales e híbridos que salvaron a miles de organizadores.',
  },
  {
    year: '2021',
    title: 'Expansión nacional',
    description: 'Llegamos a 8 ciudades españolas y superamos los 100,000 usuarios activos. Lanzamos el sistema de acceso QR propio.',
  },
  {
    year: '2022',
    title: 'Serie A',
    description: 'Cerramos una ronda Serie A de 12M€ e incorporamos a los mejores talentos del sector. Lanzamos la app móvil.',
  },
  {
    year: '2024',
    title: 'Líderes del mercado',
    description: 'Más de 500,000 usuarios, 150,000 eventos publicados y presencia en 12 ciudades. Comenzamos nuestra expansión internacional.',
  },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      {/* HERO */}
      <section className="bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 px-8 pt-20 pb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            Nuestra historia
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Conectamos Personas<br /><span style={{ fontFamily: "'Dancing Script', cursive", background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>a través de los Eventos</span>
          </h1>
          <p className="text-white/75 text-base leading-relaxed max-w-xl mx-auto">
            Fundada en 2018 en Madrid, EventHub nació con una convicción simple: descubrir y asistir a eventos increíbles debería ser fácil, seguro y accesible para todos.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-14 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-violet-600 mb-1">{s.value}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-5">
              <Target size={24} className="text-violet-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Nuestra Misión</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Democratizar el acceso a los eventos culturales, musicales y de entretenimiento, conectando a organizadores apasionados con públicos ávidos de experiencias únicas. Queremos que nadie se pierda un evento por falta de información o por barreras tecnológicas.
            </p>
          </div>
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-5">
              <Eye size={24} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Nuestra Visión</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ser la plataforma de referencia en el sur de Europa para el descubrimiento y la gestión de eventos, construyendo un ecosistema donde organizadores de cualquier tamaño puedan hacer crecer sus eventos y donde cada persona encuentre siempre algo que la emocione.
            </p>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Nuestros <span className="title-accent">Valores</span></h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Los principios que guían cada decisión que tomamos, cada línea de código que escribimos y cada conversación con nuestros usuarios.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 rounded-xl ${v.bg} flex items-center justify-center mb-4`}>
                    <Icon size={22} className={v.color} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HISTORIA / TIMELINE */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Nuestra <span className="title-accent">Historia</span></h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              De una idea en un garaje madrileño a la plataforma líder del mercado. Este es nuestro camino.
            </p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-violet-200 -translate-x-1/2" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-violet-600 rounded-full border-4 border-white shadow -translate-x-1/2 mt-1 z-10" />

                  {/* Content */}
                  <div className={`pl-14 md:pl-0 flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 inline-block w-full`}>
                      <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                        {m.year}
                      </span>
                      <h3 className="font-bold text-gray-900 text-base mb-1">{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.description}</p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">El <span className="title-accent">Equipo</span></h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Más de 80 personas trabajan cada día para hacer EventHub mejor. Conoce a quienes lideran el camino.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 rounded-2xl ${member.color} flex items-center justify-center text-white font-bold text-lg mb-4`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-0.5">{member.name}</h3>
                <p className="text-violet-600 text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÚNETE AL EQUIPO CTA */}
      <section className="py-16 px-8 bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              ¿Quieres formar parte del equipo?
            </h2>
            <p className="text-white/75 text-sm">
              Estamos creciendo y buscamos personas apasionadas. Mira nuestras vacantes abiertas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <button className="bg-white text-violet-700 hover:bg-gray-50 font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg flex items-center gap-2">
              Ver vacantes
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => window.location.href = '/contacto'}
              className="border border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Contactar
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
