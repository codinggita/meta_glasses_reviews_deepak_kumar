const User = require('../models/User');
const Review = require('../models/Review');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.getProfile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Profile fetched',
    data: req.user,
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  );

  res.json({
    success: true,
    message: 'Profile updated',
    data: user,
  });
});

exports.getSavedReviews = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const reviews = await Review.find({ reviewID: { $in: user.savedReviews } });

  res.json({
    success: true,
    message: 'Saved reviews fetched',
    data: reviews,
  });
});

exports.saveReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.body;
  const review = await Review.findOne({ reviewID: reviewId });
  if (!review) {
    throw new AppError('Review not found', 404);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { savedReviews: reviewId } },
    { new: true },
  );

  res.json({
    success: true,
    message: 'Review saved',
    data: user.savedReviews,
  });
});

exports.removeSavedReview = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { savedReviews: req.params.reviewId } },
    { new: true },
  );

  res.json({
    success: true,
    message: 'Review removed from saved',
    data: user.savedReviews,
  });
});

exports.getUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const total = await User.countDocuments();
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    message: 'Users fetched',
    data: users,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { name, role, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, role, avatar },
    { new: true, runValidators: true },
  );
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'User updated',
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'User deleted',
    data: null,
  });
});
