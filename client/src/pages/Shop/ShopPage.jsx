import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineAdjustments, HiOutlineShoppingBag, HiOutlineX, HiSparkles } from 'react-icons/hi';
import { HiOutlineFire } from 'react-icons/hi';
import api from '../../services/api';
import { LuxuryProductCard } from '../Home/NewArrivals';
import newArrivalsBanner from '../../assets/new-arrivals-banner.jpg';
import trendingBanner from '../../assets/trending-banner.jpg';

const SORT_OPTIONS = [
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Client Favorites', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Trending Silhouettes', value: 'trending' },
];

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const GENDER_OPTIONS = ['men', 'women'];

const newArrivalsCatalog = [
  {
    _id: 'na-1',
    name: 'Organic French Linen Blazer',
    price: 6499,
    originalPrice: 7999,
    category: 'Blazers',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M', 'L'],
    badge: 'New In',
  },
  {
    _id: 'na-2',
    name: 'Cashmere Ribbed Turtleneck',
    price: 4299,
    originalPrice: 5499,
    category: 'Knitwear',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'New In',
  },
  {
    _id: 'na-3',
    name: 'Wide-Leg Tailored Trousers',
    price: 3899,
    originalPrice: 4799,
    category: 'Trousers',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
    sizes: ['26', '28', '30', '32'],
    badge: 'New In',
  },
  {
    _id: 'na-4',
    name: 'Brushed Cotton Relaxed Hoodie',
    price: 2799,
    originalPrice: 3499,
    category: 'Hoodies',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'New In',
  },
  {
    _id: 'na-5',
    name: 'Minimalist Twill Shacket',
    price: 4999,
    originalPrice: 5999,
    category: 'Jackets',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800',
    sizes: ['M', 'L', 'XL'],
    badge: 'New In',
  },
  {
    _id: 'na-6',
    name: 'Asymmetrical Draped Linen Midi',
    price: 5299,
    originalPrice: 6499,
    category: 'Dresses',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M'],
    badge: 'New In',
  },
  {
    _id: 'na-7',
    name: 'Silk Fluid Oversized Shirt',
    price: 3599,
    originalPrice: 4299,
    category: 'Shirts',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L'],
    badge: 'New In',
  },
  {
    _id: 'na-8',
    name: 'Streetwear Carpenter Baggy Denim',
    price: 3299,
    originalPrice: 3999,
    category: 'Jeans',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
    sizes: ['28', '30', '32', '34'],
    badge: 'New In',
  },
];

const trendingCatalog = [
  {
    _id: 'tr-1',
    name: 'Structured Utility Overcoat',
    price: 7499,
    originalPrice: 8999,
    category: 'Coats',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: '#1 Trending',
  },
  {
    _id: 'tr-2',
    name: 'Draped Satin Slip Dress',
    price: 4599,
    originalPrice: 5799,
    category: 'Dresses',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M', 'L'],
    badge: '#2 Trending',
  },
  {
    _id: 'tr-3',
    name: 'Japanese Selvedge Dark Straight Jeans',
    price: 3699,
    originalPrice: 4499,
    category: 'Jeans',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
    sizes: ['28', '30', '32', '34'],
    badge: '#3 Trending',
  },
  {
    _id: 'tr-4',
    name: 'Merino Wool Turtleneck',
    price: 3999,
    originalPrice: 4999,
    category: 'Knitwear',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M', 'L'],
    badge: '#4 Trending',
  },
  {
    _id: 'tr-5',
    name: '240 GSM Heavyweight Boxy Tee',
    price: 1899,
    originalPrice: 2299,
    category: 'T-Shirts',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: '#5 Trending',
  },
  {
    _id: 'tr-6',
    name: 'Pleated High-Waist Fluid Trousers',
    price: 3799,
    originalPrice: 4599,
    category: 'Trousers',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
    sizes: ['26', '28', '30', '32'],
    badge: '#6 Trending',
  },
  {
    _id: 'tr-7',
    name: 'French Terry Relaxed Zip Hoodie',
    price: 3499,
    originalPrice: 4299,
    category: 'Hoodies',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: '#7 Trending',
  },
  {
    _id: 'tr-8',
    name: 'Structured Double-Breasted Blazer',
    price: 5499,
    originalPrice: 6999,
    category: 'Jackets',
    gender: 'Women',
    image: '/products/tailored-double-breasted-blazer.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    badge: '#8 Trending',
  },
];

