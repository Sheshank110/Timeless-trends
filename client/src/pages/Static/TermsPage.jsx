import { Helmet } from 'react-helmet-async';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-serif text-3xl sm:text-4xl text-primary tracking-[0.03em] mb-3">Terms & Conditions</h1>
        <p className="text-xs text-text-muted uppercase tracking-[0.1em] mb-10 pb-4 border-b border-border-light">
          Last Updated: January 2025
        </p>

        <div className="prose prose-sm text-xs text-text-secondary leading-relaxed space-y-6">
          <p>
            Welcome to <strong>TIMELESS TRENDS</strong>. By accessing or using our website, purchasing our apparel, or utilizing our AI stylist features, you agree to be bound by the following terms of service.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">1. Product Descriptions & Pricing</h3>
          <p>
            We take utmost care in accurately displaying the colors, textures, and tailoring details of our garments. However, actual colors may slightly vary depending on screen calibration. All prices are listed in Indian Rupees (INR) and include applicable GST taxes.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">2. Order Acceptance & Fulfillment</h3>
          <p>
            An order confirmation constitutes an acknowledgement of your purchase request. We reserve the right to decline or cancel orders in cases of pricing inaccuracies, suspected fraudulent activity, or unexpected stock discrepancies.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">3. Intellectual Property</h3>
          <p>
            All content, brand identity, photographic edits, lookbook imagery, customizer designs, and text trademarks are the exclusive proprietary assets of TIMELESS TRENDS.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">4. Governing Law</h3>
          <p>
            These terms and any disputes arising from transactions on this site shall be governed by and construed in accordance with the laws of India, subject to Mumbai jurisdiction.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
