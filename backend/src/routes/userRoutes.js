const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validateMiddleware');
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
  getProfile,
  updateProfile,
  getSavedReviews,
  saveReview,
  removeSavedReview,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = Router();

router.get('/me', protect, getProfile);
router.patch('/me', protect, updateProfile);

router.get('/me/saved', protect, getSavedReviews);
router.post(
  '/me/saved',
  protect,
  [body('reviewId').notEmpty().withMessage('reviewId is required')],
  validate,
  saveReview,
);
router.delete('/me/saved/:reviewId', protect, removeSavedReview);

router.get('/', protect, authorize('admin'), getUsers);
router.patch('/:id', protect, authorize('admin'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
