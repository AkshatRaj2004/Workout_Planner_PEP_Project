import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationDialog from '../components/ui/ConfirmationDialog.jsx';
import Loader from '../components/ui/Loader.jsx';
import FilterPanel from '../components/workouts/FilterPanel.jsx';
import SearchBar from '../components/workouts/SearchBar.jsx';
import WorkoutCard from '../components/workouts/WorkoutCard.jsx';
import WorkoutProgress from '../components/workouts/WorkoutProgress.jsx';
import WorkoutStats from '../components/workouts/WorkoutStats.jsx';
import useToast from '../hooks/useToast.js';
import useWorkouts from '../hooks/useWorkouts.js';
import { deleteWorkout } from '../services/workoutService.js';
import { getApiError } from '../utils/getApiError.js';
import styles from './DashboardPage.module.css';

function DashboardPage() {
  const [search, setSearch] = useState(''); const [category, setCategory] = useState(''); const [sort, setSort] = useState('newest'); const [pendingDelete, setPendingDelete] = useState(null); const { showToast } = useToast();
  const filters = useMemo(() => ({ ...(search.trim() ? { q: search.trim() } : {}), ...(category ? { category } : {}), sort }), [search, category, sort]);
  const allFilters = useMemo(() => ({ sort: 'newest' }), []);
  const { workouts, isLoading, error, reload } = useWorkouts(filters);
  const { workouts: allWorkouts, isLoading: isStatsLoading, reload: reloadStats } = useWorkouts(allFilters);
  async function handleDelete() { try { await deleteWorkout(pendingDelete._id); setPendingDelete(null); showToast('Workout deleted.'); reload(); reloadStats(); } catch (requestError) { showToast(getApiError(requestError, 'Unable to delete workout.'), 'error'); } }
  return <section className="page-section"><div className={styles.header}><div><p className="eyebrow">Your training</p><h1>Dashboard</h1><p className="page-copy">Plan it. Do it. Keep the momentum.</p></div><Link className="button button-primary" to="/workouts/new">Add workout</Link></div><WorkoutStats workouts={allWorkouts} isLoading={isStatsLoading} /><WorkoutProgress workouts={allWorkouts} /><div className={styles.weekly}><span>This week</span><strong>{isStatsLoading ? 'Loading summary…' : `${allWorkouts.filter((workout) => new Date(workout.date) >= new Date(Date.now() - 6 * 86400000)).length} sessions logged`}</strong></div><div className={styles.controls}><SearchBar value={search} onChange={setSearch} /><FilterPanel category={category} sort={sort} onCategoryChange={setCategory} onSortChange={setSort} /></div>{isLoading ? <div className={styles.state}><Loader label="Loading workouts" /></div> : error ? <div className={styles.state}><p>{error}</p><button className="button button-secondary" type="button" onClick={reload}>Try again</button></div> : workouts.length ? <div className={styles.list}>{workouts.map((workout) => <WorkoutCard key={workout._id} workout={workout} onDelete={setPendingDelete} />)}</div> : <div className={styles.state}><span className={styles.emptyIcon}>⌁</span><h2>No workouts found</h2><p>{search || category ? 'Try changing your search or filters.' : 'Your next workout starts with one entry.'}</p>{!search && !category && <Link className="button button-primary" to="/workouts/new">Add your first workout</Link>}</div>}{pendingDelete && <ConfirmationDialog title="Delete workout?" message={`Delete “${pendingDelete.title}”? This cannot be undone.`} confirmLabel="Delete workout" onConfirm={handleDelete} onClose={() => setPendingDelete(null)} />}</section>;
}

export default DashboardPage;
