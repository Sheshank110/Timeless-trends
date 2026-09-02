import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | TIMELESS TRENDS</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-bg px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-8xl sm:text-9xl tracking-[0.1em] text-primary/10 mb-4">
            404
          </h1>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.06em] mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed mb-10">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-3 bg-primary text-text-inverse text-sm tracking-[0.1em] uppercase hover:bg-primary-light transition-colors"
            >
              Go Home
            </Link>
            <Link
              to="/shop"
              className="px-8 py-3 border border-primary text-primary text-sm tracking-[0.1em] uppercase hover:bg-primary hover:text-text-inverse transition-all"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;
