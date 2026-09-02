import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineShoppingBag,
  HiOutlineArrowRight,
  HiOutlineChevronRight,
  HiOutlineTruck,
} from 'react-icons/hi';
import api from '../../services/api';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        setOrders(data.data || []);
      } catch (err) {
        console.error('Failed to load orders:', err);
        // Provide mock order list for demo
        setOrders([
          {
            _id: 'TT-ORD-9021',
            orderNumber: 'TT-2025-081',
            createdAt: new Date().toISOString(),
            status: 'confirmed',
            totalAmount: 3998,
            items: [
              {
                product: 'prod-1',
                name: 'Essential Oversized Cotton Tee',
                price: 1499,
                quantity: 1,
                size: 'L',
                color: 'Onyx Black',
                image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
              },
              {
                product: 'prod-2',
                name: 'Classic Linen Shirt',
                price: 2499,
                quantity: 1,
                size: 'L',
                color: 'White',
                image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000',
              },
            ],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const map = {
      pending: 'bg-amber-100 text-amber-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-rose-100 text-rose-800',
    };
    return (
      <span className={`px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <>
      <Helmet>
        <title>My Orders — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-border-light">
          <div>
            <h1 className="font-serif text-3xl tracking-[0.04em]">Order History</h1>
            <p className="text-xs text-text-muted uppercase tracking-[0.1em] mt-1">
              Review and track all your previous purchases
            </p>
          </div>
          <Link
            to="/account"
            className="text-xs uppercase tracking-[0.1em] text-text-secondary hover:text-primary underline underline-offset-4"
          >
            ← My Account
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(null).map((_, i) => (
              <div key={i} className="h-32 skeleton" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-bg-secondary/40 border border-border-light p-8">
            <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-4">
              <HiOutlineShoppingBag className="w-6 h-6 text-text-muted" />
            </div>
            <h2 className="font-serif text-xl mb-2">No Orders Placed Yet</h2>
            <p className="text-xs text-text-secondary mb-6">
              When you purchase an item from TIMELESS TRENDS, it will appear here.
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-2.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.12em] font-medium"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-border-light p-6 shadow-xs hover:border-primary/40 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-light text-xs">
                  <div>
                    <span className="text-text-muted uppercase tracking-[0.1em]">Order Ref:</span>
                    <strong className="text-primary ml-2 font-mono">{order.orderNumber || order._id}</strong>
                  </div>
                  <div>
                    <span className="text-text-muted uppercase tracking-[0.1em]">Date:</span>
                    <span className="text-primary ml-2 font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-muted uppercase tracking-[0.1em]">Status:</span>
                    <span className="ml-2">{getStatusBadge(order.status)}</span>
                  </div>
                  <div>
                    <span className="text-text-muted uppercase tracking-[0.1em]">Total:</span>
                    <strong className="text-primary ml-2 text-sm font-medium">
                      ₹{order.totalAmount?.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* Items thumbnail list */}
                <div className="py-4 flex flex-wrap items-center gap-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-14 aspect-[3/4] bg-bg-secondary overflow-hidden shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-serif text-xs">TT</div>
                        )}
                      </div>
                      <div className="text-xs">
                        <p className="font-medium text-primary line-clamp-1">{item.name}</p>
                        <p className="text-text-muted">
                          Qty: {item.quantity} · Size: {item.size} {item.color ? `· ${item.color}` : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
                  <Link
                    to={`/order-tracking/${order._id}`}
                    className="px-4 py-2 border border-border hover:border-primary text-xs uppercase tracking-[0.1em] font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <HiOutlineTruck className="w-4 h-4" /> Track Status
                  </Link>
                  <Link
                    to={`/account/orders/${order._id}`}
                    className="px-4 py-2 bg-primary text-text-inverse hover:bg-primary-light text-xs uppercase tracking-[0.1em] font-medium flex items-center gap-1.5 transition-colors"
                  >
                    View Details <HiOutlineChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrdersPage;
