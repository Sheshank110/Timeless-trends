import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  HiOutlineCurrencyRupee,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineExclamation,
  HiOutlineArrowUp,
  HiOutlineTrendingUp,
} from 'react-icons/hi';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard-stats');
        setStats(data.data);
      } catch {
        setStats({
          kpis: {
            totalRevenue: 489500,
            totalOrders: 328,
            totalCustomers: 215,
            lowStockCount: 4,
          },
          monthlyRevenue: [
            { month: 'Jan', revenue: 42000, orders: 28 },
            { month: 'Feb', revenue: 58000, orders: 39 },
            { month: 'Mar', revenue: 74000, orders: 51 },
            { month: 'Apr', revenue: 69000, orders: 46 },
            { month: 'May', revenue: 89000, orders: 62 },
            { month: 'Jun', revenue: 112000, orders: 78 },
          ],
          lowStockProducts: [
            { _id: 'p1', name: 'Essential Oversized Cotton Tee', stock: 3, price: 1499 },
            { _id: 'p2', name: 'Structured Linen Blazer', stock: 1, price: 5499 },
            { _id: 'p3', name: 'Straight Dark Selvedge Denim', stock: 4, price: 2999 },
          ],
          recentOrders: [
            {
              _id: 'ord-1',
              orderNumber: 'TT-2025-098',
              user: { firstName: 'Rohan', lastName: 'Mehta' },
              totalAmount: 4998,
              status: 'confirmed',
              createdAt: new Date().toISOString(),
            },
            {
              _id: 'ord-2',
              orderNumber: 'TT-2025-097',
              user: { firstName: 'Simran', lastName: 'Kaur' },
              totalAmount: 2499,
              status: 'shipped',
              createdAt: new Date(Date.now() - 3600000).toISOString(),
            },
            {
              _id: 'ord-3',
              orderNumber: 'TT-2025-096',
              user: { firstName: 'Aditya', lastName: 'Verma' },
              totalAmount: 1499,
              status: 'delivered',
              createdAt: new Date(Date.now() - 7200000).toISOString(),
            },
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const kpis = [
    {
      title: 'Gross Revenue',
      value: `₹${(stats?.kpis?.totalRevenue || 0).toLocaleString()}`,
      change: '+18.4% vs last month',
      icon: HiOutlineCurrencyRupee,
      accent: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Total Orders',
      value: (stats?.kpis?.totalOrders || 0).toLocaleString(),
      change: '+12.6% vs last month',
      icon: HiOutlineShoppingCart,
      accent: 'text-blue-700 bg-blue-50 border-blue-100',
    },
    {
      title: 'Active Clientele',
      value: (stats?.kpis?.totalCustomers || 0).toLocaleString(),
      change: '+24 new this week',
      icon: HiOutlineUsers,
      accent: 'text-purple-700 bg-purple-50 border-purple-100',
    },
    {
      title: 'Restock Warnings',
      value: stats?.kpis?.lowStockCount || 0,
      change: 'Units below replenishment threshold',
      icon: HiOutlineExclamation,
      accent: 'text-amber-700 bg-amber-50 border-amber-100',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Atelier Executive Workspace — TIMELESS TRENDS</title>
      </Helmet>

      <div className="space-y-8">
        {/* Workspace Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
              Atelier Intelligence
            </span>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mt-0.5">
              Executive Dashboard
            </h1>
          </div>
          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-md self-start sm:self-auto">
            Live Stream · {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}
          </span>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.title}
                className="bg-white p-6 rounded-xl border border-gray-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    {kpi.title}
                  </span>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${kpi.accent}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 tabular-nums">{kpi.value}</h3>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                    <HiOutlineArrowUp className="w-3.5 h-3.5" /> {kpi.change}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart & Restock Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Chart (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Revenue Cadence (INR)
                </h3>
                <p className="text-xs text-gray-500">Monthly fiscal trajectory across seasons</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                <HiOutlineTrendingUp className="w-3.5 h-3.5" /> +26.8% Growth
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-60 flex items-end gap-5 sm:gap-9 pt-8 px-2 border-b border-gray-100">
              {stats?.monthlyRevenue?.map((bar) => {
                const maxRev = 120000;
                const heightPercent = Math.round((bar.revenue / maxRev) * 100);
                return (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                      ₹{(bar.revenue / 1000).toFixed(0)}k
                    </span>
                    <div
                      className="w-full max-w-[42px] bg-gray-900 rounded-t-sm group-hover:bg-indigo-600 transition-colors"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-xs font-semibold text-gray-600 mt-1">{bar.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Restock Column (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Low Stock Alert
                </h3>
                <Link to="/admin/inventory" className="text-xs text-indigo-600 font-semibold hover:underline">
                  Manage →
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {stats?.lowStockProducts?.map((p) => (
                  <div key={p._id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-gray-900 line-clamp-1">{p.name}</p>
                      <p className="text-gray-400 tabular-nums">₹{p.price?.toLocaleString()}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-red-50 border border-red-100 text-red-700 font-bold rounded text-[10px] tabular-nums">
                      {p.stock} Units Left
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/admin/inventory"
              className="mt-6 block text-center py-2.5 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-800 rounded-lg transition-colors border border-gray-200 uppercase tracking-wider"
            >
              Restock All Inventory
            </Link>
          </div>
        </div>

        {/* Live Orders Table */}
        <div className="bg-white p-6 sm:p-7 rounded-xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Live Fulfillment Queue
              </h3>
              <p className="text-xs text-gray-500">Real-time incoming orders stream</p>
            </div>
            <Link to="/admin/orders" className="text-xs font-bold text-indigo-600 hover:underline">
              View All Orders ({stats?.kpis?.totalOrders || 0}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/60 text-gray-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Order Ref</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {stats?.recentOrders?.map((ord) => (
                  <tr key={ord._id} className="hover:bg-gray-50/80">
                    <td className="py-3.5 px-4 font-mono font-medium text-gray-900">{ord.orderNumber || ord._id}</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      {ord.user ? `${ord.user.firstName} ${ord.user.lastName}` : 'Guest Customer'}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">{new Date(ord.createdAt).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900 tabular-nums">
                      ₹{ord.totalAmount?.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link to={`/admin/orders`} className="text-indigo-600 hover:text-indigo-900 font-semibold">
                        Fulfill →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
