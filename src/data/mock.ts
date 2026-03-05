export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface Event {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  venue: string;
  city: string;
  price: number | null;
  priceLabel: string;
  buttonLabel: string;
  image: string;
  badge: string;
  timeStart?: string;
  timeEnd?: string;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  available: number;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  time?: string;
  avatar: string;
  color: string;
}

export interface EventDetail extends Event {
  fullDate: string;
  description: string[];
  includes: string[];
  artists: Artist[];
  tickets: TicketType[];
  similarEventIds: string[];
  heroImage: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Conciertos', icon: 'Music', color: 'text-violet-600', bgColor: 'bg-violet-100' },
  { id: '2', name: 'Fiestas', icon: 'PartyPopper', color: 'text-pink-500', bgColor: 'bg-pink-100' },
  { id: '3', name: 'Conferencias', icon: 'Mic', color: 'text-amber-500', bgColor: 'bg-amber-100' },
  { id: '4', name: 'Deportes', icon: 'Trophy', color: 'text-green-500', bgColor: 'bg-green-100' },
  { id: '5', name: 'Arte', icon: 'Palette', color: 'text-blue-500', bgColor: 'bg-blue-100' },
  { id: '6', name: 'Gastronomía', icon: 'UtensilsCrossed', color: 'text-red-500', bgColor: 'bg-red-100' },
];

export const badgeColors: Record<string, string> = {
  Música: 'bg-violet-600',
  Conferencia: 'bg-blue-600',
  Concierto: 'bg-orange-500',
  Deportes: 'bg-green-600',
  Arte: 'bg-pink-500',
  Fiesta: 'bg-red-500',
  Gastronomía: 'bg-amber-500',
  Comedia: 'bg-yellow-500',
  Jazz: 'bg-indigo-500',
  Teatro: 'bg-rose-600',
  Friki: 'bg-fuchsia-600',
};

export const featuredEvents: Event[] = [
  {
    id: '1',
    title: 'Festival Electrónico Madrid',
    category: 'Música',
    categoryColor: 'bg-violet-600',
    date: '15 Feb',
    venue: 'IFEMA Center',
    city: 'Madrid',
    price: 45,
    priceLabel: 'Desde 45€',
    buttonLabel: 'Comprar',
    badge: 'Música',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop&auto=format',
  },
  {
    id: '2',
    title: 'Tech Summit 2024',
    category: 'Conferencia',
    categoryColor: 'bg-blue-600',
    date: '11 Mar',
    venue: 'Palacio de Congresos',
    city: 'Barcelona',
    price: 120,
    priceLabel: 'Desde 120€',
    buttonLabel: 'Comprar',
    badge: 'Conferencia',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop&auto=format',
  },
  {
    id: '3',
    title: 'Vetusta Morla en Vivo',
    category: 'Concierto',
    categoryColor: 'bg-orange-500',
    date: '22 Mar',
    venue: 'Palacio de la Música',
    city: 'Valencia',
    price: 65,
    priceLabel: 'Desde 65€',
    buttonLabel: 'Comprar',
    badge: 'Concierto',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=250&fit=crop&auto=format',
  },
];

