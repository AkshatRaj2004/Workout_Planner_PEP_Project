import { matchedData } from 'express-validator';
import Workout from '../models/Workout.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const getWorkouts = catchAsync(async (req, res) => {
  const { category, q, sort } = matchedData(req, { locations: ['query'] });
  const filter = { user_id: req.userId };

  if (category) {
    filter.category = category;
  }

  if (q) {
    const searchExpression = new RegExp(escapeRegExp(q), 'i');
    filter.$or = [{ title: searchExpression }, { exercise: searchExpression }];
  }

  const workouts = await Workout.find(filter).sort({ date: sort === 'oldest' ? 1 : -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: workouts.length,
    data: workouts,
  });
});

export const createWorkout = catchAsync(async (req, res) => {
  const workoutData = matchedData(req, { locations: ['body'] });
  const workout = await Workout.create({ ...workoutData, user_id: req.userId });

  res.status(201).json({
    success: true,
    data: workout,
  });
});

export const getWorkout = catchAsync(async (req, res) => {
  const workout = await Workout.findOne({ _id: req.params.id, user_id: req.userId });

  if (!workout) {
    throw new AppError('Workout not found.', 404);
  }

  res.status(200).json({
    success: true,
    data: workout,
  });
});

export const updateWorkout = catchAsync(async (req, res) => {
  const workoutData = matchedData(req, { locations: ['body'] });
  const workout = await Workout.findOneAndUpdate(
    { _id: req.params.id, user_id: req.userId },
    workoutData,
    { new: true, runValidators: true },
  );

  if (!workout) {
    throw new AppError('Workout not found.', 404);
  }

  res.status(200).json({
    success: true,
    data: workout,
  });
});

export const deleteWorkout = catchAsync(async (req, res) => {
  const workout = await Workout.findOneAndDelete({ _id: req.params.id, user_id: req.userId });

  if (!workout) {
    throw new AppError('Workout not found.', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Workout deleted successfully.',
  });
});
