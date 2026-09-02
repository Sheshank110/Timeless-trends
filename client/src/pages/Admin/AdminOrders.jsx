import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/admin/orders');
      setOrders(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <>
      <Helmet>
        <title>Customer Orders — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Order Management</h1>
          <p className="text-xs text-gray-500">Live fulfillment queue and shipping status workflow</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-gray-500">Loading orders stream...</div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-500">No customer orders recorded yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Items</th>
                    <th className="py-3.5 px-4">Payment</th>
                    <th className="py-3.5 px-4">Total</th>
                    <th className="py-3.5 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {orders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-mono font-medium text-gray-900">{ord.orderNumber || ord._id}</td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-gray-900">
                          {ord.user ? `${ord.user.firstName} ${ord.user.lastName}` : 'Guest'}
                        </p>
                        <p className="text-[10px] text-gray-400">{ord.user?.email || ord.shippingAddress?.phone}</p>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">{new Date(ord.createdAt).toLocaleDateString()}</td>
                      <td className="py-3.5 px-4">{ord.items?.length || 1} items</td>
                      <td className="py-3.5 px-4">
                        <span className="uppercase text-[10px] font-bold text-gray-600">
                          {ord.paymentMethod} · <span className="text-emerald-600">{ord.paymentStatus}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">₹{ord.totalAmount?.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                          className="px-2.5 py-1 text-xs border border-gray-300 rounded font-semibold uppercase bg-white focus:outline-none focus:border-gray-900 cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
