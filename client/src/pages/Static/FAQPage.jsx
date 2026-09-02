import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HiChevronDown } from 'react-icons/hi';

const faqs = [
  {
    category: 'Orders & Shipping',
    items: [
      {
        q: 'How long does shipping take across India?',
        a: 'All orders are dispatched from our Mumbai atelier within 24-48 business hours. Delivery typically takes 2-4 business days for metropolitan cities and 3-5 business days for regional locations.',
      },
      {
        q: 'Is there a minimum order value for free delivery?',
        a: 'Yes, we offer complimentary Express Delivery on all orders above ₹999. For orders below ₹999, a flat shipping charge of ₹79 is applied at checkout.',
      },
      {
        q: 'Do you offer Cash on Delivery (COD)?',
        a: 'Yes, Cash on Delivery is available across most serviceable pin codes in India with zero additional surcharge.',
      },
    ],
  },
  {
    category: 'Sizing & Garment Fit',
    items: [
      {
        q: 'How do your oversized garments fit compared to standard sizing?',
        a: 'Our oversized garments are intentionally tailored with dropped shoulders and a wider chest silhouette. We recommend selecting your true size for the intended relaxed editorial look, or sizing down one size for a standard fit.',
      },
      {
        q: 'Where can I find exact measurements?',
        a: 'Each product page includes an interactive "Size Guide" button featuring detailed chest, waist, and length measurements in inches and centimeters.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a hassle-free 14-day return and exchange window for all unworn, unwashed garments with original tags and packaging intact.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Navigate to "My Account" > "My Orders", select the order, and tap "Request Return / Exchange". Our courier partner will schedule a complimentary doorstep pickup.',
      },
    ],
  },
];

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[850px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-text-muted font-medium mb-2">Help Center</p>
          <h1 className="font-serif text-3xl sm:text-5xl text-primary tracking-[0.03em] mb-3">Frequently Asked Questions</h1>
          <p className="text-xs text-text-secondary">Everything you need to know about purchasing, sizing, and deliveries.</p>
        </div>

        <div className="space-y-12">
          {faqs.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-4">
              <h2 className="font-serif text-xl text-primary border-b border-border pb-2">
                {cat.category}
              </h2>
              <div className="divide-y divide-border-light">
                {cat.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];
                  return (
                    <div key={item.q} className="py-4">
                      <button
                        onClick={() => toggleItem(catIdx, itemIdx)}
                        className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-primary hover:text-text-secondary transition-colors"
                      >
                        <span>{item.q}</span>
                        <HiChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <p className="mt-3 text-xs text-text-secondary leading-relaxed pr-6">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQPage;
