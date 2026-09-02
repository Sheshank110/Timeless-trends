import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authApi } from '../../features/auth/authApi';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
});

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authApi.forgotPassword(data.email);
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Forgot Password — TIMELESS TRENDS</title></Helmet>

      <div className="text-center mb-10">
        <Link to="/" className="inline-block mb-8">
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TIMELESS</h1>
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TRENDS</h1>
        </Link>

        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-serif text-xl tracking-[0.06em] mb-3">Check Your Email</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              If an account exists with that email address, we've sent a password reset link. Please check your inbox.
            </p>
            <Link to="/login" className="inline-block mt-8 text-sm text-primary font-medium hover:underline">
              ← Back to Sign In
            </Link>
          </motion.div>
        ) : (
          <>
            <h2 className="font-serif text-xl tracking-[0.06em]">Forgot Password</h2>
            <p className="text-sm text-text-secondary mt-2">Enter your email and we'll send you a reset link</p>
          </>
        )}
      </div>

      {!isSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="fp-email" className="block text-xs tracking-[0.1em] uppercase text-text-secondary mb-2">Email Address</label>
            <input
              id="fp-email"
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary text-text-inverse text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </motion.button>

          <div className="text-center">
            <Link to="/login" className="text-sm text-text-secondary hover:text-primary transition-colors">
              ← Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordPage;
