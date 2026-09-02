import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Coupon code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: { type: String, trim: true, default: '' },
    type: {
      type: String,
      required: true,
      enum: ['percentage', 'fixed'],
    },
    value: {
      type: Number,
      required: [true, 'Coupon value is required'],
      min: [0, 'Value must be positive'],
    },
    minOrderAmount: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: null },
    validFrom: { type: Date, default: Date.now },
    validTo: { type: Date, required: [true, 'Expiry date is required'] },
    usageLimit: { type: Number, default: null },
    usedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    applicableCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    applicableGenders: [{ type: String, enum: ['men', 'women', 'teen'] }],
  },
  { timestamps: true }
);

couponSchema.index({ code: 1 });
couponSchema.index({ validTo: 1 });

// Check if coupon is valid
couponSchema.methods.isValid = function () {
  const now = new Date();
  return (
    this.isActive &&
    now >= this.validFrom &&
    now <= this.validTo &&
    (this.usageLimit === null || this.usedCount < this.usageLimit)
  );
};

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
