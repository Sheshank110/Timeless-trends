import { Helmet } from 'react-helmet-async';

const ShippingPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Shipping Policy — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-serif text-3xl sm:text-4xl text-primary tracking-[0.03em] mb-3">Shipping & Delivery Policy</h1>
        <p className="text-xs text-text-muted uppercase tracking-[0.1em] mb-10 pb-4 border-b border-border-light">
          Last Updated: January 2025
        </p>

        <div className="prose prose-sm text-xs text-text-secondary leading-relaxed space-y-6">
          <p>
            At <strong>TIMELESS TRENDS</strong>, we partner with premier express courier networks across India to ensure your garments reach you swiftly, pristine, and securely packaged in eco-conscious bespoke packaging.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">1. Dispatch Timelines</h3>
          <p>
            All standard and customized orders are tailored, inspected, and dispatched from our primary atelier within 24 to 48 business hours of order placement (excluding Sundays and national holidays).
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">2. Delivery Charges & Thresholds</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Orders above ₹999:</strong> FREE Complimentary Express Ground Delivery.</li>
            <li><strong>Orders below ₹999:</strong> Flat shipping fee of ₹79 applied at checkout.</li>
            <li><strong>Cash on Delivery (COD):</strong> Zero extra COD handling fee.</li>
          </ul>

          <h3 className="font-serif text-lg text-primary pt-4">3. Transit Durations</h3>
          <p>
            • <strong>Metro Cities (Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Kolkata):</strong> 2 to 3 business days.<br />
            • <strong>Tier 2 & Regional Locations:</strong> 3 to 5 business days.
          </p>

          <h3 className="font-serif text-lg text-primary pt-4">4. Live Shipment Tracking</h3>
          <p>
            Upon courier handover, you will receive an SMS and email containing your active Tracking AWB number. You can also view live real-time milestone progress via our internal <a href="/account/orders" className="text-primary underline">Order Tracking portal</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicyPage;
