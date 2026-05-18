const reviewService = require('../services/reviewService');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.getReviews = asyncHandler(async (req, res) => {
  const { reviews, pagination } = await reviewService.getAllReviews(req.query);
  
  res.json({
    success: true,
    message: 'Reviews fetched successfully',
    data: reviews,
    pagination,
  });
});

exports.getReview = asyncHandler(async (req, res) => {
  const review = await reviewService.getReviewById(req.params.id);
  if (!review) {
    throw new AppError('Review not found', 404);
  }
  res.json({
    success: true,
    message: 'Review fetched successfully',
    data: review,
  });
});

exports.createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(req.body);
  res.status(201).json({
    success: true,
    message: 'Review created successfully',
    data: review,
  });
});

exports.updateReview = asyncHandler(async (req, res) => {
  const review = await reviewService.updateReview(req.params.id, req.body);
  if (!review) {
    throw new AppError('Review not found', 404);
  }
  res.json({
    success: true,
    message: 'Review updated successfully',
    data: review,
  });
});

exports.deleteReview = asyncHandler(async (req, res) => {
  const review = await reviewService.deleteReview(req.params.id);
  if (!review) {
    throw new AppError('Review not found', 404);
  }
  res.json({
    success: true,
    message: 'Review deleted successfully',
    data: null,
  });
});
