import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi';
import api from '../../services/api';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
    const searchProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await api.get(`/products?search=${encodeURIComponent(query.trim())}`);
        setProducts(data.data || []);
      } catch (err) {
        console.error('Search failed:', err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchProducts();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <>
      <Helmet>
        <title>{query ? `Search: "${query}" — TIMELESS TRENDS` : 'Search — TIMELESS TRENDS'}</title>
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl mb-4 tracking-[0.04em]">Search Results</h1>
          <form onSubmit={handleSearchSubmit} className="relative flex items-center mt-6">
            <HiOutlineSearch className="absolute left-4 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products, styles, collections..."
              className="w-full pl-12 pr-28 py-3.5 border border-border focus:outline-none focus:border-primary text-sm bg-transparent"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-5 py-2.5 bg-primary text-text-inverse text-xs tracking-[0.1em] uppercase font-medium hover:bg-primary-light transition-colors"
            >
              Search
            </button>
          </form>

          {query && (
            <p className="text-xs text-text-muted uppercase tracking-[0.15em] mt-4">
              Showing results for: <span className="text-primary font-medium">"{query}"</span>
            </p>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array(8).fill(null).map((_, i) => (
              <div key={i}>
                <div className="aspect-[3/4] skeleton mb-3" />
                <div className="h-4 skeleton w-3/4 mb-2" />
                <div className="h-4 skeleton w-1/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-4">
              <HiOutlineShoppingBag className="w-6 h-6 text-text-muted" />
            </div>
            <h3 className="font-serif text-xl mb-2">No matching products found</h3>
            <p className="text-sm text-text-secondary mb-6">
              Try searching with different keywords or explore our curated categories.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Oversized Tee', 'Linen Shirt', 'Straight Jeans', 'Jackets', 'Hoodies'].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    setSearchInput(keyword);
                    setSearchParams({ q: keyword });
                  }}
                  className="px-4 py-2 text-xs border border-border hover:border-primary transition-colors uppercase tracking-[0.05em]"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((prod, idx) => (
              <motion.div
                key={prod._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Link to={`/product/${prod.slug || prod._id}`} className="group block">
                  <div className="aspect-[3/4] bg-bg-secondary mb-3 overflow-hidden relative">
                    {prod.images?.[0]?.url ? (
                      <img
                        src={prod.images[0].url}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-light font-serif text-xl">
                        {prod.name}
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-text-muted uppercase tracking-[0.08em] mb-1">
                    {prod.gender} · {prod.category?.name || 'Exclusive'}
                  </p>
                  <h3 className="text-sm font-medium text-primary group-hover:text-text-secondary transition-colors truncate">
                    {prod.name}
                  </h3>
                  <p className="text-sm font-medium mt-1 text-primary">₹{prod.price?.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResultsPage;
