import { Helmet } from 'react-helmet-async';
import { HiOutlineTrendingUp, HiOutlineCurrencyRupee, HiOutlineChartBar } from 'react-icons/hi';

const AdminSalesAnalytics = () => {
  const channelData = [
    { channel: 'Organic Search & SEO', sales: '₹1,84,000', share: '38%' },
    { channel: 'Direct / Return Shoppers', sales: '₹1,42,000', share: '29%' },
    { channel: 'Instagram & Social Feed', sales: '₹98,000', share: '20%' },
    { channel: 'AI Stylist Recommender', sales: '₹62,000', share: '13%' },
  ];

  return (
    <>
      <Helmet>
        <title>Sales Analytics — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="space-y-8 max-w-5xl">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Sales & Revenue Intelligence</h1>
          <p className="text-xs text-gray-500">Deep-dive financial breakdown across channels, categories, and payment types</p>
        </div>

        {/* Top summary row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Average Order Value (AOV)</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">₹2,850</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">+8.2% vs last quarter</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Online vs COD Split</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">78% Razorpay</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">22% Cash on Delivery</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cart Conversion Rate</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">3.8%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">+0.6% improvement</p>
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
          <h3 className="text-base font-bold text-gray-900 mb-4">Acquisition Channels & Conversion Yield</h3>
          <div className="divide-y divide-gray-100">
            {channelData.map((item) => (
              <div key={item.channel} className="py-4 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.channel}</h4>
                  <div className="w-48 bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gray-900 h-full rounded-full" style={{ width: item.share }} />
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">{item.sales}</span>
                  <span className="text-gray-400">{item.share} of total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSalesAnalytics;
