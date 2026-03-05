import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    // TODO: conectar con API de recuperación de contraseña
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-12">

      {/* Logo */}
      <Link to="/" className="text-violet-600 font-extrabold text-2xl tracking-tight mb-8">
        EventHub
      </Link>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-10 text-center">
        {sent ? (
          <>
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
            </div>
            <h1 className="text-xl font-extrabold text-gray-900 mb-2">¡Correo enviado!</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-7">
              Hemos enviado instrucciones para restablecer tu contraseña a{' '}
              <span className="font-semibold text-gray-700">{email}</span>.
              Revisa también tu carpeta de spam.
            </p>
            <Link
              to="/login"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <ArrowLeft size={15} />
              Volver a Iniciar Sesión
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Recuperar Contraseña</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
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

              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-md"
              >
                Enviar Instrucciones
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-5">
              ¿Recordaste tu contraseña?{' '}
              <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">
                Iniciar Sesión
              </Link>
            </p>
          </>
        )}
      </div>

      {/* Sign up link */}
      <p className="text-sm text-gray-500 mt-5">
        ¿No tienes cuenta?{' '}
        <Link to="/registro" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">
          Regístrate gratis
        </Link>
      </p>

      {/* Floating help */}
      <a
        href="mailto:soporte@eventhub.com"
        className="fixed bottom-6 right-6 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg transition-colors flex items-center gap-1.5"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="currentColor"/>
        </svg>
        Ayuda
      </a>
    </div>
  );
}
