import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    // Singleton pattern — only one document
    _id: { type: String, default: 'site-settings' },

    // Announcement
    announcementText: { type: String, default: 'FREE SHIPPING ON ORDERS ABOVE ₹999' },
    isAnnouncementActive: { type: Boolean, default: true },

    // Contact
    whatsappNumber: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },

    // Social links
    socialLinks: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      pinterest: { type: String, default: '' },
    },

    // Shipping configuration
    shipping: {
      freeShippingThreshold: { type: Number, default: 999 },
      baseCharge: { type: Number, default: 79 },
      expressCharge: { type: Number, default: 149 },
      // Region-based charges
      regionCharges: [{
        region: { type: String },
        charge: { type: Number },
      }],
    },

    // Tax
    taxRate: { type: Number, default: 0 }, // GST percentage, 0 means included in price

    // General
    maintenanceMode: { type: Boolean, default: false },
    currency: { type: String, default: 'INR' },
    currencySymbol: { type: String, default: '₹' },
  },
  { timestamps: true }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
