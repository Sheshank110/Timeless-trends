import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, required: true },
  color: { type: String, default: '' },
});

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  apartment: { type: String, default: '' },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: 'India' },
  pincode: { type: String, required: true },
});

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String, default: '' },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: addressSchema,
    billingAddress: addressSchema,

    // Pricing
    subtotal: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    // Payment
    paymentMethod: {
      type: String,
      required: true,
      enum: ['razorpay', 'cod'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    // Order status
    status: {
      type: String,
      enum: [
        'pending', 'confirmed', 'processing', 'packed',
        'shipped', 'out_for_delivery', 'delivered',
        'cancelled', 'returned',
      ],
      default: 'pending',
      index: true,
    },
    statusHistory: [statusHistorySchema],

    // Shipping
    deliveryMethod: {
      type: String,
      default: 'standard',
    },
    trackingNumber: { type: String },
    estimatedDelivery: { type: Date },
    deliveredAt: { type: Date },

    // Coupon
    couponCode: { type: String },
    couponDiscount: { type: Number, default: 0 },

    // Notes
    customerNote: { type: String, default: '' },
    adminNote: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ paymentStatus: 1 });

// Generate order number before saving
orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderNumber = `TT-${timestamp}-${random}`;
  }

  // Add status to history if changed
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
    });
  }

  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
