import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { getCart, updateCartItem, removeFromCart, CartItem } from '../store/cartStore';
import { useApp } from '../context/AppContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface EventGroup {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventCity: string;
  eventImage: string;
  items: CartItem[];
}

function groupByEvent(items: CartItem[]): EventGroup[] {
  const map = new Map<string, EventGroup>();
  for (const item of items) {
    if (!map.has(item.eventId)) {
      map.set(item.eventId, {
        eventId: item.eventId,
        eventTitle: item.eventTitle,
        eventDate: item.eventDate,
        eventCity: item.eventCity,
        eventImage: item.eventImage,
        items: [],
      });
    }
    map.get(item.eventId)!.items.push(item);
  }
  return [...map.values()];
}

export default function CartDrawer({ open, onClose }: Props) {
  const navigate = useNavigate();
  const { refreshCartCount } = useApp();
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Stagger mount for item animations
  useEffect(() => {
    if (open) {
      setItems(getCart());
      const t = setTimeout(() => setMounted(true), 20);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [open]);

  const refresh = () => {
    setItems(getCart());
    refreshCartCount();
  };

  const handleQty = (eventId: string, ticketId: string, delta: number, current: number) => {
    const next = current + delta;
    if (next <= 0) removeFromCart(eventId, ticketId);
    else updateCartItem(eventId, ticketId, next);
    refresh();
  };

  const handleRemove = (eventId: string, ticketId: string) => {
    removeFromCart(eventId, ticketId);
    refresh();
  };

  const groups = groupByEvent(items);
  const total = items.reduce((s, c) => s + c.ticketPrice * c.quantity, 0);
  const totalQty = items.reduce((s, c) => s + c.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/carrito');
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 z-[9998] transition-all duration-300 ${
          open
            ? 'opacity-100 pointer-events-auto backdrop-blur-sm bg-black/40'
            : 'opacity-0 pointer-events-none backdrop-blur-none bg-black/0'
        }`}
        onClick={onClose}
      />

      {/* Drawer — slides from RIGHT */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[22rem] z-[9999] flex flex-col
          shadow-[−24px_0_60px_-12px_rgba(0,0,0,0.25)]
          transition-all duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ willChange: 'transform' }}
      >
        {/* Glass-morphism header */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100/80 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200">
              <ShoppingCart size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base leading-tight">Tu Carrito</h2>
              {totalQty > 0 && (
                <p className="text-[11px] text-gray-400 leading-tight">{totalQty} {totalQty === 1 ? 'entrada' : 'entradas'}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto bg-gray-50/80 backdrop-blur-xl">
          {groups.length === 0 ? (
            <div
              className={`flex flex-col items-center justify-center h-full gap-5 px-6 text-center transition-all duration-500 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <ShoppingCart size={32} className="text-gray-200" />
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-1">Tu carrito está vacío</p>
                <p className="text-sm text-gray-400">Explora eventos y añade entradas</p>
              </div>
              <button
                onClick={() => { onClose(); navigate('/descubre'); }}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5"
              >
                Explorar eventos
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {groups.map((group, gi) => (
                <div
                  key={group.eventId}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-500 ${
                    mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${gi * 60}ms` }}
                >
                  {/* Event header */}
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100/50">
                    <div className="relative shrink-0">
                      <img
                        src={group.eventImage}
                        alt={group.eventTitle}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-sm"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-sm leading-tight truncate">{group.eventTitle}</p>
                      <p className="text-xs text-violet-500 truncate mt-0.5 font-medium">{group.eventDate} · {group.eventCity}</p>
                    </div>
                  </div>

                  {/* Ticket lines */}
                  <div className="divide-y divide-gray-50">
                    {group.items.map((item) => (
                      <div key={item.ticketId} className="flex items-center gap-2 px-3 py-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{item.ticketName}</p>
                          <p className="text-xs text-violet-600 font-bold mt-0.5">
                            {item.ticketPrice === 0 ? 'Gratis' : `${item.ticketPrice.toFixed(2)}€`}
                          </p>
                        </div>

                        {/* Qty stepper */}
                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg p-0.5">
                          <button
                            onClick={() => handleQty(item.eventId, item.ticketId, -1, item.quantity)}
                            className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors text-gray-500"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-sm font-bold text-gray-900 w-5 text-center tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => handleQty(item.eventId, item.ticketId, 1, item.quantity)}
                            className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center hover:bg-violet-50 hover:text-violet-600 transition-colors text-gray-500"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        {/* Subtotal + remove */}
                        <div className="text-right min-w-[52px]">
                          <p className="text-sm font-extrabold text-gray-900 tabular-nums">
                            {(item.ticketPrice * item.quantity).toFixed(2)}€
                          </p>
                          <button
                            onClick={() => handleRemove(item.eventId, item.ticketId)}
                            className="text-gray-300 hover:text-red-400 transition-colors mt-0.5 group"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {groups.length > 0 && (
          <div
            className={`border-t border-gray-100 bg-white/95 backdrop-blur-xl px-5 py-4 space-y-3 transition-all duration-500 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Total row */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <div className="text-right">
                <span className="text-xl font-extrabold text-gray-900 tabular-nums">{total.toFixed(2)}€</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3.5 rounded-2xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles size={15} />
              Finalizar compra
              <ArrowRight size={15} />
            </button>

            <button
              onClick={onClose}
              className="w-full text-gray-400 hover:text-gray-600 text-xs font-medium py-1 transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
