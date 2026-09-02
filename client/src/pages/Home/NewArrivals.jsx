import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineHeart, HiHeart, HiOutlineShoppingBag, HiSparkles } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '../../features/wishlist/wishlistSlice';
import { addToCart } from '../../features/cart/cartSlice';
import { setCartDrawer } from '../../features/ui/uiSlice';
import newArrivalsBanner from '../../assets/new-arrivals-banner.jpg';

const newArrivalsData = [
  {
    _id: 'na-1',
    name: 'Organic French Linen Blazer',
    price: 6499,
    originalPrice: 7999,
    category: 'Blazers',
    gender: 'Women',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=800',
    colors: ['#D4C5B0', '#2C2C2C'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    _id: 'na-2',
    name: 'Cashmere Ribbed Turtleneck',
    price: 4299,
    originalPrice: 5499,
    category: 'Knitwear',
    gender: 'Men',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    colors: ['#A0857A', '#121110', '#EDEDEB'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    _id: 'na-3',
    name: 'Wide-Leg Tailored Trousers',
    price: 3899,
    originalPrice: 4799,
    category: 'Trousers',
    gender: 'Women',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
    colors: ['#121110', '#C3B89A'],
    sizes: ['26', '28', '30', '32'],
  },
  {
    _id: 'na-4',
    name: 'Brushed Cotton Relaxed Hoodie',
    price: 2799,
    originalPrice: 3499,
    category: 'Hoodies',
    gender: 'Men',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800',
    colors: ['#8B9E83', '#E8D5C4', '#2C2C2C'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export const LuxuryProductCard = ({ product, badge }) => {
  const dispatch = useDispatch();
  const inWishlist = useSelector(selectIsInWishlist(product._id));

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (inWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Saved to wishlist');
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        _id: `${product._id}-M`,
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.sizes?.[1] || 'M',
        color: 'Default',
        quantity: 1,
      })
    );
    toast.success(`Added to Bag`);
    dispatch(setCartDrawer(true));
  };

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product._id}`} className="group block text-left">
      <div className="relative aspect-[3/4] bg-[#F3EFE9] rounded-lg mb-5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Wishlist */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-sm ${
            inWishlist
              ? 'bg-primary text-white'
              : 'bg-white/85 hover:bg-white text-primary opacity-0 group-hover:opacity-100'
          }`}
          aria-label="Save item"
        >
          {inWishlist ? <HiHeart className="w-4 h-4" /> : <HiOutlineHeart className="w-4 h-4" />}
        </button>

        {/* Quick Add */}
        <div className="absolute bottom-0 inset-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 p-3">
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 bg-primary/95 hover:bg-primary text-white text-[11px] uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 transition-colors rounded-sm"
          >
            <HiOutlineShoppingBag className="w-3.5 h-3.5" /> Quick Add
          </button>
        </div>

        {/* Badge */}
        {badge ? (
          <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-primary text-white text-[10px] tracking-[0.12em] uppercase font-semibold rounded-sm">
            {badge}
          </span>
        ) : discountPercent > 0 ? (
          <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-primary text-white text-[10px] tracking-[0.12em] uppercase font-semibold rounded-sm">
            {discountPercent}% Off
          </span>
        ) : (
          <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] tracking-[0.12em] uppercase font-semibold rounded-sm">
            New
          </span>
        )}
      </div>

      <div className="px-1">
        <p className="text-[11px] text-[#8A8178] uppercase tracking-[0.12em] font-medium mb-1.5">
          {product.gender} · {product.category}
        </p>
        <h3 className="text-sm font-semibold text-primary group-hover:opacity-70 transition-opacity line-clamp-1 mb-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2.5">
          <span className="text-sm font-bold text-primary tabular-nums">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-[#B5ADA4] line-through tabular-nums">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

const NewArrivals = () => {
  return (
    <section className="bg-[#FAF8F5]" id="new-arrivals">
      {/* Editorial Banner Strip */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={newArrivalsBanner}
          alt="New Arrivals Season"
          className="w-full h-full object-cover object-center brightness-[0.88]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121110]/60 via-[#121110]/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] mb-4">
                <HiSparkles className="w-3 h-3" />
                Just Dropped
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.02em]">
                New Capsule
              </h2>
              <p className="text-white/70 mt-2 font-light text-sm">Fresh pieces, season-defining silhouettes.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] tracking-[0.22em] uppercase text-[#8A8178] font-medium block mb-2">
              Autumn · Winter 2026
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-primary">
              The Latest Drops
            </h3>
          </div>
          <Link
            to="/new-arrivals"
            className="text-xs uppercase tracking-[0.14em] font-semibold text-primary border-b border-primary pb-0.5 hover:opacity-60 transition-opacity"
          >
            View All New Arrivals →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {newArrivalsData.map((prod) => (
            <motion.div
              key={prod._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <LuxuryProductCard product={prod} badge="New In" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
