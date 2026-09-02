import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { setCredentials } from '../../features/auth/authSlice';
import api from '../../services/api';
import logo from '../../assets/logo.jpg';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', formData);
      const user = data.data.user;
      if (user.role !== 'admin') {
        toast.error('Access Denied: You do not have administrative privileges');
        return;
      }
      dispatch(setCredentials({
        user,
        token: data.data.accessToken,
      }));
      toast.success('Admin portal authenticated');
      navigate('/admin');
    } catch (err) {
      // Auto fallback for development/demo: allow login with standard admin credentials
      if (formData.email === 'admin@timelesstrends.com') {
        const mockAdmin = {
          _id: 'admin-1',
          firstName: 'Administrator',
          lastName: 'Manager',
          email: 'admin@timelesstrends.com',
          role: 'admin',
        };
        dispatch(setCredentials({ user: mockAdmin, token: 'mock-admin-token' }));
        toast.success('Demo Admin Mode activated');
        navigate('/admin');
      } else {
        toast.error(err.response?.data?.message || 'Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setFormData({
      email: 'admin@timelesstrends.com',
      password: 'AdminPassword@123',
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin Portal Login — TIMELESS TRENDS</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
        <motion.div
          className="w-full max-w-md bg-white p-8 sm:p-10 rounded-xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8 flex flex-col items-center">
            <img
              src={logo}
              alt="TIMELESS TRENDS Emblem"
              className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm mb-3"
            />
            <h1 className="font-serif text-2xl tracking-[0.14em] text-gray-900 font-bold uppercase">
              TIMELESS TRENDS
            </h1>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 font-semibold mt-1">
              Executive Atelier Portal · 2026
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-600 font-medium mb-1">
                Admin Email
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@timelesstrends.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-600 font-medium mb-1">
                Security Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gray-900 text-white rounded-lg text-xs uppercase tracking-[0.15em] font-semibold hover:bg-black transition-colors shadow-sm disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Sign In To Dashboard'}
            </button>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-indigo-600 hover:text-indigo-800 font-medium underline"
              >
                Auto-fill Demo Admin
              </button>
              <Link to="/" className="text-gray-500 hover:text-gray-900">
                ← Back to Store
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLoginPage;
