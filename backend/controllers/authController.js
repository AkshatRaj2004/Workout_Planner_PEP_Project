import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { serializeUser } from '../utils/serializeUser.js';
import { createToken } from '../utils/token.js';

function sendAuthResponse(res, statusCode, user) {
  const token = createToken(user._id.toString());

  res.status(statusCode).json({
    success: true,
    token,
    user: serializeUser(user),
  });
}

export const signup = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError('An account with this email already exists.', 409);
  }

  const user = await User.create({ name, email, password });
  sendAuthResponse(res, 201, user);
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password.', 401);
  }

  sendAuthResponse(res, 200, user);
});
