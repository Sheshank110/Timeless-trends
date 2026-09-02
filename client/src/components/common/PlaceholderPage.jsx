import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

/**
 * Placeholder page for routes that will be fully implemented in later phases.
 * Provides consistent UX with SEO, breadcrumb, and coming-soon messaging.
 */
const PlaceholderPage = ({ title, description, backLink = '/', backLabel = 'Home' }) => {
  return (
    <>
      <Helmet>
        <title>{title} — TIMELESS TRENDS</title>
        <meta name="description" content={description || `${title} — TIMELESS TRENDS`} />
      </Helmet>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.06em] mb-4">{title}</h1>
          <p className="text-text-secondary text-sm leading-relaxed mb-8">
            {description || 'This page is currently being crafted. Check back soon for something beautiful.'}
          </p>
          <Link
            to={backLink}
            className="inline-block px-8 py-3 bg-primary text-text-inverse text-sm tracking-[0.1em] uppercase hover:bg-primary-light transition-colors"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </>
  );
};

export default PlaceholderPage;
