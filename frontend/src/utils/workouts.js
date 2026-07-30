export const WORKOUT_CATEGORIES = ['Strength', 'Cardio', 'Flexibility', 'Mobility', 'Sports', 'Other'];

export function toFormValues(workout) {
  return {
    title: workout?.title || '',
    category: workout?.category || 'Strength',
    exercise: workout?.exercise || '',
    sets: workout?.sets ?? 0,
    reps: workout?.reps ?? 0,
    weight: workout?.weight ?? 0,
    duration: workout?.duration ?? '',
    calories: workout?.calories ?? '',
    date: workout?.date ? new Date(workout.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    notes: workout?.notes || '',
  };
}
