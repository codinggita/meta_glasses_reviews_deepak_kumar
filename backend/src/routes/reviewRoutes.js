const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validateMiddleware');
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const router = Router();

router.get('/', getReviews);
router.get('/:id', getReview);

router.post(
  '/',
  protect,
  authorize('admin'),
  [body('reviewID').notEmpty().withMessage('reviewID is required')],
  validate,
  createReview,
);

router.patch('/:id', protect, authorize('admin'), updateReview);
router.delete('/:id', protect, authorize('admin'), deleteReview);

module.exports = router;
