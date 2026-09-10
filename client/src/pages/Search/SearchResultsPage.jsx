import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineSparkles, HiOutlineFilter } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { addToCart } from '../../features/cart/cartSlice';
import { setCartDrawer } from '../../features/ui/uiSlice';

import { allProducts } from '../../data/products';

// Comprehensive catalog for instant zero-latency search & offline resilience
const comprehensiveSearchCatalog = allProducts;

// Stemming helper for query matching
const getSearchVariants = (term) => {
  if (!term) return [];
  const clean = term.trim().toLowerCase();
  const set = new Set([clean]);

  if (clean.endsWith('ies')) set.add(clean.slice(0, -3) + 'y');
  if (clean.endsWith('es')) set.add(clean.slice(0, -2));
  if (clean.endsWith('s')) set.add(clean.slice(0, -1));

  set.add(clean + 's');
  set.add(clean + 'es');

  // Common fashion mappings
  if (clean.includes('shirt')) set.add('shirt');
  if (clean.includes('tee') || clean.includes('t-shirt') || clean.includes('tshirt')) {
    set.add('tee');
    set.add('t-shirt');
    set.add('tshirt');
  }
  if (clean.includes('jean') || clean.includes('denim')) {
    set.add('jean');
    set.add('denim');
  }
  if (clean.includes('pant') || clean.includes('trouser')) {
    set.add('pant');
    set.add('trouser');
    set.add('slacks');
  }

  return Array.from(set);
};

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setSearchInput(query);

    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      // 1. First attempt backend API
      try {
        const res = await api.get(`/products?search=${encodeURIComponent(query.trim())}`);
        const apiProducts = res.data?.data;

        if (Array.isArray(apiProducts) && apiProducts.length > 0) {
          // Format API items to guarantee image URLs
          const formatted = apiProducts.map((p) => ({
            ...p,
            image: p.images?.[0]?.url || p.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
            category: p.category?.name || p.categoryName || p.category || 'Exclusive',
          }));
          setProducts(formatted);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API search fell back to client catalog:', err.message);
      }

      // 2. Client-side intelligent stemming search fallback
      const searchTerms = getSearchVariants(query);
      const matches = comprehensiveSearchCatalog.filter((item) => {
        const text = `${item.name} ${item.description} ${item.category} ${item.gender} ${(item.tags || []).join(' ')}`.toLowerCase();
        return searchTerms.some((term) => text.includes(term));
      });

      setProducts(matches);
      setIsLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const handleQuickAdd = (prod, e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        _id: `${prod._id}-${prod.sizes?.[0] || 'M'}`,
        product: prod._id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        size: prod.sizes?.[0] || 'M',
        color: 'Standard',
        quantity: 1,
      })
    );

    toast.success(`Added ${prod.name} to bag`);
    dispatch(setCartDrawer(true));
  };

  // Filter by gender if selected
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter((p) => (p.gender || '').toLowerCase() === activeFilter);
  }, [products, activeFilter]);

  return (
    <>
      <Helmet>
        <title>{query ? `Search: "${query}" — TIMELESS TRENDS` : 'Search Atelier — TIMELESS TRENDS'}</title>
      </Helmet>

      <div className="min-h-screen bg-[#FAF8F5] py-12">
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-20">
          {/* Search Header */}
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-text-muted block mb-2">
              Atelier Search Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
              Search Results
            </h1>

            <form onSubmit={handleSearchSubmit} className="relative flex items-center mt-6 shadow-xs rounded-xl overflow-hidden bg-white border border-border/90">
              <HiOutlineSearch className="absolute left-4 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search shirts, tees, jeans, trousers, jackets..."
                className="w-full pl-12 pr-28 py-3.5 sm:py-4 text-sm font-sans text-primary bg-transparent focus:outline-none placeholder:text-text-muted/60"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-6 py-2.5 sm:py-3 bg-primary text-white text-xs uppercase tracking-[0.14em] font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                Search
              </button>
            </form>

            {query && (
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-text-muted font-light">
                <span>Displaying matching pieces for:</span>
                <span className="font-serif font-semibold text-primary text-sm">"{query}"</span>
                <span className="text-[11px] bg-white px-2 py-0.5 rounded-full border border-border font-medium">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                </span>
              </div>
            )}
          </div>

          {/* Quick Gender Filter Pills */}
          {products.length > 0 && (
            <div className="flex items-center justify-between border-b border-border/70 pb-4 mb-8">
              <div className="flex items-center gap-2">
                {['all', 'men', 'women'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setActiveFilter(gender)}
                    className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.12em] font-semibold transition-all ${
                      activeFilter === gender
                        ? 'bg-primary text-white shadow-2xs'
                        : 'bg-white text-text-secondary border border-border hover:border-primary'
                    }`}
                  >
                    {gender === 'all' ? 'All Silhouettes' : gender}
                  </button>
                ))}
              </div>

              <Link
                to="/customize"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 font-medium uppercase tracking-wider"
              >
                <HiOutlineSparkles className="w-4 h-4" />
                <span>Can't find your cut? Customize it</span>
              </Link>
            </div>
          )}

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(8).fill(null).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-border/80 animate-pulse">
                  <div className="aspect-[3/4] bg-[#EAE4D7] rounded-lg mb-3" />
                  <div className="h-4 bg-[#EAE4D7] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#EAE4D7] rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-border/80 rounded-2xl p-8 max-w-xl mx-auto shadow-2xs">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-border flex items-center justify-center mx-auto mb-4 text-primary">
                <HiOutlineShoppingBag className="w-7 h-7 text-text-muted" />
              </div>
              <h2 className="font-serif text-2xl mb-2 text-primary">No matching garments found</h2>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">
                We couldn't locate any pieces matching "{query}". Try browsing our popular sartorial categories or design your custom garment from scratch.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {['Shirts', 'Linen Shirt', 'T-Shirts', 'Jeans', 'Trousers', 'Hoodies'].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setSearchInput(keyword);
                      setSearchParams({ q: keyword });
                    }}
                    className="px-3.5 py-1.5 text-xs font-medium bg-[#FAF8F5] border border-border rounded-full hover:bg-primary hover:text-white transition-all uppercase tracking-wider"
                  >
                    {keyword}
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-border">
                <Link
                  to="/customize"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-lg hover:bg-primary-light transition-all shadow-sm"
                >
                  <HiOutlineSparkles className="w-4 h-4 text-amber-300" />
                  <span>Customize Your Own Garment</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((prod, idx) => (
                <motion.div
                  key={prod._id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="group bg-white border border-border/80 hover:border-primary/40 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Box */}
                    <Link
                      to={`/product/${prod.slug || prod._id}`}
                      state={{ product: prod }}
                      className="aspect-[3/4] bg-[#F5F2EC] block overflow-hidden relative"
                    >
                      <img
                        src={prod.images?.[0]?.url || prod.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />

                      {/* Badge */}
                      {prod.badge && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-white/90 text-primary border border-border shadow-2xs">
                          {prod.badge}
                        </span>
                      )}

                      {/* Quick Add overlay button */}
                      <button
                        onClick={(e) => handleQuickAdd(prod, e)}
                        className="absolute bottom-3 right-3 p-2.5 rounded-full bg-primary text-white shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 hover:scale-110"
                        title="Quick add to bag"
                      >
                        <HiOutlineShoppingBag className="w-4 h-4" />
                      </button>
                    </Link>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <p className="text-[10px] text-text-muted uppercase tracking-[0.16em] font-semibold mb-1">
                        {prod.gender} · {prod.category?.name || prod.category}
                      </p>
                      <Link to={`/product/${prod.slug || prod._id}`} state={{ product: prod }}>
                        <h3 className="font-serif text-sm sm:text-base font-medium text-primary group-hover:text-primary-light transition-colors line-clamp-1">
                          {prod.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#7A7065] font-light line-clamp-2 mt-1 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-base sm:text-lg font-semibold text-primary">
                        ₹{prod.price?.toLocaleString('en-IN')}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-text-muted line-through font-light">
                          ₹{prod.originalPrice?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/product/${prod.slug || prod._id}`}
                      state={{ product: prod }}
                      className="text-[11px] uppercase tracking-wider font-semibold text-primary group-hover:translate-x-1 transition-transform"
                    >
                      View →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResultsPage;
