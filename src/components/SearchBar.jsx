import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { TOOLS } from '../data/tools';

export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    setResults(
      TOOLS.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      ).slice(0, 5)
    );
  }, [query]);

  const handleSelect = (tool) => {
    navigate(`/tools/${tool.id}`);
    setQuery('');
    setFocused(false);
  };

  const clear = () => { setQuery(''); inputRef.current?.focus(); };

  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search 20+ AI tools..."
          className="input-glass w-full pl-10 pr-10 py-3 rounded-xl text-sm"
          aria-label="Search tools"
        />
        {query && (
          <button onClick={clear} className="absolute right-4 text-slate-500 hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl overflow-hidden z-50 shadow-2xl"
          >
            {results.map((tool) => (
              <button
                key={tool.id}
                onMouseDown={() => handleSelect(tool)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
              >
                <span className="text-xl">{tool.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{tool.title}</p>
                  <p className="text-xs text-slate-500 capitalize">{tool.category}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
