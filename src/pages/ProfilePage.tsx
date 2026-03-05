import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User,
  Lock,
  Bell,
  ChevronDown,
  Ticket,
  Heart,
  Camera,
  Eye,
  EyeOff,
  Save,
  Trash2,
  ShieldAlert,
} from 'lucide-react';
import Footer from '../components/Footer';
import { navLinks, mockUser } from '../data/mock';

// ── Navbar ─────────────────────────────────────────────────────────────────────
function UserNavbar() {
  const [open, setOpen] = useState(false);
  const { logout } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 py-4">
      <Link to="/" className="font-bold text-xl tracking-tight text-violet-700">
        EventHub
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {mockUser.firstName[0]}
          </div>
          <span className="text-sm font-semibold text-gray-800 hidden sm:block">{mockUser.name}</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
        {open && (
          <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
            <Link to="/usuario" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <Ticket size={14} className="text-gray-400" />
              Mi Dashboard
            </Link>
            <Link to="/perfil" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-violet-600 font-semibold bg-violet-50 transition-colors" onClick={() => setOpen(false)}>
              <User size={14} className="text-violet-400" />
              Mi Perfil
            </Link>
            <Link to="/favoritos" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <Heart size={14} className="text-gray-400" />
              Favoritos
            </Link>
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                onClick={() => { setOpen(false); logout(); navigate('/login'); }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ── Field ──────────────────────────────────────────────────────────────────────
function Field({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  rightElement,
  disabled,
}: {
  label: string;
  type?: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  rightElement?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 transition pr-10 ${
            disabled
              ? 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { showToast } = useApp();

  // Personal data
  const [name, setName]     = useState(mockUser.name);
  const [email, setEmail]   = useState(mockUser.email);
  const [phone, setPhone]   = useState('+34 612 345 678');
  const [city, setCity]     = useState('Madrid');

  // Password
  const [currentPwd, setCurrentPwd]     = useState('');
  const [newPwd, setNewPwd]             = useState('');
  const [confirmPwd, setConfirmPwd]     = useState('');
  const [showCurrent, setShowCurrent]   = useState(false);
  const [showNew, setShowNew]           = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [pwdError, setPwdError]         = useState('');

  // Notifications
  const [notifEmail, setNotifEmail]     = useState(true);
  const [notifSMS, setNotifSMS]         = useState(false);
  const [notifPromos, setNotifPromos]   = useState(true);
  const [notifNews, setNotifNews]       = useState(false);

  function savePersonal() {
    if (!name.trim() || !email.trim()) {
      showToast('El nombre y el email son obligatorios', 'error');
      return;
    }
    showToast('Datos personales actualizados', 'success');
  }

  function savePassword() {
    setPwdError('');
    if (!currentPwd || !newPwd || !confirmPwd) {
      setPwdError('Completa todos los campos');
      return;
    }
    if (newPwd.length < 8) {
      setPwdError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdError('Las contraseñas no coinciden');
      return;
    }
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    showToast('Contraseña actualizada correctamente', 'success');
  }

  function saveNotifications() {
    showToast('Preferencias de notificaciones guardadas', 'success');
  }

  const eyeBtn = (show: boolean, toggle: () => void) => (
    <button type="button" onClick={toggle} className="text-gray-400 hover:text-gray-600 transition-colors">
      {show ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UserNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8 space-y-6">

        {/* Header + avatar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {mockUser.firstName[0]}
            </div>
            <button
              title="Cambiar foto"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-violet-600 hover:bg-violet-700 flex items-center justify-center text-white shadow transition-colors"
            >
              <Camera size={13} />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-extrabold text-gray-900">{mockUser.name}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{mockUser.email}</p>
            <p className="text-xs text-gray-300 mt-1">Miembro desde {mockUser.memberSince}</p>
          </div>
          <div className="sm:ml-auto flex gap-2">
            <Link
              to="/usuario"
              className="text-sm font-semibold text-violet-600 border border-violet-200 rounded-xl px-4 py-2 hover:bg-violet-50 transition-colors"
            >
              Mi Dashboard
            </Link>
          </div>
        </div>

        {/* Datos personales */}
        <Section icon={<User size={16} />} title="Datos Personales">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <Field label="Nombre completo" value={name} onChange={setName} placeholder="Tu nombre" />
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="tu@email.com" />
            <Field label="Teléfono" type="tel" value={phone} onChange={setPhone} placeholder="+34 600 000 000" />
            <Field label="Ciudad" value={city} onChange={setCity} placeholder="Tu ciudad" />
            <Field label="Miembro desde" value={mockUser.memberSince} disabled />
            <Field label="ID de usuario" value={mockUser.id} disabled />
          </div>
          <div className="flex justify-end">
            <button
              onClick={savePersonal}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow transition-colors"
            >
              <Save size={15} />
              Guardar cambios
            </button>
          </div>
        </Section>

        {/* Cambiar contraseña */}
        <Section icon={<Lock size={16} />} title="Cambiar Contraseña">
          <div className="space-y-4 mb-5">
            <Field
              label="Contraseña actual"
              type={showCurrent ? 'text' : 'password'}
              value={currentPwd}
              onChange={setCurrentPwd}
              placeholder="••••••••"
              rightElement={eyeBtn(showCurrent, () => setShowCurrent(!showCurrent))}
            />
            <Field
              label="Nueva contraseña"
              type={showNew ? 'text' : 'password'}
              value={newPwd}
              onChange={setNewPwd}
              placeholder="Mínimo 8 caracteres"
              rightElement={eyeBtn(showNew, () => setShowNew(!showNew))}
            />
            <Field
              label="Confirmar nueva contraseña"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPwd}
              onChange={setConfirmPwd}
              placeholder="Repite la contraseña"
              rightElement={eyeBtn(showConfirm, () => setShowConfirm(!showConfirm))}
            />
            {pwdError && (
              <p className="text-xs text-red-500 font-medium">{pwdError}</p>
            )}
            {newPwd.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-1.5 font-medium">Fortaleza</p>
                <div className="flex gap-1">
                  {[8, 12, 16].map((threshold, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        newPwd.length >= threshold
                          ? i === 0 ? 'bg-red-400' : i === 1 ? 'bg-yellow-400' : 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {newPwd.length < 8 ? 'Débil' : newPwd.length < 12 ? 'Aceptable' : newPwd.length < 16 ? 'Buena' : 'Fuerte'}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Link to="/recuperar-contrasena" className="text-xs text-violet-500 hover:underline font-medium">
              ¿Olvidaste tu contraseña?
            </Link>
            <button
              onClick={savePassword}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow transition-colors"
            >
              <Lock size={15} />
              Actualizar contraseña
            </button>
          </div>
        </Section>

        {/* Notificaciones */}
        <Section icon={<Bell size={16} />} title="Preferencias de Notificaciones">
          <div className="space-y-4 mb-5">
            {[
              { label: 'Notificaciones por email', sub: 'Recibe confirmaciones y recordatorios de tus eventos', value: notifEmail, set: setNotifEmail },
              { label: 'Notificaciones por SMS', sub: 'Alertas de último minuto directamente en tu móvil', value: notifSMS, set: setNotifSMS },
              { label: 'Ofertas y promociones', sub: 'Descuentos exclusivos y preventas anticipadas', value: notifPromos, set: setNotifPromos },
              { label: 'Novedades de EventHub', sub: 'Nuevas funcionalidades y eventos destacados', value: notifNews, set: setNotifNews },
            ].map(({ label, sub, value, set }) => (
              <div key={label} className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
                <button
                  onClick={() => set(!value)}
                  className={`relative w-10 h-5 rounded-full flex-shrink-0 transition-colors ${value ? 'bg-violet-600' : 'bg-gray-200'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={saveNotifications}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow transition-colors"
            >
              <Save size={15} />
              Guardar preferencias
            </button>
          </div>
        </Section>

        {/* Zona de peligro */}
        <Section icon={<ShieldAlert size={16} />} title="Zona de Peligro">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-100 bg-red-50">
            <div>
              <p className="text-sm font-semibold text-red-700">Eliminar cuenta</p>
              <p className="text-xs text-red-400 mt-0.5">
                Esta acción es permanente e irreversible. Se borrarán todos tus datos y tickets.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-white border border-red-200 text-red-500 hover:bg-red-100 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors flex-shrink-0">
              <Trash2 size={15} />
              Eliminar mi cuenta
            </button>
          </div>
        </Section>

      </main>

      <Footer />
    </div>
  );
}
