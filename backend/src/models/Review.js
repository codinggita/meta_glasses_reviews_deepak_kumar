const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewID: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  verifiedPurchase: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
  },
  helpful: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: '',
  },
  review: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
    index: true,
  },
  reviewImage: {
    type: String,
    default: '',
  },
  helpfulness_score: {
    type: Number,
    default: 0,
  },
  is_positive_review: {
    type: Boolean,
    default: true,
  },
  profile: {
    type: String,
    default: '',
  },
  reviewLink: {
    type: String,
    default: '',
  },
  helpful_aug: {
    type: Number,
    default: 0,
  },
});

reviewSchema.index({ rating: 1 });
reviewSchema.index({ country: 1, rating: 1 });
reviewSchema.index({ is_positive_review: 1 });
reviewSchema.index({ helpfulness_score: -1 });
reviewSchema.index({ date: -1 });
reviewSchema.index({ title: 'text', review: 'text' });

module.exports = mongoose.model('Review', reviewSchema);
