import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['men', 'women', 'teen', 'unisex'],
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price must be positive'],
    },
    salePrice: {
      type: Number,
      min: [0, 'Sale price must be positive'],
    },
    sizes: [{
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    }],
    colors: [{
      name: { type: String, required: true },
      hex: { type: String, required: true },
    }],
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    images: [{
      url: { type: String, required: true },
      publicId: { type: String },
      alt: { type: String, default: '' },
    }],
    thumbnail: {
      url: { type: String },
      publicId: { type: String },
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    material: { type: String, trim: true },
    careInstructions: { type: String, trim: true },
    fit: {
      type: String,
      enum: ['slim', 'regular', 'relaxed', 'oversized', 'tailored', ''],
      default: '',
    },
    brand: {
      type: String,
      default: 'TIMELESS TRENDS',
      trim: true,
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
    isFeatured: { type: Boolean, default: false, index: true },
    isTrending: { type: Boolean, default: false, index: true },
    isNewArrival: { type: Boolean, default: false, index: true },
    isPublished: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for common queries
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ 'rating.average': -1 });

// Generate slug before saving
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true }) + '-' + Date.now().toString(36);
  }
  next();
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for in-stock status
productSchema.virtual('inStock').get(function () {
  return this.stock > 0;
});

const Product = mongoose.model('Product', productSchema);
export default Product;
