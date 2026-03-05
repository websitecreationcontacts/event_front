const ORDER_KEY = 'eh_orders';

export interface OrderItem {
  ticketId: string;
  ticketName: string;
  ticketPrice: number;
  quantity: number;
}

export interface OrderEvent {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  eventCity: string;
  eventImage: string;
  items: OrderItem[];
}

export interface Order {
  id: string;
  orderRef: string;
  email: string;
  name: string;
  phone: string;
  date: string; // ISO
  events: OrderEvent[];
  subtotal: number;
  fee: number;
  total: number;
}

export function getOrders(): Order[] {
  try { return JSON.parse(localStorage.getItem(ORDER_KEY) ?? '[]') as Order[]; }
  catch { return []; }
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
}

export function getOrdersByEmail(email: string): Order[] {
  return getOrders().filter(o => o.email.toLowerCase() === email.toLowerCase());
}
