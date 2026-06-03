const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (data) => {
  const { name, email, password } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return { user, token };
};

exports.loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken(user._id);
  return { user, token };
};
