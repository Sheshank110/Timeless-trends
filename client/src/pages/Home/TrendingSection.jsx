import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineFire, HiArrowRight } from 'react-icons/hi';
import { LuxuryProductCard } from './NewArrivals';
import trendingBanner from '../../assets/trending-banner.jpg';

const trendingData = [
  {
    _id: 'tr-1',
    name: 'Structured Utility Overcoat',
    price: 7499,
    originalPrice: 8999,
    category: 'Coats',
    gender: 'Men',
    rank: 1,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    _id: 'tr-2',
    name: 'Draped Satin Slip Dress',
    price: 4599,
    originalPrice: 5799,
    category: 'Dresses',
    gender: 'Women',
    rank: 2,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    _id: 'tr-3',
    name: 'Cargo Wide-Leg Denim',
    price: 3699,
    originalPrice: 4499,
    category: 'Jeans',
    gender: 'Men',
    rank: 3,
    image: 'https://images.unsplash.com/photo-1475180429745-7f65a36fff01?auto=format&fit=crop&q=80&w=800',
    sizes: ['28', '30', '32', '34'],
  },
  {
    _id: 'tr-4',
    name: 'Merino Wool Turtleneck',
    price: 3999,
    originalPrice: 4999,
    category: 'Knitwear',
    gender: 'Women',
    rank: 4,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M', 'L'],
  },
];

const TrendingSection = () => {
  return (
    <section className="bg-[#121110]" id="trending">
      {/* Dark Editorial Banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={trendingBanner}
          alt="Trending Now"
          className="w-full h-full object-cover object-top brightness-[0.55]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121110]/80 via-[#121110]/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] uppercase tracking-[0.2em] mb-4">
                <HiOutlineFire className="w-3 h-3 text-orange-400" />
                Most Desired
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.02em]">
                Trending Now
              </h2>
              <p className="text-white/60 mt-2 font-light text-sm">What the world's wearing this season.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] tracking-[0.22em] uppercase text-white/40 font-medium block mb-2">
              Community Picks
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Trending Silhouettes
            </h3>
          </div>
          <Link
            to="/trending"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-white/70 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-all"
          >
            View All Trending <HiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Trending rank badges + cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trendingData.map((prod, idx) => (
            <motion.div
              key={prod._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true, margin: '-50px' }}
              className="relative"
            >
              {/* Rank indicator */}
              <div className="absolute -top-3 -left-2 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-[10px] font-bold text-white/80 tabular-nums">#{idx + 1}</span>
              </div>
              {/* Use white-themed card on dark bg */}
              <div className="rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-colors p-3">
                <Link to={`/product/${prod._id}`} className="group block text-left">
                  <div className="relative aspect-[3/4] bg-white/5 rounded-md mb-4 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <button className="w-full py-2.5 bg-white text-primary text-[11px] uppercase tracking-[0.14em] font-semibold rounded-sm">
                        Quick Add
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-white/40 uppercase tracking-[0.12em] font-medium mb-1.5">
                    {prod.gender} · {prod.category}
                  </p>
                  <h3 className="text-sm font-semibold text-white group-hover:text-white/70 transition-opacity line-clamp-1 mb-2">
                    {prod.name}
                  </h3>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-sm font-bold text-white tabular-nums">
                      ₹{prod.price.toLocaleString()}
                    </span>
                    {prod.originalPrice && prod.originalPrice > prod.price && (
                      <span className="text-xs text-white/35 line-through tabular-nums">
                        ₹{prod.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