export const allEvents: Event[] = [
  {
    id: '1',
    title: 'Festival Electrónico Madrid 2024',
    category: 'Música',
    categoryColor: 'bg-violet-600',
    date: '8 Feb',
    venue: 'IFEMA Center',
    city: 'Madrid',
    price: 45,
    priceLabel: 'Desde 45€',
    buttonLabel: 'Ver Tickets',
    badge: 'Música',
    timeStart: '20:00',
    timeEnd: '02:00',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '2',
    title: 'Tech Summit 2024: Innovación Digital',
    category: 'Conferencia',
    categoryColor: 'bg-blue-600',
    date: '12 Feb',
    venue: 'Palacio de Congresos',
    city: 'Barcelona',
    price: 120,
    priceLabel: 'Desde 120€',
    buttonLabel: 'Ver Tickets',
    badge: 'Conferencia',
    timeStart: '09:00',
    timeEnd: '18:00',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '3',
    title: 'Vetusta Morla en Vivo',
    category: 'Concierto',
    categoryColor: 'bg-orange-500',
    date: '13 Feb',
    venue: 'Palacio de la Música',
    city: 'Valencia',
    price: 65,
    priceLabel: 'Desde 65€',
    buttonLabel: 'Ver Tickets',
    badge: 'Concierto',
    timeStart: '21:00',
    timeEnd: '23:30',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '4',
    title: 'Real Madrid vs Barcelona',
    category: 'Deportes',
    categoryColor: 'bg-green-600',
    date: '5 Mar',
    venue: 'Santiago Bernabéu',
    city: 'Madrid',
    price: 180,
    priceLabel: 'Desde 180€',
    buttonLabel: 'Ver Tickets',
    badge: 'Deportes',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '5',
    title: 'Exposición: Arte Contemporáneo',
    category: 'Arte',
    categoryColor: 'bg-pink-500',
    date: '18 Mar',
    venue: 'Museo Reina Sofía',
    city: 'Madrid',
    price: null,
    priceLabel: 'Gratis',
    buttonLabel: 'Reservar',
    badge: 'Arte',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '6',
    title: 'Festival Gastronómico Valencia',
    category: 'Gastronomía',
    categoryColor: 'bg-amber-500',
    date: '8 Mar',
    venue: 'Ciudad de las Artes',
    city: 'Valencia',
    price: 25,
    priceLabel: 'Desde 25€',
    buttonLabel: 'Ver Tickets',
    badge: 'Gastronomía',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '7',
    title: 'Dayo Jiménez: Stand Up',
    category: 'Comedia',
    categoryColor: 'bg-yellow-500',
    date: '15 Mar',
    venue: 'Teatro Álvarez Jesús',
    city: 'Madrid',
    price: 35,
    priceLabel: 'Desde 35€',
    buttonLabel: 'Ver Tickets',
    badge: 'Comedia',
    timeStart: '20:00',
    timeEnd: '21:30',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '8',
    title: 'Noche de Jazz en Café Central',
    category: 'Jazz',
    categoryColor: 'bg-indigo-500',
    date: '12 Mar',
    venue: 'Café Central',
    city: 'Madrid',
    price: 28,
    priceLabel: 'Desde 28€',
    buttonLabel: 'Ver Tickets',
    badge: 'Jazz',
    timeStart: '21:00',
    timeEnd: '23:00',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '9',
    title: 'La Casa de Bernarda Alba',
    category: 'Teatro',
    categoryColor: 'bg-rose-600',
    date: '18 - 27 Mar',
    venue: 'Teatro Español',
    city: 'Madrid',
    price: 42,
    priceLabel: 'Desde 42€',
    buttonLabel: 'Ver Tickets',
    badge: 'Teatro',
    image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '10',
    title: 'Underground Techno Night',
    category: 'Música',
    categoryColor: 'bg-violet-600',
    date: '20 Feb',
    venue: 'Fabrik',
    city: 'Madrid',
    price: 35,
    priceLabel: 'Desde 35€',
    buttonLabel: 'Ver Tickets',
    badge: 'Música',
    timeStart: '23:00',
    timeEnd: '06:00',
    image: 'https://images.unsplash.com/photo-1598300188780-c7b813c5b8ab?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '11',
    title: 'Summer House Festival',
    category: 'Música',
    categoryColor: 'bg-violet-600',
    date: '1 Mar',
    venue: 'Jardines de Cecilio Rodríguez',
    city: 'Madrid',
    price: 55,
    priceLabel: 'Desde 55€',
    buttonLabel: 'Ver Tickets',
    badge: 'Música',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '13',
    title: 'Torneo Pokémon TCG Madrid',
    category: 'Friki',
    categoryColor: 'bg-fuchsia-600',
    date: '22 Mar',
    venue: 'WiZink Center',
    city: 'Madrid',
    price: 18,
    priceLabel: 'Desde 18€',
    buttonLabel: 'Ver Tickets',
    badge: 'Friki',
    timeStart: '10:00',
    timeEnd: '20:00',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '14',
    title: 'Comic Con España 2024',
    category: 'Friki',
    categoryColor: 'bg-fuchsia-600',
    date: '5 Abr',
    venue: 'IFEMA Madrid',
    city: 'Madrid',
    price: 25,
    priceLabel: 'Desde 25€',
    buttonLabel: 'Ver Tickets',
    badge: 'Friki',
    timeStart: '09:00',
    timeEnd: '21:00',
    image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '15',
    title: 'Magic: The Gathering Grand Prix',
    category: 'Friki',
    categoryColor: 'bg-fuchsia-600',
    date: '12 Abr',
    venue: 'Palacio de Congresos',
    city: 'Barcelona',
    price: 30,
    priceLabel: 'Desde 30€',
    buttonLabel: 'Ver Tickets',
    badge: 'Friki',
    timeStart: '09:00',
    timeEnd: '18:00',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=260&fit=crop&auto=format',
  },
  {
    id: '12',
    title: 'Trance Evolution',
    category: 'Música',
    categoryColor: 'bg-violet-600',
    date: '15 Mar',
    venue: 'Palacio Vistalegre',
    city: 'Madrid',
    price: 40,
    priceLabel: 'Desde 40€',
    buttonLabel: 'Ver Tickets',
    badge: 'Música',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=260&fit=crop&auto=format',
  },
];

