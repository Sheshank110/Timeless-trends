import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { HiOutlineX, HiOutlineSearch, HiOutlineClock, HiOutlineTrendingUp } from 'react-icons/hi';
import { setSearch } from '../../features/ui/uiSlice';

const popularSearches = ['Shirts', 'T-Shirts', 'Jeans', 'Trousers', 'Hoodies', 'Jackets'];

const SearchOverlay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [recentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tt-recent-searches') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSearch = (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    // Save to recent searches
    const updated = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    localStorage.setItem('tt-recent-searches', JSON.stringify(updated));

    dispatch(setSearch(false));
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') dispatch(setSearch(false));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[400] bg-[#FAF8F5]/98 backdrop-blur-md flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full max-w-2xl px-6 pt-24 sm:pt-28 pb-12 relative">
        {/* Close button */}
        <button
          className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2.5 rounded-full hover:bg-black/5 text-primary hover:text-text-secondary transition-colors"
          onClick={() => dispatch(setSearch(false))}
          aria-label="Close search"
        >
          <HiOutlineX className="w-6 h-6" />
        </button>

        {/* Search Input */}
        <motion.div
          className="relative flex items-center border-b-2 border-primary pb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <HiOutlineSearch className="w-6 h-6 text-text-muted shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search silhouettes, jackets, tees..."
            className="w-full py-2 text-xl sm:text-2xl font-serif text-primary bg-transparent focus:outline-none placeholder:text-text-muted/60"
            id="search-input"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-text-muted hover:text-primary transition-colors shrink-0"
              aria-label="Clear search"
            >
              <HiOutlineX className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !query && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineClock className="w-4 h-4 text-text-muted" />
              <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted font-medium">
                Recent Inquiries
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className="px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] bg-white border border-border rounded-full hover:bg-primary hover:text-white transition-all shadow-2xs"
                >
                  {search}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Popular Searches */}
        {!query && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineTrendingUp className="w-4 h-4 text-text-muted" />
              <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted font-medium">
                Popular Searches
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className="px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] bg-white border border-border rounded-full hover:bg-primary hover:text-white transition-all shadow-2xs"
                >
                  {search}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchOverlay;
