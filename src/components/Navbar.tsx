import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Ticket, Heart, User, LayoutDashboard, CalendarPlus, Building2, ShoppingCart } from 'lucide-react';
import { navLinks, mockUser, mockCompany } from '../data/mock';
import { useApp } from '../context/AppContext';
import AnnouncementBanner from './AnnouncementBanner';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, userRole, logout, cartCount, openCart } = useApp();
  const [open, setOpen] = useState(false);

  const textColor = transparent ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900';
  const logoColor = transparent ? 'text-white' : 'text-violet-700';

  const navContent = (
    <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between w-full gap-8">
      <Link to="/" className={`font-bold text-xl tracking-tight ${logoColor}`}>
        EventHub
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                transparent
                  ? `${textColor} ${isActive ? 'text-white' : ''}`
                  : `${textColor} ${isActive ? 'text-violet-600 font-semibold' : ''}`
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side: logged out vs logged in */}
      {!isLoggedIn ? (
        <div className="flex items-center gap-3">
          <button onClick={openCart} className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${transparent ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`}>
            <ShoppingCart size={18} className={transparent ? 'text-white/80' : 'text-gray-500'} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
          <Link to="/login" className={`text-sm font-medium transition-colors ${textColor}`}>
            Iniciar Sesión
          </Link>
          <Link to="/registro" className="btn-primary !text-sm !px-4 !py-2">
            Registrarse
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {userRole === 'client' && (
            <button onClick={openCart} className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${transparent ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`}>
              <ShoppingCart size={18} className={transparent ? 'text-white/80' : 'text-gray-500'} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors ${transparent ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${userRole === 'company' ? 'bg-gradient-to-br from-orange-400 to-rose-500' : 'bg-gradient-to-br from-violet-500 to-purple-600'}`}>
                {userRole === 'company' ? mockCompany.logo : mockUser.firstName[0]}
              </div>
              <span className={`text-sm font-semibold hidden sm:block ${transparent ? 'text-white' : 'text-gray-800'}`}>
                {userRole === 'company' ? mockCompany.name : mockUser.name}
              </span>
              <ChevronDown size={14} className={transparent ? 'text-white/70' : 'text-gray-500'} />
            </button>

            {open && (
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                {userRole === 'company' ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-semibold text-gray-900 truncate">{mockCompany.name}</p>
                      <p className="text-xs text-gray-400">{mockCompany.cif}</p>
                    </div>
                    <Link to="/empresa/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
                      <LayoutDashboard size={14} className="text-gray-400" />
                      Dashboard
                    </Link>
                    <Link to="/empresa/crear-evento" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
                      <CalendarPlus size={14} className="text-gray-400" />
                      Crear Evento
                    </Link>
                    <Link to="/empresas" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
                      <Building2 size={14} className="text-gray-400" />
                      Perfil de Empresa
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/usuario" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
                      <User size={14} className="text-gray-400" />
                      Mi Perfil
                    </Link>
                    <Link to="/usuario" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
                      <Ticket size={14} className="text-gray-400" />
                      Mis Tickets
                    </Link>
                    <Link to="/favoritos" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
                      <Heart size={14} className="text-gray-400" />
                      Favoritos
                    </Link>
                  </>
                )}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                    onClick={() => { setOpen(false); logout(); navigate('/'); }}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Transparent mode (HomePage): banner + nav form an absolute overlay at the top
  if (transparent) {
    return (
      <div className="absolute top-0 left-0 right-0 z-50">
        <AnnouncementBanner />
        <header>{navContent}</header>
      </div>
    );
  }

  // Normal mode: banner + nav stick together at the top
  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBanner />
      <header className="bg-white border-b border-gray-100 shadow-sm">{navContent}</header>
    </div>
  );
}
