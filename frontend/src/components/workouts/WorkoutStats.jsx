import { calculateWorkoutStats } from '../../utils/workoutStats.js';
import styles from './WorkoutStats.module.css';

function WorkoutStats({ workouts, isLoading }) {
  const stats = calculateWorkoutStats(workouts);
  const values = [
    { label: 'Total workouts', value: stats.totals.count, suffix: '' },
    { label: 'Total duration', value: stats.totals.duration, suffix: ' min' },
    { label: 'Calories burned', value: stats.totals.calories.toLocaleString(), suffix: '' },
  ];

  return <div className={styles.grid}>{values.map((item) => <article className={styles.card} key={item.label}><span>{item.label}</span><strong>{isLoading ? '—' : `${item.value}${item.suffix}`}</strong></article>)}</div>;
}

export default WorkoutStats;
