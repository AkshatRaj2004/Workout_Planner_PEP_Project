import { Router } from 'express';
import { body } from 'express-validator';
import { login, signup } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

const emailValidator = body('email')
  .trim()
  .isEmail()
  .withMessage('Please provide a valid email address.')
  .normalizeEmail();

const passwordValidator = body('password')
  .isString()
  .withMessage('Password is required.')
  .isLength({ min: 8, max: 72 })
  .withMessage('Password must be between 8 and 72 characters.');

router.post(
  '/signup',
  body('name')
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('Name must be between 2 and 60 characters.'),
  emailValidator,
  passwordValidator
    .matches(/[a-z]/)
    .withMessage('Password must include a lowercase letter.')
    .matches(/[A-Z]/)
    .withMessage('Password must include an uppercase letter.')
    .matches(/\d/)
    .withMessage('Password must include a number.'),
  validateRequest,
  signup,
);

router.post('/login', emailValidator, passwordValidator, validateRequest, login);

export default router;
