import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { authApi } from '../../features/auth/authApi';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

const EmailVerificationPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying'); // verifying | success | error

  useEffect(() => {
    const verify = async () => {
      try {
        await authApi.verifyEmail(token);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };
    if (token) verify();
  }, [token]);

  return (
    <>
      <Helmet><title>Email Verification — TIMELESS TRENDS</title></Helmet>
      <div className="text-center">
        <Link to="/" className="inline-block mb-8">
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TIMELESS</h1>
          <h1 className="font-serif text-2xl tracking-[0.2em] text-primary">TRENDS</h1>
        </Link>

        {status === 'verifying' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
              ))}
            </div>
            <h2 className="font-serif text-xl">Verifying your email...</h2>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <HiOutlineCheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
            <h2 className="font-serif text-xl mb-3">Email Verified!</h2>
            <p className="text-sm text-text-secondary mb-8">Your email has been verified successfully. You can now enjoy all features.</p>
            <Link to="/" className="inline-block px-8 py-3 bg-primary text-text-inverse text-sm tracking-[0.1em] uppercase">
              Start Shopping
            </Link>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <HiOutlineXCircle className="w-16 h-16 text-error mx-auto mb-6" />
            <h2 className="font-serif text-xl mb-3">Verification Failed</h2>
            <p className="text-sm text-text-secondary mb-8">The verification link is invalid or has expired. Please try again.</p>
            <Link to="/login" className="inline-block px-8 py-3 bg-primary text-text-inverse text-sm tracking-[0.1em] uppercase">
              Go to Login
            </Link>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default EmailVerificationPage;
