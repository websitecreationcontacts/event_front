import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
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

  useEffect(() => {
    if (open) setItems(getCart());
  }, [open]);

  const refresh = () => {
    setItems(getCart());
    refreshCartCount();
  };

  const handleQty = (eventId: string, ticketId: string, delta: number, current: number) => {
    const next = current + delta;
    if (next <= 0) {
      removeFromCart(eventId, ticketId);
    } else {
      updateCartItem(eventId, ticketId, next);
    }
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
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[9998] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer — slides from left */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-[22rem] bg-white z-[9999] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <ShoppingCart size={20} className="text-violet-600" />
            <h2 className="font-bold text-gray-900 text-lg">Tu Carrito</h2>
            {totalQty > 0 && (
              <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalQty}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart size={28} className="text-gray-300" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">Tu carrito está vacío</p>
                <p className="text-sm text-gray-400">Explora eventos y añade entradas</p>
              </div>
              <button
                onClick={() => { onClose(); navigate('/descubre'); }}
                className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Explorar eventos
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {groups.map((group) => (
                <div key={group.eventId} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  {/* Event header */}
                  <div className="flex items-center gap-3 p-3 border-b border-gray-100 bg-white">
                    <img
                      src={group.eventImage}
                      alt={group.eventTitle}
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-tight truncate">{group.eventTitle}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{group.eventDate} · {group.eventCity}</p>
                    </div>
                  </div>

                  {/* Ticket lines */}
                  <div className="divide-y divide-gray-100">
                    {group.items.map((item) => (
                      <div key={item.ticketId} className="flex items-center gap-2 px-3 py-2.5">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{item.ticketName}</p>
                          <p className="text-xs text-violet-600 font-semibold mt-0.5">
                            {item.ticketPrice === 0 ? 'Gratis' : `${item.ticketPrice.toFixed(2)}€`}
                          </p>
                        </div>

                        {/* Qty stepper */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleQty(item.eventId, item.ticketId, -1, item.quantity)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={10} className="text-gray-600" />
                          </button>
                          <span className="text-sm font-bold text-gray-900 w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQty(item.eventId, item.ticketId, 1, item.quantity)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={10} className="text-gray-600" />
                          </button>
                        </div>

                        {/* Subtotal + remove */}
                        <div className="text-right min-w-[48px]">
                          <p className="text-sm font-bold text-gray-900">
                            {(item.ticketPrice * item.quantity).toFixed(2)}€
                          </p>
                          <button
                            onClick={() => handleRemove(item.eventId, item.ticketId)}
                            className="text-red-300 hover:text-red-500 transition-colors mt-0.5"
                          >
                            <Trash2 size={11} />
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
          <div className="border-t border-gray-100 px-5 py-4 space-y-3 bg-white">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Subtotal ({totalQty} {totalQty === 1 ? 'entrada' : 'entradas'})</span>
              <span className="font-bold text-gray-900 text-base">{total.toFixed(2)}€</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Finalizar compra →
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-400 hover:text-gray-600 text-sm font-medium py-1 transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
