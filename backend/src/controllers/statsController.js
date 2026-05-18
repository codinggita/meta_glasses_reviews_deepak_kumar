const Review = require('../models/Review');
const asyncHandler = require('../utils/asyncHandler');

exports.getAverageRating = asyncHandler(async (req, res) => {
  const result = await Review.aggregate([
    { $group: { _id: null, averageRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } },
  ]);

  res.json({
    success: true,
    message: 'Average rating fetched',
    data: result[0] || { averageRating: 0, totalReviews: 0 },
  });
});

exports.getRatingDistribution = asyncHandler(async (req, res) => {
  const result = await Review.aggregate([
    { $group: { _id: '$rating', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    success: true,
    message: 'Rating distribution fetched',
    data: result,
  });
});

exports.getTopReviewers = asyncHandler(async (req, res) => {
  const result = await Review.aggregate([
    { $group: { _id: '$name', reviewCount: { $sum: 1 }, avgHelpfulness: { $avg: '$helpfulness_score' } } },
    { $sort: { reviewCount: -1 } },
    { $limit: 10 },
  ]);

  res.json({
    success: true,
    message: 'Top reviewers fetched',
    data: result,
  });
});

exports.getMonthlyAverage = asyncHandler(async (req, res) => {
  const result = await Review.aggregate([
    {
      $addFields: {
        parsedDate: { $dateFromString: { dateString: '$date', format: '%B %d, %Y' } },
      },
    },
    {
      $group: {
        _id: { year: { $year: '$parsedDate' }, month: { $month: '$parsedDate' } },
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  res.json({
    success: true,
    message: 'Monthly average fetched',
    data: result,
  });
});

exports.getSentiment = asyncHandler(async (req, res) => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: null,
        positive: { $sum: { $cond: ['$is_positive_review', 1, 0] } },
        negative: { $sum: { $cond: ['$is_positive_review', 0, 1] } },
      },
    },
  ]);

  res.json({
    success: true,
    message: 'Sentiment stats fetched',
    data: result[0] || { positive: 0, negative: 0 },
  });
});

exports.getCountryStats = asyncHandler(async (req, res) => {
  const result = await Review.aggregate([
    { $group: { _id: '$country', count: { $sum: 1 }, avgRating: { $avg: '$rating' } } },
    { $sort: { count: -1 } },
  ]);

  res.json({
    success: true,
    message: 'Country stats fetched',
    data: result,
  });
});

exports.getMostHelpful = asyncHandler(async (req, res) => {
  const result = await Review.find()
    .sort({ helpfulness_score: -1 })
    .limit(10)
    .select('reviewID name title helpfulness_score rating');

  res.json({
    success: true,
    message: 'Most helpful reviews fetched',
    data: result,
  });
});
