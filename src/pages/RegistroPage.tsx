import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Building2, Phone, Globe, Info } from 'lucide-react';
import { navLinks } from '../data/mock';

// ── Minimal auth navbar ────────────────────────────────────────────────────────
function AuthNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 py-4">
      <Link to="/" className="font-bold text-xl tracking-tight text-violet-700">
        EventHub
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link key={link.label} to={link.href} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        to="/login"
        className="border border-gray-300 hover:border-violet-500 text-gray-700 hover:text-violet-600 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Iniciar Sesión
      </Link>
    </header>
  );
}

// ── Minimal auth footer ────────────────────────────────────────────────────────
function AuthFooter() {
  return (
    <footer className="py-6 px-8 text-center border-t border-gray-100 bg-white">
      <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-1">
        <Link to="/terminos" className="hover:text-gray-600 transition-colors">Términos de Servicio</Link>
        <span>·</span>
        <Link to="/privacidad" className="hover:text-gray-600 transition-colors">Política de Privacidad</Link>
        <span>·</span>
        <Link to="/contacto" className="hover:text-gray-600 transition-colors">Ayuda</Link>
      </div>
      <p className="text-xs text-gray-400">© 2024 EventHub. Todos los derechos reservados.</p>
    </footer>
  );
}

// ── Usuario form ───────────────────────────────────────────────────────────────
function UsuarioForm() {
  const [nombre, setNombre]         = useState('');
  const [apellidos, setApellidos]   = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [showConf, setShowConf]     = useState(false);
  const [acepta, setAcepta]         = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar con API de registro de usuario
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombre</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              required
              placeholder="Ana"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Apellidos</label>
          <input
            type="text"
            required
            placeholder="García López"
            value={apellidos}
            onChange={e => setApellidos(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Correo Electrónico</label>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contraseña</label>
        <div className="relative">
          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPass ? 'text' : 'password'}
            required
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirmar Contraseña</label>
        <div className="relative">
          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showConf ? 'text' : 'password'}
            required
            placeholder="Repite tu contraseña"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <button type="button" onClick={() => setShowConf(!showConf)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={acepta}
          onChange={e => setAcepta(e.target.checked)}
          className="accent-violet-600 w-3.5 h-3.5 mt-0.5 shrink-0"
        />
        <span className="text-xs text-gray-600 leading-relaxed">
          Acepto los{' '}
          <Link to="/terminos" className="text-violet-600 hover:underline font-semibold">Términos de Servicio</Link>
          {' '}y la{' '}
          <Link to="/privacidad" className="text-violet-600 hover:underline font-semibold">Política de Privacidad</Link>
        </span>
      </label>

      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-md"
      >
        Crear Cuenta
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">O regístrate con</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social */}
      <div className="space-y-2.5">
        <button type="button" className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors text-sm">
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </button>
      </div>
    </form>
  );
}

// ── Empresa form ───────────────────────────────────────────────────────────────
function EmpresaForm() {
  const [empresa, setEmpresa]       = useState('');
  const [cif, setCif]               = useState('');
  const [sector, setSector]         = useState('');
  const [nombre, setNombre]         = useState('');
  const [cargo, setCargo]           = useState('');
  const [email, setEmail]           = useState('');
  const [telefono, setTelefono]     = useState('');
  const [web, setWeb]               = useState('');
  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [showConf, setShowConf]     = useState(false);
  const [acepta, setAcepta]         = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar con API de registro de empresa
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Datos de empresa */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Datos de la empresa</p>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombre de la Empresa</label>
        <div className="relative">
          <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            required
            placeholder="Acme Events S.L."
            value={empresa}
            onChange={e => setEmpresa(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">CIF / NIF</label>
          <input
            type="text"
            required
            placeholder="B12345678"
            value={cif}
            onChange={e => setCif(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Sector</label>
          <select
            required
            value={sector}
            onChange={e => setSector(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-violet-500 transition-colors bg-white"
          >
            <option value="">Seleccionar...</option>
            <option>Música y Conciertos</option>
            <option>Deportes</option>
            <option>Arte y Cultura</option>
            <option>Tecnología</option>
            <option>Gastronomía</option>
            <option>Moda y Lifestyle</option>
            <option>Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Sitio Web</label>
        <div className="relative">
          <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="url"
            placeholder="https://tuempresa.com"
            value={web}
            onChange={e => setWeb(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Datos de contacto */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-1">Persona de contacto</p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombre</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              required
              placeholder="Ana"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Cargo</label>
          <input
            type="text"
            required
            placeholder="CEO / Marketing..."
            value={cargo}
            onChange={e => setCargo(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Correo Electrónico</label>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            required
            placeholder="contacto@empresa.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Teléfono</label>
        <div className="relative">
          <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            placeholder="+34 600 000 000"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Contraseña */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-1">Acceso a la cuenta</p>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contraseña</label>
        <div className="relative">
          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPass ? 'text' : 'password'}
            required
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirmar Contraseña</label>
        <div className="relative">
          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showConf ? 'text' : 'password'}
            required
            placeholder="Repite tu contraseña"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
          <button type="button" onClick={() => setShowConf(!showConf)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={acepta}
          onChange={e => setAcepta(e.target.checked)}
          className="accent-violet-600 w-3.5 h-3.5 mt-0.5 shrink-0"
        />
        <span className="text-xs text-gray-600 leading-relaxed">
          Acepto los{' '}
          <Link to="/terminos" className="text-violet-600 hover:underline font-semibold">Términos de Servicio</Link>
          {' '}y la{' '}
          <Link to="/privacidad" className="text-violet-600 hover:underline font-semibold">Política de Privacidad</Link>
          . Entiendo que mi cuenta será de tipo Empresa.
        </span>
      </label>

      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-md"
      >
        Crear Cuenta Empresa
      </button>
    </form>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
type Tab = 'usuario' | 'empresa';

export default function RegistroPage() {
  const [tab, setTab] = useState<Tab>('usuario');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-10">
          {/* Avatar icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
              {tab === 'empresa' ? (
                <Building2 className="w-8 h-8 text-white" />
              ) : (
                <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-1">Crear Cuenta</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Únete a EventHub y descubre eventos increíbles</p>

          {/* Tabs */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setTab('usuario')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'usuario'
                  ? 'bg-white text-violet-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Usuario
            </button>
            <button
              type="button"
              onClick={() => setTab('empresa')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'empresa'
                  ? 'bg-white text-violet-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Empresa
            </button>
          </div>

          {/* Description badge */}
          {tab === 'empresa' && (
            <div className="flex items-start gap-2 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 mb-5">
              <Info size={14} className="text-violet-500 mt-0.5 shrink-0" />
              <p className="text-xs text-violet-700 leading-relaxed">
                La cuenta Empresa te permite publicar y gestionar eventos, acceder a analíticas avanzadas y conectar con miles de asistentes.
              </p>
            </div>
          )}

          {/* Form */}
          {tab === 'usuario' ? <UsuarioForm /> : <EmpresaForm />}

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">
              Iniciar Sesión
            </Link>
          </p>
        </div>

        {/* Help banner */}
        <div className="w-full max-w-md mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 text-center">
          <p className="text-sm font-semibold text-gray-700 flex items-center justify-center gap-1.5 mb-1">
            <Info size={14} className="text-blue-500" />
            ¿Necesitas ayuda?
          </p>
          <p className="text-xs text-gray-500">
            Contacta con nuestro soporte en{' '}
            <a href="mailto:soporte@eventhub.com" className="text-violet-600 font-semibold hover:underline">
              soporte@eventhub.com
            </a>
          </p>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
