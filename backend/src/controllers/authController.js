const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token,
    },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.loginUser(req.body);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token,
    },
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'User profile fetched',
    data: req.user,
  });
});
