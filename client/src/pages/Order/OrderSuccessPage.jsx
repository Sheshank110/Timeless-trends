import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineArrowRight,
  HiOutlineDocumentDownload,
} from 'react-icons/hi';
import api from '../../services/api';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${orderId}`);
        setOrder(data.data);
      } catch (err) {
        console.error('Error fetching confirmed order:', err);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <>
      <Helmet>
        <title>Order Confirmed — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[750px] mx-auto px-4 sm:px-6 py-16 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6"
        >
          <HiOutlineCheckCircle className="w-12 h-12" />
        </motion.div>

        <p className="text-xs uppercase tracking-[0.25em] text-text-muted font-medium mb-2">
          Payment & Order Successful
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl text-primary tracking-[0.03em] mb-4">
          Thank You for Your Order
        </h1>
        <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed mb-8">
          We've received your order and are carefully preparing your garments. A confirmation email with receipt has been dispatched.
        </p>

        {/* Order Info Card */}
        <div className="bg-bg-secondary p-8 border border-border-light text-left mb-10">
          <div className="flex flex-wrap justify-between items-center pb-4 border-b border-border text-xs">
            <div>
              <span className="text-text-muted uppercase tracking-[0.1em]">Order Reference:</span>
              <strong className="text-primary font-mono ml-2">{order?.orderNumber || orderId}</strong>
            </div>
            <div>
              <span className="text-text-muted uppercase tracking-[0.1em]">Estimated Delivery:</span>
              <strong className="text-primary ml-2">3-5 Business Days</strong>
            </div>
          </div>

          <div className="pt-4 text-xs text-text-secondary space-y-1">
            <p><strong className="text-primary">Deliver to:</strong> {order?.shippingAddress?.fullName || 'Customer'}</p>
            <p>{order?.shippingAddress?.address || 'Shipping Address Provided'}, {order?.shippingAddress?.city || ''}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={`/order-tracking/${orderId}`}
            className="w-full sm:w-auto px-8 py-3.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.15em] font-medium flex items-center justify-center gap-2 hover:bg-primary-light transition-all"
          >
            <HiOutlineTruck className="w-4 h-4" /> Track Shipment
          </Link>
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 border border-primary text-primary text-xs uppercase tracking-[0.15em] font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-text-inverse transition-all"
          >
            Continue Shopping <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPage;
