import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineTrash,
  HiMinus,
  HiPlus,
  HiOutlineArrowRight,
  HiOutlineShoppingBag,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from 'react-icons/hi';
import {
  selectCartItems,
  selectCartCount,
  removeFromCart,
  updateCartItem,
  clearCart,
} from '../../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  const handleQuantityChange = (item, newQty) => {
    if (newQty <= 0) {
      dispatch(removeFromCart(item._id));
    } else {
      dispatch(updateCartItem({ id: item._id, updates: { quantity: newQty } }));
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Shopping Bag (${cartCount}) — TIMELESS TRENDS`}</title>
      </Helmet>

      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 py-12 lg:py-16">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.04em] mb-2 text-center">
          Shopping Bag
        </h1>
        <p className="text-xs text-text-muted uppercase tracking-[0.18em] text-center mb-12">
          {cartCount} {cartCount === 1 ? 'Item' : 'Items'} In Your Selection
        </p>        {cartItems.length === 0 ? (
          <div className="text-center py-16 px-6 sm:px-12 bg-white max-w-xl mx-auto border border-border-light rounded-xl shadow-sm my-8 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-6">
              <HiOutlineShoppingBag className="w-8 h-8 text-text-muted" />
            </div>
            <h2 className="font-serif text-2xl mb-3 text-primary">Your Bag is Empty</h2>
            <p className="text-xs sm:text-sm text-text-secondary mb-8 leading-relaxed max-w-sm">
              Explore our new seasonal arrivals and timeless staples to curate your look.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-xs tracking-[0.15em] uppercase font-semibold hover:bg-primary-light transition-all rounded shadow-sm"
            >
              Start Shopping <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Items Table / List (8 Cols) */}
            <div className="lg:col-span-8">
              <div className="border-b border-border-light pb-3 hidden sm:grid grid-cols-12 text-xs uppercase tracking-[0.1em] text-text-muted">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-center">Size & Color</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              <div className="divide-y divide-border-light">
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                    layout
                  >
                    {/* Product info */}
                    <div className="sm:col-span-6 flex gap-4 w-full">
                      <div className="w-20 sm:w-24 aspect-[3/4] bg-bg-secondary rounded overflow-hidden shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-serif text-lg text-text-light">
                            TT
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-between py-1 min-w-0">
                        <div>
                          <h3 className="text-sm font-medium text-primary hover:text-text-secondary transition-colors truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-text-muted mt-1">
                            ₹{(item.price || 0).toLocaleString()} each
                          </p>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className="text-xs text-text-muted hover:text-red-600 transition-colors flex items-center gap-1 w-fit pt-2"
                        >
                          <HiOutlineTrash className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Size & Color */}
                    <div className="sm:col-span-2 text-center text-xs text-text-secondary w-full sm:w-auto flex sm:block justify-between">
                      <span className="sm:hidden text-text-muted">Variant:</span>
                      <span>{item.size || 'M'} {item.color ? `· ${item.color}` : ''}</span>
                    </div>

                    {/* Quantity */}
                    <div className="sm:col-span-2 flex justify-center w-full sm:w-auto">
                      <div className="flex items-center border border-border rounded bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => handleQuantityChange(item, (item.quantity || 1) - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-bg-warm transition-colors text-text-secondary"
                          aria-label="Decrease quantity"
                        >
                          <HiMinus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold tabular-nums">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, (item.quantity || 1) + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-bg-warm transition-colors text-text-secondary"
                          aria-label="Increase quantity"
                        >
                          <HiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="sm:col-span-2 text-right w-full sm:w-auto font-bold text-sm text-primary flex sm:block justify-between tabular-nums">
                      <span className="sm:hidden text-text-muted font-normal text-xs">Total:</span>
                      ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border-light">
                <Link
                  to="/shop"
                  className="text-xs tracking-[0.1em] uppercase text-text-secondary hover:text-primary underline underline-offset-4 font-medium"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-xs tracking-[0.1em] uppercase text-text-muted hover:text-red-600 transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order Summary (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white p-7 sm:p-8 border border-border-light rounded-xl shadow-sm sticky top-24">
                <h2 className="font-serif text-xl tracking-[0.05em] mb-6 pb-4 border-b border-border text-primary">
                  Order Summary
                </h2>

                <div className="space-y-3.5 text-xs text-text-secondary mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-primary text-sm tabular-nums">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{shipping === 0 ? <strong className="text-emerald-700 font-medium">FREE</strong> : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[11px] text-text-muted italic">
                      Add ₹{(999 - subtotal).toLocaleString()} more for Free Express Delivery.
                    </p>
                  )}
                  <div className="flex justify-between pt-4 border-t border-border text-base text-primary font-bold">
                    <span>Total Amount</span>
                    <span className="tabular-nums">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3.5 bg-primary text-white text-xs tracking-[0.16em] uppercase font-semibold hover:bg-primary-light transition-all rounded flex items-center justify-center gap-2 shadow-sm mb-6"
                >
                  Proceed to Checkout <HiOutlineArrowRight className="w-4 h-4" />
                </button>

                <div className="space-y-3 text-[11px] text-text-muted pt-4 border-t border-border-light">
                  <div className="flex items-center gap-2">
                    <HiOutlineShieldCheck className="w-4 h-4 text-primary" />
                    <span>Secure Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineTruck className="w-4 h-4 text-primary" />
                    <span>Express 2-4 Day Pan-India Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
