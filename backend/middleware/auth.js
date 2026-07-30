import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const requireAuth = catchAsync(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    throw new AppError('Authentication is required.', 401);
  }

  if (!env.jwtSecret) {
    throw new AppError('JWT_SECRET is not configured.', 500);
  }

  let payload;

  try {
    payload = jwt.verify(authorization.slice(7), env.jwtSecret);
  } catch {
    throw new AppError('Your session is invalid or has expired. Please sign in again.', 401);
  }

  const user = await User.findById(payload.sub);

  if (!user) {
    throw new AppError('This account no longer exists.', 401);
  }

  req.user = user;
  req.userId = user._id;
  next();
});
