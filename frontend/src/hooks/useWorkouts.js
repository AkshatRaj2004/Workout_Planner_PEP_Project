import { useCallback, useEffect, useState } from 'react';
import { getApiError } from '../utils/getApiError.js';
import { getWorkouts } from '../services/workoutService.js';

function useWorkouts(filters) {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadWorkouts = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      setWorkouts(await getWorkouts(filters));
    } catch (requestError) {
      setError(getApiError(requestError, 'Unable to load workouts.'));
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return { workouts, isLoading, error, reload: loadWorkouts };
}

export default useWorkouts;
