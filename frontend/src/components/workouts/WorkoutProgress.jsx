import { calculateWorkoutStats } from '../../utils/workoutStats.js';
import styles from './WorkoutProgress.module.css';

function WorkoutProgress({ workouts }) {
  const stats = calculateWorkoutStats(workouts);
  return (
    <div className={styles.grid}>
      <section className={styles.panel}>
        <div className={styles.panelHeading}><div><p className="eyebrow">Weekly activity</p><h2>Minutes this week</h2></div><strong>{stats.weekly.duration} min</strong></div>
        <div className={styles.chart} role="img" aria-label={`You logged ${stats.weekly.duration} minutes across the last seven days`}>
          {stats.days.map((day) => <div className={styles.barGroup} key={day.key}><span className={styles.barValue}>{day.duration || ''}</span><div className={styles.barTrack}><div className={styles.bar} style={{ height: `${Math.max((day.duration / stats.maxDailyDuration) * 100, day.duration ? 8 : 2)}%` }} /></div><span>{day.label}</span></div>)}
        </div>
      </section>
      <section className={styles.panel}>
        <div className={styles.panelHeading}><div><p className="eyebrow">Training mix</p><h2>By category</h2></div><strong>{stats.totals.count}</strong></div>
        {stats.categories.length ? <div className={styles.categories}>{stats.categories.map((item) => <div className={styles.category} key={item.category}><div><span>{item.category}</span><small>{item.count} workouts</small></div><div className={styles.progressTrack}><div style={{ width: `${item.percentage}%` }} /></div><b>{item.percentage}%</b></div>)}</div> : <p className={styles.empty}>Add workouts to see your training mix.</p>}
      </section>
    </div>
  );
}

export default WorkoutProgress;
