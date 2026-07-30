import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import WorkoutForm from '../components/workouts/WorkoutForm.jsx';
import Loader from '../components/ui/Loader.jsx';
import useToast from '../hooks/useToast.js';
import { getWorkout, updateWorkout } from '../services/workoutService.js';
import { getApiError } from '../utils/getApiError.js';

function EditWorkoutPage() {
  const { id } = useParams(); const navigate = useNavigate(); const { showToast } = useToast(); const [workout, setWorkout] = useState(null); const [error, setError] = useState(''); const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => { getWorkout(id).then(setWorkout).catch((requestError) => setError(getApiError(requestError, 'Unable to load workout.'))); }, [id]);
  async function handleUpdate(values) { setIsSubmitting(true); try { await updateWorkout(id, values); showToast('Workout updated successfully.'); navigate('/dashboard'); } catch (requestError) { throw new Error(getApiError(requestError, 'Unable to update workout.')); } finally { setIsSubmitting(false); } }
  if (error) return <section className="page-section"><h1>Workout unavailable</h1><p className="page-copy">{error}</p><Link className="button button-secondary" to="/dashboard">Back to dashboard</Link></section>;
  if (!workout) return <section className="page-section"><Loader label="Loading workout" /></section>;
  return <section className="page-section"><p className="eyebrow">Workout builder</p><h1>Edit workout</h1><WorkoutForm initialWorkout={workout} onSubmit={handleUpdate} isSubmitting={isSubmitting} /></section>;
}

export default EditWorkoutPage;
