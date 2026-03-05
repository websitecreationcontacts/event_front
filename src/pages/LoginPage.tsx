import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Info } from 'lucide-react';
import { navLinks, mockCredentials, mockCompanyCredentials } from '../data/mock';
import { useApp } from '../context/AppContext';

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
        to="/registro"
        className="border border-gray-300 hover:border-violet-500 text-gray-700 hover:text-violet-600 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Registrarse
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

// ── Page ───────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === mockCredentials.email && password === mockCredentials.password) {
      login('client');
      navigate('/usuario');
    } else if (email === mockCompanyCredentials.email && password === mockCompanyCredentials.password) {
      login('company');
      navigate('/empresa/dashboard');
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-10">
          {/* Avatar icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-1">Iniciar Sesión</h1>
          <p className="text-gray-500 text-sm text-center mb-7">Accede a tu cuenta de EventHub</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="accent-violet-600 w-3.5 h-3.5"
                />
                <span className="text-xs text-gray-600">Recordarme</span>
              </label>
              <Link to="/recuperar-contrasena" className="text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 font-medium bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-md mt-1"
            >
              <LogIn size={16} />
              Iniciar Sesión
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">O continúa con</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors text-sm">
              {/* Google G */}
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar con Google
            </button>

            <button className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors text-sm">
              {/* Facebook */}
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continuar con Facebook
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">
              Regístrate aquí
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
