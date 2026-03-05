import { companyEvents as seedEvents, type CompanyEvent, type Event } from '../data/mock';

const STORAGE_KEY = 'eh_company_events';

const categoryColorMap: Record<string, string> = {
  Música:       'bg-violet-600',
  Conferencia:  'bg-blue-600',
  Concierto:    'bg-orange-500',
  Deportes:     'bg-green-600',
  Arte:         'bg-pink-500',
  Gastronomía:  'bg-amber-500',
  Comedia:      'bg-yellow-500',
  Jazz:         'bg-indigo-500',
  Teatro:       'bg-rose-600',
  Tecnología:   'bg-cyan-600',
  Corporativo:  'bg-gray-500',
  Otro:         'bg-gray-400',
};

export function getCategoryColor(category: string): string {
  return categoryColorMap[category] ?? 'bg-gray-400';
}

function loadEvents(): CompanyEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as CompanyEvent[];
  } catch { /* ignore */ }
  return seedEvents;
}

function persist(events: CompanyEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

// In-memory cache, initialised once from localStorage (or seed)
let _cache: CompanyEvent[] = loadEvents();

export function getEvents(): CompanyEvent[] {
  return _cache;
}

export function addEvent(event: CompanyEvent): void {
  _cache = [event, ..._cache];
  persist(_cache);
}

export function updateEvent(event: CompanyEvent): void {
  _cache = _cache.map((e) => (e.id === event.id ? event : e));
  persist(_cache);
}

/** Format a date-input value ("2024-02-15") to display label ("15 Feb 2024") */
export function formatDateLabel(isoDate: string): string {
  if (!isoDate) return '';
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const [year, month, day] = isoDate.split('-');
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

const DEFAULT_IMAGES: Record<string, string> = {
  Música:       'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop&auto=format',
  Conferencia:  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop&auto=format',
  Concierto:    'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=250&fit=crop&auto=format',
  Deportes:     'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop&auto=format',
  Arte:         'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=250&fit=crop&auto=format',
  Gastronomía:  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop&auto=format',
  Comedia:      'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=250&fit=crop&auto=format',
  Jazz:         'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=250&fit=crop&auto=format',
  Teatro:       'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=250&fit=crop&auto=format',
  Tecnología:   'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop&auto=format',
  Corporativo:  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop&auto=format',
  Otro:         'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop&auto=format',
};

/** Convert active CompanyEvents to the public Event format for listing pages */
export function getPublicEvents(): Event[] {
  return _cache
    .filter((e) => e.status === 'activo')
    .map((e) => ({
      id:            e.id,
      title:         e.title,
      category:      e.category,
      categoryColor: e.categoryColor,
      date:          e.date,
      venue:         e.venue,
      city:          e.city,
      price:         e.price ?? null,
      priceLabel:    e.price ? `Desde ${e.price}€` : 'Gratis',
      buttonLabel:   'Comprar',
      image:         e.image || DEFAULT_IMAGES[e.category] || DEFAULT_IMAGES['Otro'],
      badge:         e.category,
    }));
}