export const eventDetails: Record<string, EventDetail> = {
  '1': {
    id: '1',
    title: 'Festival Electrónico Madrid 2024',
    category: 'Música',
    categoryColor: 'bg-violet-600',
    date: '8 Feb',
    fullDate: '15 febrero 2024',
    venue: 'IFEMA Center',
    city: 'Madrid',
    price: 45,
    priceLabel: 'Desde 45€',
    buttonLabel: 'Ver Tickets',
    badge: 'Música',
    timeStart: '20:00',
    timeEnd: '02:00',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=260&fit=crop&auto=format',
    heroImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&h=500&fit=crop&auto=format',
    description: [
      'Prepárate para vivir la experiencia musical más electrizante del año en el Festival Electrónico de Madrid 2024. Este evento reúne a los mejores DJs y productores de música electrónica del panorama internacional.',
      'Durante toda la noche disfrutarás de sets de música increíbles. Adicionalmente, el recinto cuenta con distintas zonas temáticas, ofreciendo una experiencia visual impresionante con tecnología LED de última generación y efectos especiales que transformarán cada momento en un recuerdo inolvidable.',
      'El festival cuenta con múltiples escenarios, zonas VIP, food trucks con propuestas gastronómicas que combinan música, arte y tecnología. No te pierdas la oportunidad de ser parte de la comunidad electrónica más grande de Madrid.',
    ],
    includes: [
      'Acceso completo al festival',
      'DJ sets de música electrónica',
      'Acceso a todas las instalaciones',
      'Gastronomía disponible',
      'Zona de descanso',
    ],
    artists: [
      { id: '1', name: 'Martin Garrix', role: 'Electronic / Trance', avatar: 'MG', color: 'bg-violet-500' },
      { id: '2', name: 'Armin van Buuren', role: 'Electronic / Trance', avatar: 'AB', color: 'bg-blue-500' },
      { id: '3', name: 'Tiësto', role: 'Special Guest', time: '13:00', avatar: 'TI', color: 'bg-orange-500' },
      { id: '4', name: 'Calvin Harris', role: 'Closing Set', time: '13:00', avatar: 'CH', color: 'bg-green-500' },
    ],
    tickets: [
      { id: 't1', name: 'Entrada General', description: '2 entradas disponibles', price: 45, available: 2 },
      { id: 't2', name: 'VIP Experience', description: 'Zona VIP + barra libre', price: 120, available: 10 },
      { id: 't3', name: 'Premium VIP', description: 'Palco privado + servicio', price: 250, available: 5 },
    ],
    similarEventIds: ['10', '11', '12'],
  },
};

export function getEventDetail(id: string): EventDetail | undefined {
  if (eventDetails[id]) return eventDetails[id];
  const ev = allEvents.find((e) => e.id === id);
  if (!ev) return undefined;
  return {
    ...ev,
    fullDate: ev.date,
    heroImage: ev.image.replace('w=400&h=260', 'w=1400&h=500'),
    description: [
      'Disfruta de una experiencia única en este evento. Una oportunidad para conectar con la cultura, la música y el arte en un ambiente inigualable.',
      'No te pierdas este evento que promete ser uno de los mejores del año. Adquiere tus entradas antes de que se agoten.',
    ],
    includes: [
      'Acceso al recinto',
      'Programa completo del evento',
      'Zonas de descanso habilitadas',
    ],
    artists: [],
    tickets: [
      { id: 't1', name: 'Entrada General', description: 'Acceso estándar', price: ev.price ?? 0, available: 50 },
    ],
    similarEventIds: allEvents
      .filter((e) => e.id !== id && e.badge === ev.badge)
      .slice(0, 3)
      .map((e) => e.id),
  };
}

