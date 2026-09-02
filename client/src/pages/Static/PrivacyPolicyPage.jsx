import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-serif text-3xl sm:text-4xl text-primary tracking-[0.03em] mb-3">Privacy Policy</h1>
        <p className="text-xs text-text-muted uppercase tracking-[0.1em] mb-10 pb-4 border-b border-border-light">
          Last Updated: January 2025
        </p>

        <div className="prose prose-sm text-xs text-text-secondary leading-relaxed space-y-6">
          <p>
            At <strong>TIMELESS TRENDS</strong>, safeguarding your personal data and privacy is paramount to our brand values. This Privacy Policy outlines how your personal information is collected, used, and secured when you browse our boutique e-commerce platform.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">1. Information We Collect</h3>
          <p>
            We collect personal information necessary to process your transactions, including your full name, shipping and billing addresses, email address, phone number, and encrypted payment tokenization records via Razorpay. We do not store raw card numbers on our servers.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">2. Utilization of Data</h3>
          <p>
            Your information is strictly utilized to dispatch garments, provide live delivery tracking, authenticate your account, offer AI-powered style recommendations upon request, and deliver customer support.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">3. Cookies & Analytical Tracking</h3>
          <p>
            We use secure HTTP-only cookies to maintain your login session, remember saved items in your shopping bag, and understand general platform browsing behavior to improve site speed and responsiveness.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">4. Data Protection & Security</h3>
          <p>
            All network communication is encrypted with 256-bit SSL/TLS protocol. Access to database records is restricted to authorized personnel under stringent role-based access control.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
