import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export interface LegalSection {
  title: string;
  content: string[];
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  toc: { label: string; anchor: string }[];
}

export default function LegalLayout({ title, lastUpdated, intro, sections, toc }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar transparent={false} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-violet-700 to-purple-600 px-8 py-14">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-white/60 text-xs mb-4">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={13} />
            <span className="text-white">{title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{title}</h1>
          <p className="text-white/65 text-sm">Última actualización: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 px-8 flex-1">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

          {/* TOC sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                Contenido
              </h3>
              <nav className="space-y-1">
                {toc.map((item) => (
                  <a
                    key={item.anchor}
                    href={`#${item.anchor}`}
                    className="block text-sm text-gray-600 hover:text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
              <p className="text-gray-600 text-sm leading-relaxed mb-10 pb-8 border-b border-gray-100">
                {intro}
              </p>

              <div className="space-y-10">
                {sections.map((section, i) => (
                  <div key={section.title} id={toc[i]?.anchor}>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-violet-100 text-violet-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      {section.title}
                    </h2>
                    <div className="space-y-3 pl-9">
                      {section.content.map((para, j) => (
                        <p key={j} className="text-gray-600 text-sm leading-relaxed">{para}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                  ¿Tienes preguntas sobre este documento?{' '}
                  <Link to="/contacto" className="text-violet-600 hover:underline font-medium">
                    Contáctanos
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
