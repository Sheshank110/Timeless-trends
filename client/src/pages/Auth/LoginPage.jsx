import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { setCredentials } from '../../features/auth/authSlice';
import { authApi } from '../../features/auth/authApi';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      dispatch(setCredentials({
        user: response.data.data.user,
        token: response.data.data.accessToken,
      }));
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In — TIMELESS TRENDS</title>
      </Helmet>

      <div className="text-center mb-10">
        <Link to="/" className="inline-block mb-8">
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TIMELESS</h1>
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TRENDS</h1>
        </Link>
        <h2 className="font-serif text-xl tracking-[0.06em]">Welcome Back</h2>
        <p className="text-sm text-text-secondary mt-2">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-error text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors pr-12"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-error text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Link
            to="/forgot-password"
            className="text-xs text-text-secondary hover:text-primary transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-primary text-text-inverse text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </motion.button>
      </form>

      <div className="text-center mt-8">
        <p className="text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
