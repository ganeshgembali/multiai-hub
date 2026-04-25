import { useState } from 'react';
import { motion } from 'framer-motion';
import { TOOLS, CATEGORIES } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SearchBar from '../components/SearchBar';

function EmptyState({ query }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="text-white font-semibold text-lg mb-2">No tools found</h3>
      <p className="text-slate-500 text-sm">
        No results for "<span className="text-slate-300">{query}</span>" — try a different keyword.
      </p>
    </div>
  );
}

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery]       = useState('');
  const [favorites, setFavorites]           = useState(() => {
    try { return JSON.parse(localStorage.getItem('mah_favorites')) || []; }
    catch { return []; }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('mah_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const filtered = TOOLS.filter((t) => {
    const matchCat  = activeCategory === 'all' || t.category === activeCategory;
    const matchFav  = !showFavoritesOnly || favorites.includes(t.id);
    const q         = searchQuery.toLowerCase();
    const matchQ    = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    return matchCat && matchFav && matchQ;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            AI Tool <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Explore and launch 20+ AI-powered tools across 5 categories.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-8">
          <SearchBar />
          {/* Inline search state for filter */}
          <input
            type="text"
            className="sr-only"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="relative mt-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tools in grid..."
              className="input-glass w-full pl-4 pr-4 py-2.5 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`pill ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`pill ${showFavoritesOnly ? 'active' : ''}`}
          >
            <span>❤️</span> Favorites
            {favorites.length > 0 && (
              <span className="ml-1 bg-violet-500/30 text-violet-300 text-xs px-1.5 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.length > 0 ? (
            filtered.map((tool, i) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={i}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <EmptyState query={searchQuery} />
          )}
        </div>

        {/* Result count */}
        <p className="text-center text-slate-600 text-xs mt-6">
          Showing {filtered.length} of {TOOLS.length} tools
        </p>
      </div>
    </div>
  );
}
