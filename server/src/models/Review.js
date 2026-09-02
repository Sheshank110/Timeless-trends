import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      maxlength: 2000,
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews from same user for same product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Static method to calculate average rating for a product
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId, isApproved: true } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  const Product = mongoose.model('Product');
  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      'rating.average': Math.round(result[0].averageRating * 10) / 10,
      'rating.count': result[0].count,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      'rating.average': 0,
      'rating.count': 0,
    });
  }
};

// Update product rating after save/remove
reviewSchema.post('save', function () {
  this.constructor.calculateAverageRating(this.product);
});

reviewSchema.post('findOneAndDelete', function (doc) {
  if (doc) {
    doc.constructor.calculateAverageRating(doc.product);
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
