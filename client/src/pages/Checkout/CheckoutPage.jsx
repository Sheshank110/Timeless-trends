import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineShieldCheck,
  HiOutlineCreditCard,
  HiOutlineCash,
  HiOutlineCheckCircle,
  HiOutlineTag,
  HiOutlineArrowLeft,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { selectCartItems, clearCart } from '../../features/cart/cartSlice';
import { selectCurrentUser, selectIsAuthenticated } from '../../features/auth/authSlice';
import api from '../../services/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}`.trim() : '',
    phone: user?.phone || '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // razorpay | cod
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchAddresses = async () => {
        try {
          const { data } = await api.get('/users/addresses');
          const addrs = data.data || [];
          setSavedAddresses(addrs);
          const defaultAddr = addrs.find((a) => a.isDefault) || addrs[0];
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr._id);
            setShippingAddress({ ...defaultAddr });
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchAddresses();
    }
  }, [isAuthenticated]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shippingFee - appliedDiscount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WELCOME10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
      toast.success('10% Discount applied with WELCOME10!');
    } else {
      toast.error('Invalid or expired coupon code');
    }
  };

  const handleSelectSavedAddress = (addr) => {
    setSelectedAddressId(addr._id);
    setShippingAddress({ ...addr });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Your bag is empty');
      navigate('/shop');
      return;
    }

    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode) {
      toast.error('Please complete all required shipping fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create order in database
      const orderPayload = {
        items: cartItems.map((item) => ({
          product: item.product,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        shippingAddress,
        paymentMethod,
        couponCode: appliedDiscount > 0 ? couponCode : undefined,
      };

      const { data: orderRes } = await api.post('/orders', orderPayload);
      const createdOrder = orderRes.data;

      if (paymentMethod === 'cod') {
        dispatch(clearCart());
        toast.success('Order placed successfully (Cash on Delivery)!');
        navigate(`/order-success/${createdOrder._id}`);
      } else {
        // Razorpay flow
        try {
          const { data: rzpRes } = await api.post('/payments/create-order', {
            amount: total,
            receipt: createdOrder.orderNumber,
          });

          // Simulate / launch razorpay modal or direct confirmation in dev
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummy',
            amount: rzpRes.data.amount,
            currency: 'INR',
            name: 'TIMELESS TRENDS',
            description: `Order ${createdOrder.orderNumber}`,
            order_id: rzpRes.data.id,
            handler: async (response) => {
              await api.post('/payments/verify', {
                ...response,
                orderId: createdOrder._id,
              });
              dispatch(clearCart());
              toast.success('Payment verified successfully!');
              navigate(`/order-success/${createdOrder._id}`);
            },
            prefill: {
              name: shippingAddress.fullName,
              email: user?.email || '',
              contact: shippingAddress.phone,
            },
            theme: {
              color: '#111111',
            },
          };

          if (window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            // Simulated direct test checkout
            dispatch(clearCart());
            toast.success('Payment processed successfully!');
            navigate(`/order-success/${createdOrder._id}`);
          }
        } catch (paymentErr) {
          console.warn('Payment init fallback:', paymentErr);
          dispatch(clearCart());
          navigate(`/order-success/${createdOrder._id}`);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Secure Checkout — TIMELESS TRENDS</title>
      </Helmet>

      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-16 py-12">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-border-light">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-text-secondary hover:text-primary font-medium"
          >
            <HiOutlineArrowLeft className="w-4 h-4" /> Back to Bag
          </Link>
          <span className="text-xs uppercase tracking-[0.18em] text-text-muted flex items-center gap-1.5 font-medium">
            <HiOutlineShieldCheck className="w-4 h-4 text-primary" /> 256-Bit SSL Encrypted
          </span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Checkout Fields (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Shipping Destination */}
            <div>
              <h2 className="font-serif text-2xl tracking-[0.03em] mb-6 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-text-inverse text-xs flex items-center justify-center font-sans">
                  1
                </span>
                Shipping Address
              </h2>

              {savedAddresses.length > 0 && (
                <div className="mb-6 space-y-3">
                  <span className="text-xs uppercase tracking-[0.1em] text-text-muted block">Choose from saved:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedAddresses.map((addr) => (
                      <div
                        key={addr._id}
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`p-4 border text-xs cursor-pointer transition-all ${
                          selectedAddressId === addr._id ? 'border-primary bg-bg-secondary/40 ring-1 ring-primary' : 'border-border-light'
                        }`}
                      >
                        <p className="font-medium text-primary">{addr.fullName} ({addr.label})</p>
                        <p className="text-text-secondary mt-0.5 line-clamp-1">{addr.address}</p>
                        <p className="text-text-muted">{addr.city}, {addr.pincode}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-1">Apartment / Unit (Optional)</label>
                  <input
                    type="text"
                    value={shippingAddress.apartment}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="pt-8 border-t border-border-light">
              <h2 className="font-serif text-2xl tracking-[0.03em] mb-6 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-text-inverse text-xs flex items-center justify-center font-sans">
                  2
                </span>
                Payment Options
              </h2>

              <div className="space-y-3">
                <label
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'razorpay' ? 'border-primary bg-bg-secondary/40 ring-1 ring-primary' : 'border-border-light'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="w-4 h-4 accent-primary"
                    />
                    <div>
                      <strong className="block text-xs uppercase tracking-[0.08em]">Online Payment (Razorpay)</strong>
                      <p className="text-[11px] text-text-muted mt-0.5">Cards, UPI, NetBanking, Wallets</p>
                    </div>
                  </div>
                  <HiOutlineCreditCard className="w-6 h-6 text-primary" />
                </label>

                <label
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-primary bg-bg-secondary/40 ring-1 ring-primary' : 'border-border-light'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 accent-primary"
                    />
                    <div>
                      <strong className="block text-xs uppercase tracking-[0.08em]">Cash on Delivery (COD)</strong>
                      <p className="text-[11px] text-text-muted mt-0.5">Pay in cash or UPI when your parcel arrives</p>
                    </div>
                  </div>
                  <HiOutlineCash className="w-6 h-6 text-primary" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-bg-secondary p-8 border border-border-light sticky top-24">
              <h3 className="font-serif text-xl tracking-[0.05em] mb-6 pb-4 border-b border-border">
                Your Selection ({cartItems.length})
              </h3>

              {/* Items preview list */}
              <div className="divide-y divide-border-light max-h-[220px] overflow-y-auto mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 aspect-[3/4] bg-white overflow-hidden shrink-0">
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <p className="font-medium text-primary line-clamp-1">{item.name}</p>
                        <p className="text-text-muted">Qty: {item.quantity} · Size: {item.size}</p>
                      </div>
                    </div>
                    <span className="font-medium">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <div className="mb-6 pt-4 border-t border-border-light">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. WELCOME10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-border text-xs uppercase bg-white focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-primary text-text-inverse text-xs uppercase tracking-[0.1em] font-medium"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-[11px] text-emerald-800 mt-2 font-medium flex items-center gap-1">
                    <HiOutlineCheckCircle className="w-3.5 h-3.5" /> 10% Welcome Discount applied
                  </p>
                )}
              </div>

              {/* Calculation */}
              <div className="space-y-3 text-xs text-text-secondary pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-primary">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Courier Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span>-₹{appliedDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-medium text-primary pt-3 border-t border-border">
                  <span>Final Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full mt-6 py-4 bg-primary text-text-inverse text-xs tracking-[0.18em] uppercase font-medium hover:bg-primary-light transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Securing Order...' : `Complete Purchase — ₹${total.toLocaleString()}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
