import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineTrash, HiPlus, HiMinus } from 'react-icons/hi';
import { setCartDrawer } from '../../features/ui/uiSlice';
import {
  selectCartItems,
  selectCartCount,
  removeFromCart,
  updateCartItem,
} from '../../features/cart/cartSlice';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isCartDrawerOpen);
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleQtyChange = (item, newQty) => {
    if (newQty <= 0) {
      dispatch(removeFromCart(item._id));
    } else {
      dispatch(updateCartItem({ id: item._id, updates: { quantity: newQty } }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[399] bg-black/40 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setCartDrawer(false))}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[400] w-full max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/70 bg-white/80 shrink-0">
              <div>
                <h2 className="font-serif text-xl tracking-[0.14em] uppercase text-primary leading-normal">
                  Shopping Bag ({cartCount})
                </h2>
                <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted mt-0.5">
                  Complimentary Atelier Packaging
                </p>
              </div>
              <button
                onClick={() => dispatch(setCartDrawer(false))}
                className="p-2 -mr-2 text-primary hover:text-text-secondary rounded-full hover:bg-black/5 transition-colors"
                aria-label="Close cart"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12">
                  <div className="w-20 h-20 rounded-full bg-[#ECE6DE] flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl mb-2 text-primary">Your Bag is Empty</h3>
                  <p className="text-xs text-text-secondary mb-8 leading-relaxed max-w-xs">
                    Explore our new seasonal arrivals and timeless staples to curate your look.
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => dispatch(setCartDrawer(false))}
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white text-xs font-semibold tracking-[0.15em] uppercase hover:bg-primary-light transition-all rounded shadow-sm"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="px-6 divide-y divide-border/60">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item._id || index}
                      className="py-5 flex gap-4 items-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="w-20 h-26 bg-bg-secondary rounded overflow-hidden shrink-0 shadow-2xs">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-medium text-primary leading-snug line-clamp-2">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className="text-text-muted hover:text-red-600 transition-colors p-1 -mr-1"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-[11px] text-text-muted mt-1 uppercase tracking-wider">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` · ${item.color}`}
                        </p>

                        <div className="flex items-center justify-between mt-3 pt-2">
                          <div className="flex items-center border border-border rounded bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => handleQtyChange(item, (item.quantity || 1) - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-bg-warm transition-colors text-text-secondary"
                              aria-label="Decrease quantity"
                            >
                              <HiMinus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold tabular-nums">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => handleQtyChange(item, (item.quantity || 1) + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-bg-warm transition-colors text-text-secondary"
                              aria-label="Increase quantity"
                            >
                              <HiPlus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-xs font-bold text-primary tabular-nums">
                            ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-border/70 bg-white/90 px-6 py-6 space-y-4 shrink-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.14em] font-medium text-text-secondary">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold text-primary tabular-nums">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-text-muted">
                  GST included · Complimentary express delivery on all orders
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/cart"
                    onClick={() => dispatch(setCartDrawer(false))}
                    className="flex items-center justify-center h-12 border border-primary text-xs tracking-[0.14em] uppercase font-semibold text-primary hover:bg-primary hover:text-white transition-all rounded shadow-2xs"
                  >
                    View Bag
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={() => dispatch(setCartDrawer(false))}
                    className="flex items-center justify-center h-12 bg-primary text-white text-xs tracking-[0.14em] uppercase font-semibold hover:bg-primary-light transition-all rounded shadow-sm"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
