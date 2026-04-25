import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

const CATEGORY_COLORS = {
  career:       'from-violet-600 to-purple-700',
  coding:       'from-blue-600 to-cyan-600',
  study:        'from-emerald-600 to-teal-600',
  writing:      'from-pink-600 to-rose-600',
  productivity: 'from-amber-600 to-orange-600',
};

export default function ToolCard({ tool, isFavorite, onToggleFavorite, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative glass rounded-2xl p-5 card-hover cursor-pointer flex flex-col gap-4 border border-transparent"
      onClick={() => navigate(`/tools/${tool.id}`)}
    >
      {/* Badge */}
      {tool.badge && (
        <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
          {tool.badge}
        </span>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient || CATEGORY_COLORS[tool.category]} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {tool.icon}
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-semibold text-white text-base mb-1.5 group-hover:text-violet-300 transition-colors">
          {tool.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/tools/${tool.id}`); }}
          className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors group/btn"
        >
          Open Tool
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(tool.id); }}
          className={`p-1.5 rounded-lg transition-all ${isFavorite ? 'text-pink-400' : 'text-slate-600 hover:text-pink-400'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
}
