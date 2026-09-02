import { Helmet } from 'react-helmet-async';
import { HiOutlineUserGroup, HiOutlineHeart, HiOutlineSparkles } from 'react-icons/hi';

const AdminCustomerAnalytics = () => {
  return (
    <>
      <Helmet>
        <title>Customer Analytics — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="space-y-8 max-w-5xl">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Customer Demographics & Retention</h1>
          <p className="text-xs text-gray-500">Insights into customer loyalty, repeat purchase rates, and cohort engagement</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Repeat Buyer Rate</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">34.2%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">High brand loyalty</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Demographic</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">Men (18-34)</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Oversized & Essentials leading</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Wishlist Conversion</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">28.5%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">High purchase intent</p>
          </div>
        </div>

        {/* Audience Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-gray-900">Audience Segmentation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Men's Capsule</span>
              <p className="text-2xl font-bold text-gray-900 mt-2">58%</p>
              <p className="text-xs text-gray-500 mt-1">Leading items: Linen Shirts, Selvedge Denim, Suede Boots</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Women's Edit</span>
              <p className="text-2xl font-bold text-gray-900 mt-2">42%</p>
              <p className="text-xs text-gray-500 mt-1">Leading items: Blazers, Silk Slip Dresses, Platform Loafers</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCustomerAnalytics;
