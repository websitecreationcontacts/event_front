import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = {
  eventos: [
    { label: 'Conciertos', to: '/descubre' },
    { label: 'Categorías', to: '/categorias' },
    { label: 'Festivales', to: '/descubre' },
    { label: 'Calendario', to: '/calendario' },
  ],
  empresa: [
    { label: 'Sobre nosotros', to: '/sobre-nosotros' },
    { label: 'Blog', to: '#' },
    { label: 'Contacto', to: '/contacto' },
    { label: 'Trabaja con nosotros', to: '/trabaja' },
  ],
  legal: [
    { label: 'Términos y condiciones', to: '/terminos' },
    { label: 'Política de privacidad', to: '/privacidad' },
    { label: 'Política de cookies', to: '/cookies' },
    { label: 'Ayuda', to: '/contacto' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-14 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="text-white font-bold text-lg mb-3 block">EventHub</Link>
            <p className="text-sm leading-relaxed mb-4">
              La plataforma líder para descubrir y comprar tickets de eventos.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-violet-600 flex items-center justify-center transition-colors"
                >
                  <Icon size={15} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Eventos */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Eventos</h4>
            <ul className="space-y-2.5">
              {links.eventos.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              {links.empresa.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2024 EventHub. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <Link to="/terminos" className="hover:text-white transition-colors">Términos</Link>
            <Link to="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
