import {
  Music,
  PartyPopper,
  Mic,
  Trophy,
  Palette,
  UtensilsCrossed,
} from 'lucide-react';
import { categories } from '../data/mock';
import { useNavigate } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Music,
  PartyPopper,
  Mic,
  Trophy,
  Palette,
  UtensilsCrossed,
};

export default function CategoriesSection() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/descubre?categoria=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Explora por <span className="title-accent">Categorías</span>
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className="flex flex-col items-center gap-3 group cursor-pointer transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-full ${cat.bgColor} flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-active:scale-95 transition-all duration-300`}
                >
                  {Icon && <Icon size={26} className={cat.color} />}
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-violet-600 transition-colors">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