// ── User (cliente) types & mocks ──────────────────────────────────────────────

export interface MockUser {
  id: string;        // GUID
  name: string;
  firstName: string;
  email: string;
  memberSince: string;
}

export interface UserUpcomingEvent {
  id: string;        // GUID
  title: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  ticketCount: number;
  iconColor: string;
  iconLetter: string;
}

export interface UserTicket {
  id: string;        // GUID
  ticketRef: string; // human-readable ref, e.g. #FEM-2024-001
  eventId: string;   // GUID
  eventTitle: string;
  iconColor: string;
  iconLetter: string;
  date: string;
  zone: string;
  type: string;
  price: number;
  status: 'activo' | 'usado';
}

export interface RecommendedEvent {
  id: string;        // GUID
  title: string;
  venue: string;
  city: string;
  price: number;
  image: string;
}

export const mockUser: MockUser = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  name: 'María García',
  firstName: 'María',
  email: 'maria.garcia@email.com',
  memberSince: 'enero 2023',
};

// Credenciales de prueba
export const mockCredentials = {
  email: 'maria.garcia@email.com',
  password: 'eventhub123',
};

export const userStats = {
  ticketsActivos: 8,
  ticketsUsados: 12,
  proximosEventos: 3,
  totalGastado: 485,
};

export const userUpcomingEvents: UserUpcomingEvent[] = [
  {
    id: '3f8a2c1d-4e5b-6f7a-8b9c-0d1e2f3a4b5c',
    title: 'Festival Electrónico Madrid',
    venue: 'IFEMA Center',
    city: 'Madrid',
    date: '15 Feb 2024',
    time: '20:00',
    ticketCount: 2,
    iconColor: 'bg-violet-500',
    iconLetter: 'FE',
  },
  {
    id: '7c9d3e2f-1a4b-5c6d-7e8f-9a0b1c2d3e4f',
    title: 'Tech Summit 2024',
    venue: 'Palacio de Congresos',
    city: 'Barcelona',
    date: '22 Feb 2024',
    time: '09:00',
    ticketCount: 1,
    iconColor: 'bg-blue-500',
    iconLetter: 'TS',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    title: 'Vetusta Morla en Vivo',
    venue: 'Palacio de la Música',
    city: 'Valencia',
    date: '28 Feb 2024',
    time: '21:30',
    ticketCount: 3,
    iconColor: 'bg-orange-500',
    iconLetter: 'VM',
  },
];

