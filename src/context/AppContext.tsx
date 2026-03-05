import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { getCartCount } from '../store/cartStore';
import CartDrawer from '../components/CartDrawer';

// ── Types ─────────────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

type UserRole = 'client' | 'company' | null;

interface AppContextType {
  isLoggedIn: boolean;
  userRole: UserRole;
  login: (role?: UserRole) => void;
  logout: () => void;
  favorites: string[];
  isFavorite: (eventId: string) => boolean;
  toggleFavorite: (eventId: string) => void;
  showToast: (message: string, type?: ToastType) => void;
  cartCount: number;
  refreshCartCount: () => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// ── Toast component ───────────────────────────────────────────────────────────

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-600 text-white',
  error:   'bg-red-500 text-white',
  info:    'bg-gray-800 text-white',
};

const ToastIcon = ({ type }: { type: ToastType }) => {
  if (type === 'success') return <CheckCircle2 size={16} className="shrink-0" />;
  if (type === 'error')   return <XCircle size={16} className="shrink-0" />;
  return <Info size={16} className="shrink-0" />;
};

// ── Provider ──────────────────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? '') ?? fallback; }
  catch { return fallback; }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => load('eh_loggedIn', false));
  const [userRole, setUserRole]     = useState<UserRole>(() => load('eh_role', null));
  const [favorites, setFavorites]   = useState<string[]>(() => load('eh_favorites', []));
  const [toasts, setToasts]         = useState<Toast[]>([]);
  const [cartCount, setCartCount]   = useState<number>(() => getCartCount());
  const [cartOpen, setCartOpen]     = useState(false);
  const toastId = useRef(0);

  const refreshCartCount = useCallback(() => setCartCount(getCartCount()), []);
  const openCart  = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastId.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const login = useCallback((role: UserRole = 'client') => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('eh_loggedIn', 'true');
    localStorage.setItem('eh_role', JSON.stringify(role));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserRole(null);
    setFavorites([]);
    localStorage.removeItem('eh_loggedIn');
    localStorage.removeItem('eh_role');
    localStorage.removeItem('eh_favorites');
  }, []);

  const isFavorite = useCallback((eventId: string) => favorites.includes(eventId), [favorites]);

  const toggleFavorite = useCallback((eventId: string) => {
    if (!isLoggedIn) {
      showToast('Debes iniciar sesión para guardar eventos en favoritos', 'info');
      return;
    }
    const already = favorites.includes(eventId);
    const next = already ? favorites.filter(id => id !== eventId) : [...favorites, eventId];
    localStorage.setItem('eh_favorites', JSON.stringify(next));
    setFavorites(next);
    showToast(
      already ? 'Eliminado de favoritos' : 'Añadido a favoritos',
      already ? 'error' : 'success',
    );
  }, [isLoggedIn, favorites, showToast]);

  return (
    <AppContext.Provider value={{ isLoggedIn, userRole, login, logout, favorites, isFavorite, toggleFavorite, showToast, cartCount, refreshCartCount, cartOpen, openCart, closeCart }}>
      {children}

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={closeCart} />

      {/* Toast portal */}
      <div className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold max-w-xs pointer-events-auto animate-slide-in ${toastStyles[t.type]}`}
          >
            <ToastIcon type={t.type} />
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(tt => tt.id !== t.id))}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}
