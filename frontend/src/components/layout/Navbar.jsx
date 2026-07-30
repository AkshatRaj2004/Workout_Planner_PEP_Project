import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import styles from './Navbar.module.css';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();

  function handleLogout() {
    signOut();
    navigate('/login');
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link className={styles.brand} to="/">
          <span className={styles.logo} aria-hidden="true">W</span>
          <span>Workout Planner</span>
        </Link>
        <div className={styles.links}>
          <NavLink className={({ isActive }) => (isActive ? styles.active : styles.link)} to="/">
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink className={({ isActive }) => (isActive ? styles.active : styles.link)} to="/dashboard">
                Dashboard
              </NavLink>
              <button className={styles.logout} type="button" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <NavLink className={({ isActive }) => (isActive ? styles.active : styles.link)} to="/login">
                Log in
              </NavLink>
              <Link className={styles.signup} to="/signup">Get started</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