const allProductsCatalog = [
  ...newArrivalsCatalog.slice(0, 4),
  ...trendingCatalog.slice(0, 4),
  {
    _id: 'cat-9',
    name: 'Pure European Linen Spread Shirt',
    price: 2499,
    originalPrice: 2999,
    category: 'Shirts',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    _id: 'cat-10',
    name: 'High-Rise Vintage Wide Leg Jeans',
    price: 3299,
    originalPrice: 3899,
    category: 'Jeans',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=800',
    sizes: ['26', '28', '30', '32'],
  },
  {
    _id: 'cat-11',
    name: 'Tailored Minimalist Utility Jacket',
    price: 4999,
    originalPrice: 5999,
    category: 'Jackets',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    _id: 'cat-12',
    name: 'Modal-Blend Fluid V-Neck Tee',
    price: 1199,
    originalPrice: 1599,
    category: 'T-Shirts',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M', 'L'],
  },
];

const ShopPage = ({ filter: pageFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    gender: searchParams.get('gender') || '',
    category: searchParams.get('category') || '',
    size: searchParams.get('size') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  const getBaseDataset = useCallback(() => {
    if (pageFilter === 'new-arrivals') return newArrivalsCatalog;
    if (pageFilter === 'trending') return trendingCatalog;
    return allProductsCatalog;
  }, [pageFilter]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', searchParams.get('page') || '1');
      params.set('limit', '12');

      if (filters.sort) params.set('sort', filters.sort);
      if (filters.gender) params.set('gender', filters.gender);
      if (filters.size) params.set('size', filters.size);
      if (filters.minPrice) params.set('minPrice', filters.minPrice);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);

      if (pageFilter === 'new-arrivals') params.set('newArrival', 'true');
      if (pageFilter === 'trending') params.set('trending', 'true');

      const { data } = await api.get(`/products?${params.toString()}`);
      if (data.data && data.data.length > 0) {
        setProducts(data.data);
        setPagination(data.pagination);
      } else {
        // Filter the specific catalog based on selected filters
        let filtered = getBaseDataset();
        if (filters.gender) {
          filtered = filtered.filter((p) => p.gender.toLowerCase() === filters.gender.toLowerCase());
        }
        if (filters.minPrice) {
          filtered = filtered.filter((p) => p.price >= Number(filters.minPrice));
        }
        if (filters.maxPrice) {
          filtered = filtered.filter((p) => p.price <= Number(filters.maxPrice));
        }
        if (filters.sort === 'price-asc') {
          filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'price-desc') {
          filtered = [...filtered].sort((a, b) => b.price - a.price);
        }
        setProducts(filtered);
      }
    } catch {
      let filtered = getBaseDataset();
      if (filters.gender) {
        filtered = filtered.filter((p) => p.gender.toLowerCase() === filters.gender.toLowerCase());
      }
      if (filters.minPrice) {
        filtered = filtered.filter((p) => p.price >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        filtered = filtered.filter((p) => p.price <= Number(filters.maxPrice));
      }
      if (filters.sort === 'price-asc') {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
      } else if (filters.sort === 'price-desc') {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
      }
      setProducts(filtered);
    } finally {
      setIsLoading(false);
    }
  }, [filters, searchParams, pageFilter, getBaseDataset]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ gender: '', category: '', size: '', minPrice: '', maxPrice: '', sort: 'newest' });
  };

  const pageConfig = {
    'new-arrivals': {
      title: 'New Arrivals',
      subtitle: 'Fresh Season Drops',
      copy: 'The latest pieces — just arrived from our atelier. Limited quantities, curated intentionally.',
      bg: 'bg-[#FAF8F5]',
      headerBg: 'bg-[#F3EFE9]',
      textColor: 'text-primary',
      bannerImage: newArrivalsBanner,
      bannerOverlay: 'from-[#121110]/55 via-[#121110]/20 to-transparent',
      icon: <HiSparkles className="w-3.5 h-3.5 text-amber-500" />,
      badge: 'Just Dropped',
    },
    'trending': {
      title: 'Trending Now',
      subtitle: 'Most Desired',
      copy: 'The silhouettes, textures, and pieces the world is wearing right now — curated for you.',
      bg: 'bg-[#121110]',
      headerBg: 'bg-[#121110]',
      textColor: 'text-white',
      bannerImage: trendingBanner,
      bannerOverlay: 'from-[#121110]/80 via-[#121110]/40 to-transparent',
      icon: <HiOutlineFire className="w-3.5 h-3.5 text-orange-400" />,
      badge: 'Trending',
    },
    default: {
      title: 'The Full Collection',
      subtitle: 'Atelier Lookbook',
      copy: 'Every piece, every season — the complete TIMELESS TRENDS garment catalog.',
      bg: 'bg-white',
      headerBg: 'bg-white',
      textColor: 'text-primary',
      bannerImage: null,
      bannerOverlay: '',
      icon: null,
      badge: null,
    },
  };

  const config = pageConfig[pageFilter] || pageConfig.default;
  const isDark = pageFilter === 'trending';

  return (
    <>
      <Helmet>
        <title>{`${config.title} — TIMELESS TRENDS Atelier`}</title>
      </Helmet>

      {/* Unique Page Header per filter */}
      {config.bannerImage ? (
        <div className={`relative h-64 sm:h-72 overflow-hidden ${isDark ? 'bg-[#121110]' : 'bg-[#FAF8F5]'}`}>
          <img
            src={config.bannerImage}
            alt={config.title}
            className={`w-full h-full object-cover object-center ${ isDark ? 'brightness-[0.55]' : 'brightness-[0.85]'}`}
            loading="eager"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${config.bannerOverlay}`} />
          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] uppercase tracking-[0.2em] mb-4">
                {config.icon}
                {config.badge}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.02em]">
                {config.title}
              </h1>
              <p className="text-white/65 mt-3 font-light text-sm max-w-md">{config.copy}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-b border-[#E6DFD5] py-16 lg:py-20">
          <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A8178] font-medium block mb-3">
              {config.subtitle}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary tracking-[-0.02em] mb-4">
              {config.title}
            </h1>
            <p className="text-sm text-[#8A8178] max-w-md leading-relaxed">{config.copy}</p>
          </div>
        </div>
      )}

      <div className={`w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 py-12 lg:py-20 ${isDark ? 'bg-[#121110]' : ''}`}>
        {/* Toolbar Bar */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-border-light">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-xs uppercase tracking-[0.12em] font-semibold text-text-primary hover:border-primary transition-all rounded shadow-2xs"
          >
            <HiOutlineAdjustments className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Refine Selection'}
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-muted hidden sm:inline uppercase tracking-wider">Sort by:</span>
            <select
              value={filters.sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-white border border-border px-3.5 py-2 text-xs rounded uppercase font-semibold tracking-wider focus:outline-none focus:border-primary cursor-pointer shadow-2xs"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-10 items-start">
          {/* Collapsible Refine Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                className="w-64 shrink-0 bg-white p-6 rounded-lg border border-border-light shadow-2xs space-y-8 sticky top-24"
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 256 }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <h4 className="text-[11px] tracking-[0.16em] uppercase font-bold text-text-primary mb-4">
                    Demographic
                  </h4>
                  <div className="space-y-2">
                    {GENDER_OPTIONS.map((g) => (
                      <label key={g} className="flex items-center gap-2.5 cursor-pointer text-xs capitalize text-text-secondary hover:text-primary">
                        <input
                          type="radio"
                          name="gender"
                          checked={filters.gender === g}
                          onChange={() => updateFilter('gender', filters.gender === g ? '' : g)}
                          className="w-3.5 h-3.5 accent-primary"
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] tracking-[0.16em] uppercase font-bold text-text-primary mb-4">
                    Size
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZE_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateFilter('size', filters.size === s ? '' : s)}
                        className={`py-2 text-[11px] font-semibold border rounded transition-all ${
                          filters.size === s
                            ? 'bg-primary text-text-inverse border-primary'
                            : 'border-border text-text-primary hover:border-primary bg-bg-secondary/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] tracking-[0.16em] uppercase font-bold text-text-primary mb-4">
                    Price Range (₹)
                  </h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                      className="w-full px-2.5 py-2 border border-border text-xs rounded focus:outline-none focus:border-primary"
                    />
                    <span className="text-text-muted">—</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      className="w-full px-2.5 py-2 border border-border text-xs rounded focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-[11px] uppercase tracking-wider text-text-muted hover:text-primary font-semibold border border-dashed border-border rounded"
                >
                  Clear All Filters
                </button>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(8).fill(null).map((_, i) => (
                  <div key={i}>
                    <div className="aspect-[3/4] skeleton rounded-lg mb-3" />
                    <div className="h-4 skeleton w-3/4 mb-2" />
                    <div className="h-4 skeleton w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white border border-border-light rounded-xl p-8">
                <HiOutlineShoppingBag className="w-10 h-10 text-text-muted mx-auto mb-3" />
                <h3 className="font-serif text-xl mb-2">No Matching Garments</h3>
                <p className="text-xs text-text-secondary mb-6">Try broadening your price or sizing filters.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-primary text-text-inverse text-xs uppercase tracking-wider font-semibold rounded"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <LuxuryProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
