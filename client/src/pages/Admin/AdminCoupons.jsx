import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HiOutlineTicket, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'percentage',
    value: 10,
    minOrderAmount: 0,
    validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const fetchCoupons = async () => {
    try {
      const { data } = await api.get('/admin/coupons');
      setCoupons(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/coupons', formData);
      toast.success('Coupon created successfully');
      setFormData({
        code: '',
        description: '',
        type: 'percentage',
        value: 10,
        minOrderAmount: 0,
        validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create coupon');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/coupons/${id}`);
      toast.success('Coupon removed');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to remove coupon');
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Coupons — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="max-w-5xl space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Discount Coupons</h1>
          <p className="text-xs text-gray-500">Create promotion codes and seasonal discount campaigns</p>
        </div>

        {/* Creator form */}
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-700">Create New Discount Voucher</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">Code</label>
              <input
                type="text"
                required
                placeholder="e.g. SUMMER20"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs uppercase focus:outline-none focus:border-gray-900 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-gray-900"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">Value</label>
              <input
                type="number"
                required
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">Valid Till</label>
              <input
                type="date"
                required
                value={formData.validTo}
                onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-gray-900"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
            >
              Generate Coupon
            </button>
          </div>
        </form>

        {/* Coupons table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="divide-y divide-gray-100">
            {coupons.map((cpn) => (
              <div key={cpn._id} className="p-4 flex items-center justify-between hover:bg-gray-50/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <HiOutlineTicket className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-mono font-bold text-gray-900">{cpn.code}</h4>
                    <p className="text-xs text-gray-500">
                      {cpn.type === 'percentage' ? `${cpn.value}% OFF` : `₹${cpn.value} Flat OFF`} · Expires on {new Date(cpn.validTo).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(cpn._id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCoupons;
