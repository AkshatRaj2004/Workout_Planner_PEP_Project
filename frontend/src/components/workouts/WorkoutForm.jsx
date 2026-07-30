import { useState } from 'react';
import { WORKOUT_CATEGORIES, toFormValues } from '../../utils/workouts.js';
import Loader from '../ui/Loader.jsx';
import styles from './WorkoutForm.module.css';

function WorkoutForm({ initialWorkout, onSubmit, isSubmitting }) {
  const [values, setValues] = useState(() => toFormValues(initialWorkout));
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!values.title.trim() || !values.exercise.trim()) {
      setError('Workout name and exercise are required.');
      return;
    }
    try {
      await onSubmit({
        ...values,
        title: values.title.trim(),
        exercise: values.exercise.trim(),
        notes: values.notes.trim(),
        sets: Number(values.sets || 0),
        reps: Number(values.reps || 0),
        weight: Number(values.weight || 0),
        duration: Number(values.duration),
        calories: Number(values.calories),
      });
    } catch (submitError) {
      setError(submitError.message || 'Unable to save this workout.');
    }
  }

  return <form className={styles.form} onSubmit={handleSubmit} noValidate>
    <div className={styles.grid}><label className={styles.full}>Workout name<input name="title" value={values.title} onChange={handleChange} disabled={isSubmitting} required maxLength="100" /></label><label>Category<select name="category" value={values.category} onChange={handleChange} disabled={isSubmitting}>{WORKOUT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label><label className={styles.full}>Exercise<input name="exercise" value={values.exercise} onChange={handleChange} disabled={isSubmitting} required maxLength="100" /></label><label>Sets<input name="sets" type="number" min="0" value={values.sets} onChange={handleChange} disabled={isSubmitting} /></label><label>Repetitions<input name="reps" type="number" min="0" value={values.reps} onChange={handleChange} disabled={isSubmitting} /></label><label>Weight (kg)<input name="weight" type="number" min="0" step="0.1" value={values.weight} onChange={handleChange} disabled={isSubmitting} /></label><label>Duration (minutes)<input name="duration" type="number" min="1" value={values.duration} onChange={handleChange} disabled={isSubmitting} required /></label><label>Calories burned<input name="calories" type="number" min="0" value={values.calories} onChange={handleChange} disabled={isSubmitting} required /></label><label>Date<input name="date" type="date" value={values.date} onChange={handleChange} disabled={isSubmitting} required /></label><label className={styles.full}>Notes<textarea name="notes" rows="4" value={values.notes} onChange={handleChange} disabled={isSubmitting} maxLength="1000" /></label></div>{error && <p className={styles.error} role="alert">{error}</p>}<button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? <Loader label="Saving" /> : 'Save workout'}</button></form>;
}

export default WorkoutForm;
