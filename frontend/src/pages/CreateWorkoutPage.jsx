import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutForm from '../components/workouts/WorkoutForm.jsx';
import useToast from '../hooks/useToast.js';
import { createWorkout } from '../services/workoutService.js';
import { getApiError } from '../utils/getApiError.js';

function CreateWorkoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  async function handleCreate(values) { setIsSubmitting(true); try { await createWorkout(values); showToast('Workout added successfully.'); navigate('/dashboard'); } catch (error) { throw new Error(getApiError(error, 'Unable to create workout.')); } finally { setIsSubmitting(false); } }
  return <section className="page-section"><p className="eyebrow">Workout builder</p><h1>Add a workout</h1><p className="page-copy">Log the work you put in today.</p><WorkoutForm onSubmit={handleCreate} isSubmitting={isSubmitting} /></section>;
}

export default CreateWorkoutPage;
