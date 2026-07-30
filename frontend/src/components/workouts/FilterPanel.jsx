import { WORKOUT_CATEGORIES } from '../../utils/workouts.js';
import styles from './WorkoutControls.module.css';

function FilterPanel({ category, sort, onCategoryChange, onSortChange }) {
  return <div className={styles.filters}>
    <label>Category<select value={category} onChange={(event) => onCategoryChange(event.target.value)}><option value="">All categories</option>{WORKOUT_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
    <label>Order<select value={sort} onChange={(event) => onSortChange(event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
  </div>;
}

export default FilterPanel;
