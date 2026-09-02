import mongoose from 'mongoose';

const outfitItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  category: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  price: { type: Number, default: 0 },
  color: { type: String, default: '' },
  size: { type: String, default: '' },
});

const outfitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Outfit name is required'],
      trim: true,
      maxlength: 100,
    },
    items: [outfitItemSchema],
    isPublic: { type: Boolean, default: false },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Outfit = mongoose.model('Outfit', outfitSchema);
export default Outfit;
