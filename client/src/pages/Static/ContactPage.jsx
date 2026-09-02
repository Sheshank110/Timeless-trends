import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Thank you. Our concierge team will respond within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <>
      <Helmet>
        <title>Contact Concierge — TIMELESS TRENDS</title>
        <meta name="description" content="Reach our customer concierge for bespoke styling assistance, order tracking, and brand inquiries." />
      </Helmet>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-text-muted font-medium mb-2">Customer Concierge</p>
          <h1 className="font-serif text-3xl sm:text-5xl tracking-[0.03em] text-primary mb-3">Get in Touch</h1>
          <p className="text-xs text-text-secondary">We are here to assist with garment styling, orders, and inquiries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 bg-bg-secondary border border-border-light rounded-xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-xs shrink-0">
                  <HiOutlineMail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-primary">Email Inquiries</h4>
                  <p className="text-xs text-text-secondary mt-1">support@timelesstrends.com</p>
                  <p className="text-[11px] text-text-muted">Response within 24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-xs shrink-0">
                  <HiOutlinePhone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-primary">Direct Concierge</h4>
                  <p className="text-xs text-text-secondary mt-1">+91 (022) 4567 8900</p>
                  <p className="text-[11px] text-text-muted">Mon - Sat, 10:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-xs shrink-0">
                  <HiOutlineLocationMarker className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-primary">Flagship Atelier</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    42 High Street Avenue, Palladium District<br />Mumbai, Maharashtra 400013, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 border border-border-light rounded-xl shadow-2xs">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-text-secondary mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-border text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-text-secondary mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-border text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-text-secondary mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Order Inquiry, Sizing, Collaboration..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-border text-xs focus:outline-none focus:border-primary rounded"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-text-secondary mb-1">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our styling team assist you today?"
                  className="w-full px-3.5 py-2.5 border border-border text-xs focus:outline-none focus:border-primary rounded"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.16em] font-medium hover:bg-primary-light transition-all rounded"
              >
                {isSubmitting ? 'Transmitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
