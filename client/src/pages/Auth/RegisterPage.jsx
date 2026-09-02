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

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[a-z]/, 'Must contain a lowercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = data;
      const response = await authApi.register(registerData);
      dispatch(setCredentials({
        user: response.data.data.user,
        token: response.data.data.accessToken,
      }));
      toast.success('Account created! Please check your email to verify.');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account — TIMELESS TRENDS</title>
      </Helmet>

      <div className="text-center mb-10">
        <Link to="/" className="inline-block mb-8">
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TIMELESS</h1>
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TRENDS</h1>
        </Link>
        <h2 className="font-serif text-xl tracking-[0.06em]">Create Account</h2>
        <p className="text-sm text-text-secondary mt-2">
          Join the TIMELESS TRENDS community
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              {...register('firstName')}
              className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {errors.firstName && <p className="text-error text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register('lastName')}
              className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {errors.lastName && <p className="text-error text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">
            Email Address
          </label>
          <input
            id="reg-email"
            type="email"
            {...register('email')}
            className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
            >
              {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors"
          />
          {errors.confirmPassword && <p className="text-error text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-primary text-text-inverse text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </motion.button>
      </form>

      <div className="text-center mt-8">
        <p className="text-sm text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
