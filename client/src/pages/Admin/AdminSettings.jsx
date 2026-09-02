import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    announcementText: 'FREE SHIPPING ON ORDERS ABOVE ₹999',
    isAnnouncementActive: true,
    whatsappNumber: '+919999999999',
    email: 'contact@timelesstrends.com',
    shipping: {
      freeShippingThreshold: 999,
      baseCharge: 79,
      expressCharge: 149,
    },
    maintenanceMode: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/admin/settings');
        if (data.data) {
          setSettings(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put('/admin/settings', settings);
      toast.success('Site configuration saved successfully');
    } catch (err) {
      toast.error('Failed to update settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Store Configuration — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Store Settings & Policy Configuration</h1>
          <p className="text-xs text-gray-500">Configure global shipping rules, announcements, and contact channels</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-2xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Top Announcement Bar</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1 font-semibold">Announcement Text</label>
                <input
                  type="text"
                  value={settings.announcementText}
                  onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-gray-900"
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.isAnnouncementActive}
                  onChange={(e) => setSettings({ ...settings, isAnnouncementActive: e.target.checked })}
                  className="w-4 h-4 rounded text-gray-900"
                />
                Show Announcement Bar on Site
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Shipping & Courier Fees (INR)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1 font-semibold">Free Delivery Above (₹)</label>
                <input
                  type="number"
                  value={settings.shipping?.freeShippingThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, freeShippingThreshold: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1 font-semibold">Standard Flat Fee (₹)</label>
                <input
                  type="number"
                  value={settings.shipping?.baseCharge}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, baseCharge: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1 font-semibold">Express 24h Courier (₹)</label>
                <input
                  type="number"
                  value={settings.shipping?.expressCharge}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      shipping: { ...settings.shipping, expressCharge: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-gray-900"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Direct Support Channels</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1 font-semibold">WhatsApp Integration Number</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1 font-semibold">Support Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-gray-900"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Save Site Settings'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminSettings;
