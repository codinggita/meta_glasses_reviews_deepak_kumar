const { Router } = require('express');
const {
  getAverageRating,
  getRatingDistribution,
  getTopReviewers,
  getMonthlyAverage,
  getSentiment,
  getCountryStats,
  getMostHelpful,
} = require('../controllers/statsController');

const router = Router();

router.get('/average-rating', getAverageRating);
router.get('/rating-distribution', getRatingDistribution);
router.get('/top-reviewers', getTopReviewers);
router.get('/monthly-average', getMonthlyAverage);
router.get('/sentiment', getSentiment);
router.get('/country', getCountryStats);
router.get('/most-helpful', getMostHelpful);

module.exports = router;