export const userTickets: UserTicket[] = [
  {
    id: 'd4e5f6a7-b8c9-0123-defa-b45678901234',
    ticketRef: '#FEM-2024-001',
    eventId: '3f8a2c1d-4e5b-6f7a-8b9c-0d1e2f3a4b5c',
    eventTitle: 'Festival Electrónico Madrid',
    iconColor: 'bg-violet-500',
    iconLetter: 'FE',
    date: '15 Feb 2024',
    zone: 'Pista VIP',
    type: 'VIP Experience',
    price: 85,
    status: 'activo',
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-b45678901235',
    ticketRef: '#FEM-2024-002',
    eventId: '3f8a2c1d-4e5b-6f7a-8b9c-0d1e2f3a4b5c',
    eventTitle: 'Festival Electrónico Madrid',
    iconColor: 'bg-violet-500',
    iconLetter: 'FE',
    date: '15 Feb 2024',
    zone: 'Pista VIP',
    type: 'VIP Experience',
    price: 85,
    status: 'activo',
  },
  {
    id: 'e5f6a7b8-c9d0-1234-efab-c56789012345',
    ticketRef: '#TS-2024-045',
    eventId: '7c9d3e2f-1a4b-5c6d-7e8f-9a0b1c2d3e4f',
    eventTitle: 'Tech Summit 2024',
    iconColor: 'bg-blue-500',
    iconLetter: 'TS',
    date: '22 Feb 2024',
    zone: 'Sala Principal',
    type: 'Premium',
    price: 120,
    status: 'activo',
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000001',
    ticketRef: '#VM-2024-031',
    eventId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    eventTitle: 'Vetusta Morla en Vivo',
    iconColor: 'bg-orange-500',
    iconLetter: 'VM',
    date: '28 Feb 2024',
    zone: 'Sección A, Fila 5, Asiento 12',
    type: 'General',
    price: 65,
    status: 'activo',
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000002',
    ticketRef: '#VM-2024-032',
    eventId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    eventTitle: 'Vetusta Morla en Vivo',
    iconColor: 'bg-orange-500',
    iconLetter: 'VM',
    date: '28 Feb 2024',
    zone: 'Sección A, Fila 5, Asiento 13',
    type: 'General',
    price: 65,
    status: 'activo',
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000003',
    ticketRef: '#VM-2024-033',
    eventId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    eventTitle: 'Vetusta Morla en Vivo',
    iconColor: 'bg-orange-500',
    iconLetter: 'VM',
    date: '28 Feb 2024',
    zone: 'Sección A, Fila 5, Asiento 14',
    type: 'General',
    price: 65,
    status: 'activo',
  },
  {
    id: 'f6a7b8c9-d0e1-2345-fabc-d67890123456',
    ticketRef: '#HAM-2024-102',
    eventId: 'c3d4e5f6-a7b8-9012-cdef-a34567890123',
    eventTitle: 'Obra de Teatro: Hamlet',
    iconColor: 'bg-gray-400',
    iconLetter: 'TH',
    date: '10 Ene 2024',
    zone: 'Fila 6, Asiento 12',
    type: 'General',
    price: 45,
    status: 'usado',
  },
];

export const recommendedEvents: RecommendedEvent[] = [
  {
    id: 'a8b9c0d1-e2f3-4567-89ab-cdef01234567',
    title: 'Festival de Jazz',
    venue: 'Café Central',
    city: 'Madrid',
    price: 25,
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=200&fit=crop&auto=format',
  },
  {
    id: 'b9c0d1e2-f3a4-5678-9abc-def012345678',
    title: 'Exposición de Arte',
    venue: 'Museo Reina Sofía',
    city: 'Madrid',
    price: 15,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop&auto=format',
  },
];

// ── Company (empresa) types & mocks ───────────────────────────────────────────

export interface MockCompany {
  id: string;
  name: string;
  cif: string;
  email: string;
  phone: string;
  city: string;
  sector: string;
  plan: string;
  memberSince: string;
  logo: string; // initials fallback
}

export interface CompanyEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  ticketsSold: number;
  ticketsTotal: number;
  revenue: number;
  status: 'activo' | 'borrador' | 'finalizado';
  category: string;
  categoryColor: string;
  image?: string;
  price?: number;
  description?: string;
}

export interface CompanySale {
  id: string;
  buyer: string;
  email: string;
  event: string;
  tickets: number;
  amount: number;
  date: string;
  status: 'completado' | 'pendiente' | 'reembolsado';
}

export const mockCompany: MockCompany = {
  id: 'comp-0001-0001-0001-000000000001',
  name: 'Infinity Events SL',
  cif: 'B-12345678',
  email: 'admin@infinityevents.es',
  phone: '+34 91 234 56 78',
  city: 'Madrid',
  sector: 'Organización de Eventos',
  plan: 'Pro',
  memberSince: 'marzo 2023',
  logo: 'IE',
};

export const mockCompanyCredentials = {
  email: 'admin@infinityevents.es',
  password: 'empresa123',
};

export const companyStats = {
  eventosActivos: 4,
  ticketsVendidos: 1284,
  ingresosTotales: 58420,
  asistentesTotales: 3210,
  ticketsVendidosChange: 12,   // % vs last month
  ingresosChange: 8,
};

