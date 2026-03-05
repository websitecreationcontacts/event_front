const CART_KEY = 'eh_cart';

export interface CartItem {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  eventCity: string;
  eventImage: string;
  ticketId: string;
  ticketName: string;
  ticketDescription: string;
  ticketPrice: number;
  quantity: number;
}

export function getCart(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]') as CartItem[]; }
  catch { return []; }
}

function persist(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(newItems: CartItem[]): void {
  const cart = getCart();
  for (const item of newItems) {
    if (item.quantity <= 0) continue;
    const existing = cart.find(c => c.eventId === item.eventId && c.ticketId === item.ticketId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push({ ...item });
    }
  }
  persist(cart);
}

export function updateCartItem(eventId: string, ticketId: string, quantity: number): void {
  const cart = getCart().map(c =>
    c.eventId === eventId && c.ticketId === ticketId ? { ...c, quantity } : c
  ).filter(c => c.quantity > 0);
  persist(cart);
}

export function removeFromCart(eventId: string, ticketId: string): void {
  persist(getCart().filter(c => !(c.eventId === eventId && c.ticketId === ticketId)));
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}

export function getCartCount(): number {
  return getCart().reduce((s, c) => s + c.quantity, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((s, c) => s + c.ticketPrice * c.quantity, 0);
}
