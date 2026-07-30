import { Router } from 'express';
import { body, param, query } from 'express-validator';
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
} from '../controllers/workoutController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { WORKOUT_CATEGORIES } from '../models/Workout.js';

const router = Router();

const workoutFields = [
  'title',
  'category',
  'exercise',
  'sets',
  'reps',
  'weight',
  'duration',
  'calories',
  'notes',
  'date',
];

const createValidators = [
  body('title').trim().isLength({ min: 2, max: 100 }).withMessage('Workout name must be 2 to 100 characters.'),
  body('category').isIn(WORKOUT_CATEGORIES).withMessage('Choose a valid category.'),
  body('exercise').trim().isLength({ min: 2, max: 100 }).withMessage('Exercise must be 2 to 100 characters.'),
  body('sets').optional().isInt({ min: 0, max: 1000 }).toInt().withMessage('Sets must be a positive whole number.'),
  body('reps').optional().isInt({ min: 0, max: 10000 }).toInt().withMessage('Repetitions must be a positive whole number.'),
  body('weight').optional().isFloat({ min: 0, max: 10000 }).toFloat().withMessage('Weight must be a positive number.'),
  body('duration').isInt({ min: 1, max: 1440 }).toInt().withMessage('Duration must be 1 to 1440 minutes.'),
  body('calories').isFloat({ min: 0, max: 100000 }).toFloat().withMessage('Calories must be a positive number.'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters.'),
  body('date').isISO8601().toDate().withMessage('Provide a valid workout date.'),
];

const updateValidators = [
  body().custom((value, { req }) => {
    if (!Object.keys(req.body).some((key) => workoutFields.includes(key))) {
      throw new Error('Provide at least one workout field to update.');
    }
    return true;
  }),
  body('title').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Workout name must be 2 to 100 characters.'),
  body('category').optional().isIn(WORKOUT_CATEGORIES).withMessage('Choose a valid category.'),
  body('exercise').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Exercise must be 2 to 100 characters.'),
  body('sets').optional().isInt({ min: 0, max: 1000 }).toInt().withMessage('Sets must be a positive whole number.'),
  body('reps').optional().isInt({ min: 0, max: 10000 }).toInt().withMessage('Repetitions must be a positive whole number.'),
  body('weight').optional().isFloat({ min: 0, max: 10000 }).toFloat().withMessage('Weight must be a positive number.'),
  body('duration').optional().isInt({ min: 1, max: 1440 }).toInt().withMessage('Duration must be 1 to 1440 minutes.'),
  body('calories').optional().isFloat({ min: 0, max: 100000 }).toFloat().withMessage('Calories must be a positive number.'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters.'),
  body('date').optional().isISO8601().toDate().withMessage('Provide a valid workout date.'),
];

const idValidator = param('id').isMongoId().withMessage('Workout ID is invalid.');

router.use(requireAuth);

router.get(
  '/',
  query('category').optional().isIn(WORKOUT_CATEGORIES).withMessage('Category is invalid.'),
  query('q').optional().trim().isLength({ min: 1, max: 80 }).withMessage('Search must be 1 to 80 characters.'),
  query('sort').optional().isIn(['newest', 'oldest']).withMessage('Sort must be newest or oldest.'),
  validateRequest,
  getWorkouts,
);
router.post('/', createValidators, validateRequest, createWorkout);
router.get('/:id', idValidator, validateRequest, getWorkout);
router.patch('/:id', idValidator, updateValidators, validateRequest, updateWorkout);
router.delete('/:id', idValidator, validateRequest, deleteWorkout);

export default router;
