import styles from './WorkoutControls.module.css';

function SearchBar({ value, onChange }) {
  return <label className={styles.search}><span className="sr-only">Search workouts</span><span aria-hidden="true">⌕</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search workouts or exercises" /></label>;
}

export default SearchBar;
