import { Link } from 'react-router-dom';
import styles from './WorkoutCard.module.css';

function WorkoutCard({ workout, onDelete }) {
  const date = new Date(workout.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const details = [
    `${workout.duration} min`,
    `${workout.calories} cal`,
    workout.sets ? `${workout.sets} sets × ${workout.reps} reps` : null,
    workout.weight ? `${workout.weight} kg` : null,
  ].filter(Boolean);

  return <article className={styles.card}>
    <div className={styles.topline}><span className={styles.category}>{workout.category}</span><time dateTime={workout.date}>{date}</time></div>
    <h3>{workout.title}</h3><p className={styles.exercise}>{workout.exercise}</p>
    <div className={styles.details}>{details.map((detail) => <span key={detail}>{detail}</span>)}</div>
    {workout.notes && <p className={styles.notes}>{workout.notes}</p>}
    <div className={styles.actions}><Link to={`/workouts/${workout._id}/edit`}>Edit</Link><button type="button" onClick={() => onDelete(workout)}>Delete</button></div>
  </article>;
}

export default WorkoutCard;
