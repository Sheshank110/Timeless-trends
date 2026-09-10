import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineTrash,
  HiOutlineShoppingBag,
  HiOutlineArrowRight,
  HiOutlineHeart,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { selectWishlistItems, removeFromWishlist } from '../../features/wishlist/wishlistSlice';
import { addToCart } from '../../features/cart/cartSlice';
import { setCartDrawer } from '../../features/ui/uiSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleMoveToCart = (product) => {
    const item = {
      _id: `${product._id}-M-${product.colors?.[0]?.name || 'default'}`,
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || '',
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[0]?.name || '',
      quantity: 1,
      stock: product.stock || 10,
    };
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(product._id));
    toast.success('Moved to Bag');
    dispatch(setCartDrawer(true));
  };

  return (
    <>
      <Helmet>
        <title>{`My Wishlist (${wishlistItems.length}) — TIMELESS TRENDS`}</title>
      </Helmet>

      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 py-12 lg:py-16">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.04em] mb-2 text-center text-primary">
          My Saved Wishlist
        </h1>
        <p className="text-xs text-text-muted uppercase tracking-[0.18em] text-center mb-12">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'Curated Piece' : 'Curated Pieces'}
        </p>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 px-6 sm:px-12 bg-white max-w-xl mx-auto border border-border-light rounded-xl shadow-sm my-8 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-6">
              <HiOutlineHeart className="w-8 h-8 text-text-muted" />
            </div>
            <h2 className="font-serif text-2xl mb-3 text-primary">Your Wishlist is Empty</h2>
            <p className="text-xs sm:text-sm text-text-secondary mb-8 leading-relaxed max-w-sm">
              Keep track of garments you love. Tap the heart icon on any product to save it here.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-xs tracking-[0.15em] uppercase font-semibold hover:bg-primary-light transition-all rounded shadow-sm"
            >
              Explore Collection <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <motion.div
                key={product._id}
                className="group relative flex flex-col justify-between bg-white p-3 rounded-lg border border-border-light/60 shadow-2xs"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="relative aspect-[3/4] bg-bg-secondary mb-3 rounded overflow-hidden">
                  <Link to={`/product/${product.slug || product._id}`} state={{ product }}>
                    {product.images?.[0]?.url || product.image ? (
                      <img
                        src={product.images?.[0]?.url || product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-serif text-xl text-text-light">
                        {product.name}
                      </div>
                    )}
                  </Link>
                  <button
                    onClick={() => dispatch(removeFromWishlist(product._id))}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white text-red-600 shadow-2xs transition-colors"
                    aria-label="Remove item"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-[0.12em] mb-1">
                      {product.gender} · {product.category?.name || product.category || 'Exclusive'}
                    </p>
                    <Link
                      to={`/product/${product.slug || product._id}`}
                      state={{ product }}
                      className="text-xs sm:text-sm font-medium text-primary hover:text-text-secondary transition-colors block truncate"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs sm:text-sm font-bold text-primary mt-1 mb-3 tabular-nums">
                      ₹{product.price?.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2.5 bg-primary text-white text-[11px] uppercase tracking-[0.14em] font-semibold hover:bg-primary-light transition-all rounded flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <HiOutlineShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
