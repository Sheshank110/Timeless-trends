import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ReturnPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Returns & Exchanges Policy — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-serif text-3xl sm:text-4xl text-primary tracking-[0.03em] mb-3">Returns & Exchange Policy</h1>
        <p className="text-xs text-text-muted uppercase tracking-[0.1em] mb-10 pb-4 border-b border-border-light">
          Last Updated: January 2025
        </p>

        <div className="prose prose-sm text-xs text-text-secondary leading-relaxed space-y-6">
          <p>
            We take immense pride in the craftsmanship, material density, and tailored fit of every piece produced under the <strong>TIMELESS TRENDS</strong> label. If a garment doesn't fit as envisioned, we offer an effortless 14-day return and size exchange policy.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">1. Eligibility Criteria for Returns</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Item must be initiated for return within <strong>14 calendar days</strong> of confirmed doorstep delivery.</li>
            <li>Garments must remain unworn, unwashed, unaltered, and free of fragrance or blemishes.</li>
            <li>All original brand swing tags, garment labels, and packaging sleeves must remain intact.</li>
          </ul>

          <h3 className="font-serif text-lg text-primary pt-4">2. Complimentary Doorstep Pickup</h3>
          <p>
            Once a return is logged via your <Link to="/account/orders" className="text-primary underline">Account Orders Dashboard</Link>, our courier representative will arrive at your registered address within 24-48 hours to collect the parcel.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">3. Refund Processing Timelines</h3>
          <p>
            Upon receipt and quality inspection at our atelier, refunds are processed within 2 to 4 business days:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Prepaid Orders (Cards/UPI/NetBanking):</strong> Reversal credited directly to original payment source.</li>
            <li><strong>Cash on Delivery (COD) Orders:</strong> Refund credited directly to your bank account via UPI / NEFT transfer.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicyPage;
