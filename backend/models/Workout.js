import mongoose from 'mongoose';

export const WORKOUT_CATEGORIES = [
  'Strength',
  'Cardio',
  'Flexibility',
  'Mobility',
  'Sports',
  'Other',
];

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Workout name is required.'],
      trim: true,
      minlength: [2, 'Workout name must contain at least 2 characters.'],
      maxlength: [100, 'Workout name cannot exceed 100 characters.'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: {
        values: WORKOUT_CATEGORIES,
        message: 'Category is not supported.',
      },
    },
    exercise: {
      type: String,
      required: [true, 'Exercise is required.'],
      trim: true,
      minlength: [2, 'Exercise must contain at least 2 characters.'],
      maxlength: [100, 'Exercise cannot exceed 100 characters.'],
    },
    sets: {
      type: Number,
      min: [0, 'Sets cannot be negative.'],
      default: 0,
    },
    reps: {
      type: Number,
      min: [0, 'Repetitions cannot be negative.'],
      default: 0,
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative.'],
      default: 0,
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required.'],
      min: [1, 'Duration must be at least 1 minute.'],
    },
    calories: {
      type: Number,
      required: [true, 'Calories burned is required.'],
      min: [0, 'Calories burned cannot be negative.'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters.'],
      default: '',
    },
    date: {
      type: Date,
      required: [true, 'Workout date is required.'],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

workoutSchema.index({ user_id: 1, date: -1 });
workoutSchema.index({ user_id: 1, category: 1, date: -1 });

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
