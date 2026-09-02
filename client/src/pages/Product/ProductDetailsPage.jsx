import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineShoppingBag,
  HiStar,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineShieldCheck,
  HiMinus,
  HiPlus,
  HiOutlineShare,
  HiChevronDown,
  HiOutlineSparkles,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { addToCart } from '../../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '../../features/wishlist/wishlistSlice';
import { setCartDrawer } from '../../features/ui/uiSlice';

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('details');

  const inWishlist = useSelector((state) => (product ? selectIsInWishlist(product._id)(state) : false));

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/products/${slug}`);
        const prod = data.data;
        setProduct(prod);
        if (prod.sizes && prod.sizes.length > 0) setSelectedSize(prod.sizes[0]);
        if (prod.colors && prod.colors.length > 0) setSelectedColor(prod.colors[0]);

        const relatedRes = await api.get(`/products/${prod._id}/related`);
        setRelatedProducts(relatedRes.data.data || []);
      } catch (error) {
        console.error('Error loading product:', error);
        // Fallback realistic luxury garment
        const fallback = {
          _id: slug || 'prod-1',
          name: 'Essential Oversized Organic Cotton Tee',
          slug: 'essential-oversized-cotton-tee',
          price: 1499,
          originalPrice: 1999,
          description: 'A structural silhouette tailored from 240 GSM organic combed cotton. Features dropped shoulder geometry, a wide double-needle hemmed sleeve, and an elevated ribbed collar engineered to maintain shape across countless seasons.',
          gender: 'men',
          category: { name: 'T-Shirts', slug: 't-shirts' },
          sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          colors: [
            { name: 'Onyx Black', hex: '#111111' },
            { name: 'Pure White', hex: '#FFFFFF' },
            { name: 'Warm Taupe', hex: '#D8C8B8' },
            { name: 'Sage Green', hex: '#9EAA94' },
          ],
          images: [
            { url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000', alt: 'Editorial studio front' },
            { url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000', alt: 'Side profile' },
            { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000', alt: 'Textile macro detail' },
          ],
          stock: 45,
          material: '100% GOTS-Certified Organic Combed Cotton (240 GSM)',
          careInstructions: 'Gentle machine wash in cold water with neutral eco-detergents. Do not bleach. Dry flat in natural shade to preserve organic cotton fiber integrity.',
          fit: 'oversized',
          rating: { average: 4.9, count: 52 },
          isNewArrival: true,
          isTrending: true,
        };
        setProduct(fallback);
        setSelectedSize(fallback.sizes[0]);
        setSelectedColor(fallback.colors[0]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const item = {
      _id: `${product._id}-${selectedSize}-${selectedColor?.name || 'default'}`,
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || '',
      size: selectedSize,
      color: selectedColor?.name || '',
      quantity,
      stock: product.stock,
    };

    dispatch(addToCart(item));
    toast.success(`Added ${product.name} (${selectedSize}) to Bag`);
    dispatch(setCartDrawer(true));
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    if (inWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Saved to wishlist');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 aspect-[3/4] skeleton rounded-lg" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-4 skeleton w-1/4" />
            <div className="h-8 skeleton w-3/4" />
            <div className="h-6 skeleton w-1/3" />
            <div className="h-28 skeleton w-full" />
            <div className="h-14 skeleton w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-2xl mb-4">Garment Not Found</h2>
        <Link to="/shop" className="px-6 py-2.5 bg-primary text-text-inverse text-xs tracking-[0.14em] uppercase">
          Back to Shop
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>{`${product.name} — TIMELESS TRENDS Atelier`}</title>
        <meta name="description" content={product.description?.substring(0, 160)} />
      </Helmet>

      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 py-8 lg:py-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[11px] text-text-muted mb-8 uppercase tracking-[0.12em] font-sans">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop/${product.gender}`} className="hover:text-primary transition-colors capitalize">{product.gender}</Link>
          <span>/</span>
          <span className="text-primary truncate max-w-[240px] sm:max-w-none font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Media Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 sticky top-24">
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] shrink-0 scrollbar-none">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-16 sm:w-20 aspect-[3/4] rounded-md transition-all overflow-hidden relative shrink-0 ${
                      activeImageIndex === index
                        ? 'border-2 border-primary ring-2 ring-primary/20 scale-[0.98]'
                        : 'border border-border opacity-70 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  >
                    <img src={img.url} alt={img.alt || product.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Featured Image */}
            <div className="flex-1 relative aspect-[3/4] bg-bg-secondary rounded-lg overflow-hidden group shadow-sm">
              {product.images && product.images[activeImageIndex] ? (
                <motion.img
                  key={activeImageIndex}
                  src={product.images[activeImageIndex].url}
                  alt={product.images[activeImageIndex].alt || product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out cursor-zoom-in"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-serif text-3xl text-text-light">
                  {product.name}
                </div>
              )}

              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-primary text-text-inverse text-[10px] uppercase tracking-[0.14em] px-3 py-1 font-semibold rounded-xs shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Right Product Summary & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              {/* Category tag & Rating */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted font-medium">
                  {product.gender} · {product.category?.name || 'Capsule Collection'}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.round(product.rating?.average || 5) ? 'text-primary' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary font-medium tabular-nums">
                    ({product.rating?.count || 48} reviews)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-primary tracking-[-0.01em] leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-border-light">
                <span className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-text-muted line-through tabular-nums">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-text-muted font-sans ml-auto">
                  GST included · Free express shipping
                </span>
              </div>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs tracking-[0.14em] uppercase text-text-secondary font-semibold block mb-3">
                  Colorway: <span className="text-primary font-bold">{selectedColor?.name}</span>
                </span>
                <div className="flex items-center gap-3.5 p-1">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border p-0.5 transition-all flex items-center justify-center ${
                        selectedColor?.name === color.name
                          ? 'border-primary ring-2 ring-primary/40 ring-offset-2 scale-105'
                          : 'border-transparent hover:scale-110'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-full h-full rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Size Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-[0.14em] uppercase text-text-secondary font-semibold">
                    Select Size
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-primary underline underline-offset-4 hover:text-text-secondary transition-colors font-medium"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs tracking-[0.06em] font-semibold uppercase rounded-sm border transition-all ${
                        selectedSize === size
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'border-border hover:border-primary text-primary bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-border rounded h-12 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 h-full text-text-secondary hover:text-primary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <HiMinus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-bold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 h-full text-text-secondary hover:text-primary transition-colors"
                    aria-label="Increase quantity"
                  >
                    <HiPlus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-primary text-white text-xs tracking-[0.16em] uppercase font-semibold hover:bg-primary-light transition-all rounded flex items-center justify-center gap-2 shadow-sm"
                  whileTap={{ scale: 0.98 }}
                >
                  <HiOutlineShoppingBag className="w-4 h-4" />
                  Add to Bag
                </motion.button>

                {/* Wishlist Button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`w-12 h-12 border rounded flex items-center justify-center transition-all ${
                    inWishlist
                      ? 'border-primary bg-primary text-white shadow-xs'
                      : 'border-border bg-white hover:border-primary text-primary'
                  }`}
                  aria-label="Save to wishlist"
                >
                  {inWishlist ? <HiHeart className="w-5 h-5 text-red-500" /> : <HiOutlineHeart className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Assurances Row */}
            <div className="grid grid-cols-3 gap-3 py-6 border-y border-border-light text-center text-[11px] text-text-secondary font-medium">
              <div className="flex flex-col items-center gap-1">
                <HiOutlineTruck className="w-4.5 h-4.5 text-primary" />
                <span>Complimentary Express Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <HiOutlineRefresh className="w-4.5 h-4.5 text-primary" />
                <span>14-Day Doorstep Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <HiOutlineShieldCheck className="w-4.5 h-4.5 text-primary" />
                <span>Certified Sustainable Textile</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="divide-y divide-border-light text-left">
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                  className="w-full py-4 flex items-center justify-between text-xs tracking-[0.14em] uppercase font-semibold text-primary"
                >
                  <span>Silhouette & Craft Specifications</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'details' && (
                  <div className="pb-4 text-xs text-text-secondary leading-relaxed space-y-2.5">
                    <p>{product.description}</p>
                    {product.fit && <p><strong className="text-primary">Fit Type:</strong> {product.fit.toUpperCase()}</p>}
                    {product.material && <p><strong className="text-primary">Composition:</strong> {product.material}</p>}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
                  className="w-full py-4 flex items-center justify-between text-xs tracking-[0.14em] uppercase font-semibold text-primary"
                >
                  <span>Textile Care Guide</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-4 text-xs text-text-secondary leading-relaxed">
                    <p>{product.careInstructions || 'Gentle cold cycle wash inside out. Hang dry in shade to preserve cotton hand feel.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Size Guide Modal */}
        <AnimatePresence>
          {isSizeGuideOpen && (
            <motion.div
              className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
            >
              <motion.div
                className="bg-bg w-full max-w-lg p-8 rounded-lg shadow-2xl border border-border relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                  <h3 className="font-serif text-2xl text-primary">Measurement Guide (Inches)</h3>
                  <button onClick={() => setIsSizeGuideOpen(false)} className="text-text-muted hover:text-primary text-xl">
                    ✕
                  </button>
                </div>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-primary/20 text-[10px] tracking-[0.15em] uppercase text-text-muted font-bold">
                        <th className="py-2.5 px-3">Size</th>
                        <th className="py-2.5 px-3">Chest</th>
                        <th className="py-2.5 px-3">Waist</th>
                        <th className="py-2.5 px-3">Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light text-text-secondary tabular-nums">
                      <tr><td className="py-2.5 px-3 font-bold text-primary">XS</td><td className="py-2.5 px-3">36"</td><td className="py-2.5 px-3">30"</td><td className="py-2.5 px-3">27"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">S</td><td className="py-2.5 px-3">38"</td><td className="py-2.5 px-3">32"</td><td className="py-2.5 px-3">28"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">M</td><td className="py-2.5 px-3">40"</td><td className="py-2.5 px-3">34"</td><td className="py-2.5 px-3">29"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">L</td><td className="py-2.5 px-3">42"</td><td className="py-2.5 px-3">36"</td><td className="py-2.5 px-3">30"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">XL</td><td className="py-2.5 px-3">44"</td><td className="py-2.5 px-3">38"</td><td className="py-2.5 px-3">31"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">XXL</td><td className="py-2.5 px-3">46"</td><td className="py-2.5 px-3">40"</td><td className="py-2.5 px-3">32"</td></tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-text-muted leading-relaxed">
                  * Our oversized garments feature intentional relaxed proportions with dropped shoulder seams. Order your true size for the intended silhouette.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductDetailsPage;
