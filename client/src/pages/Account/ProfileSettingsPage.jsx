import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { selectCurrentUser, updateUser } from '../../features/auth/authSlice';
import api from '../../services/api';

const ProfileSettingsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.put('/users/profile', formData);
      dispatch(updateUser(data.data));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile Settings — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-border-light">
          <div>
            <h1 className="font-serif text-3xl tracking-[0.04em]">Profile Settings</h1>
            <p className="text-xs text-text-muted uppercase tracking-[0.1em] mt-1">
              Personal Information & Security
            </p>
          </div>
          <Link
            to="/account"
            className="text-xs uppercase tracking-[0.1em] text-text-secondary hover:text-primary underline underline-offset-4"
          >
            ← Account
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-border-light p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-text-secondary mb-2">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 border border-border text-sm bg-transparent focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-text-secondary mb-2">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 border border-border text-sm bg-transparent focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.1em] text-text-secondary mb-2">Email Address (Read-Only)</label>
            <input
              type="email"
              disabled
              value={user?.email || 'customer@timelesstrends.com'}
              className="w-full px-4 py-3 border border-border-light text-sm bg-bg-secondary text-text-muted cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.1em] text-text-secondary mb-2">Contact Phone</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-border text-sm bg-transparent focus:outline-none focus:border-primary"
            />
          </div>

          <div className="pt-4 border-t border-border-light flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.15em] font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
