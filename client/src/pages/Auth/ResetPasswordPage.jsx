import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authApi } from '../../features/auth/authApi';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[a-z]/, 'Must contain a lowercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authApi.resetPassword({ token, password: data.password });
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed. The link may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Reset Password — TIMELESS TRENDS</title></Helmet>
      <div className="text-center mb-10">
        <Link to="/" className="inline-block mb-8">
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TIMELESS</h1>
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TRENDS</h1>
        </Link>
        <h2 className="font-serif text-xl tracking-[0.06em]">Reset Password</h2>
        <p className="text-sm text-text-secondary mt-2">Create a new password for your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="new-password" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">New Password</label>
          <div className="relative">
            <input id="new-password" type={showPassword ? 'text' : 'password'} {...register('password')}
              className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors pr-12" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirm-new-password" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">Confirm Password</label>
          <input id="confirm-new-password" type="password" {...register('confirmPassword')}
            className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors" />
          {errors.confirmPassword && <p className="text-error text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>
        <motion.button type="submit" disabled={isLoading}
          className="w-full py-3.5 bg-primary text-text-inverse text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
          whileTap={{ scale: 0.98 }}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </motion.button>
      </form>
    </>
  );
};

export default ResetPasswordPage;