export const companyEvents: CompanyEvent[] = [
  {
    id: 'cev-001',
    title: 'Festival Electrónico Madrid 2024',
    date: '15 Feb 2024',
    venue: 'IFEMA Center',
    city: 'Madrid',
    ticketsSold: 480,
    ticketsTotal: 600,
    revenue: 21600,
    status: 'activo',
    category: 'Música',
    categoryColor: 'bg-violet-600',
  },
  {
    id: 'cev-002',
    title: 'Tech Summit 2024',
    date: '22 Feb 2024',
    venue: 'Palacio de Congresos',
    city: 'Barcelona',
    ticketsSold: 310,
    ticketsTotal: 400,
    revenue: 37200,
    status: 'activo',
    category: 'Conferencia',
    categoryColor: 'bg-blue-600',
  },
  {
    id: 'cev-003',
    title: 'Summer House Festival',
    date: '1 Mar 2024',
    venue: 'Jardines de Cecilio Rodríguez',
    city: 'Madrid',
    ticketsSold: 380,
    ticketsTotal: 500,
    revenue: 20900,
    status: 'activo',
    category: 'Música',
    categoryColor: 'bg-violet-600',
  },
  {
    id: 'cev-004',
    title: 'Trance Evolution',
    date: '15 Mar 2024',
    venue: 'Palacio Vistalegre',
    city: 'Madrid',
    ticketsSold: 114,
    ticketsTotal: 800,
    revenue: 4560,
    status: 'activo',
    category: 'Música',
    categoryColor: 'bg-violet-600',
  },
  {
    id: 'cev-005',
    title: 'Jazz Night Vol. 3',
    date: '10 Ene 2024',
    venue: 'Café Central',
    city: 'Madrid',
    ticketsSold: 200,
    ticketsTotal: 200,
    revenue: 5600,
    status: 'finalizado',
    category: 'Jazz',
    categoryColor: 'bg-indigo-500',
  },
  {
    id: 'cev-006',
    title: 'Gala Corporativa Primavera',
    date: '20 Abr 2024',
    venue: 'Hotel Melia',
    city: 'Madrid',
    ticketsSold: 0,
    ticketsTotal: 150,
    revenue: 0,
    status: 'borrador',
    category: 'Corporativo',
    categoryColor: 'bg-gray-500',
  },
];

export const companySales: CompanySale[] = [
  { id: 'cs-001', buyer: 'Carlos Martínez', email: 'carlos.m@email.com', event: 'Festival Electrónico Madrid', tickets: 2, amount: 170, date: 'Hace 5 min', status: 'completado' },
  { id: 'cs-002', buyer: 'Laura Sánchez', email: 'laura.s@email.com', event: 'Tech Summit 2024', tickets: 1, amount: 120, date: 'Hace 23 min', status: 'completado' },
  { id: 'cs-003', buyer: 'David López', email: 'david.l@email.com', event: 'Festival Electrónico Madrid', tickets: 3, amount: 255, date: 'Hace 1h', status: 'completado' },
  { id: 'cs-004', buyer: 'Ana Rodríguez', email: 'ana.r@email.com', event: 'Summer House Festival', tickets: 2, amount: 110, date: 'Hace 2h', status: 'pendiente' },
  { id: 'cs-005', buyer: 'Miguel Torres', email: 'miguel.t@email.com', event: 'Trance Evolution', tickets: 1, amount: 40, date: 'Hace 3h', status: 'reembolsado' },
  { id: 'cs-006', buyer: 'Sofía García', email: 'sofia.g@email.com', event: 'Tech Summit 2024', tickets: 2, amount: 240, date: 'Ayer', status: 'completado' },
];

export const navLinks = [
  { label: 'Explorar Eventos', href: '/descubre' },
  { label: 'Categorías', href: '/categorias' },
  { label: 'Para Empresas', href: '/empresas' },
];

export const footerLinks = {
  eventos: ['Conciertos', 'Conferencias', 'Deportes', 'Arte y Cultura'],
  empresa: ['Sobre Nosotros', 'Para Organizaciones', 'Ayuda', 'Contacto'],
};

export const footerLinksFull = {
  eventos: ['Conciertos', 'Categorías', 'Festivales', 'Calendario'],
  empresa: ['Sobre nosotros', 'Blog', 'Contacto', 'Trabaja con nosotros'],
  legal: ['Términos y condiciones', 'Política de privacidad', 'Política de cookies', 'Ayuda'],
};
