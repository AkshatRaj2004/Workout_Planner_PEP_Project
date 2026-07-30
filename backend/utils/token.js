import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export function createToken(userId) {
  if (!env.jwtSecret) {
    throw new Error('JWT_SECRET is required. Add it to backend/.env.');
  }

  return jwt.sign({ sub: userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}
