import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fullName: { type: String, required: [true, 'Full name is required'], trim: true },
    phone: { type: String, required: [true, 'Phone number is required'], trim: true },
    address: { type: String, required: [true, 'Address is required'], trim: true },
    apartment: { type: String, trim: true, default: '' },
    city: { type: String, required: [true, 'City is required'], trim: true },
    state: { type: String, required: [true, 'State is required'], trim: true },
    country: { type: String, default: 'India', trim: true },
    pincode: { type: String, required: [true, 'Pincode is required'], trim: true },
    isDefault: { type: Boolean, default: false },
    label: { type: String, enum: ['home', 'work', 'other'], default: 'home' },
  },
  { timestamps: true }
);

// Ensure only one default address per user
addressSchema.pre('save', async function (next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  next();
});

const Address = mongoose.model('Address', addressSchema);
export default Address;
