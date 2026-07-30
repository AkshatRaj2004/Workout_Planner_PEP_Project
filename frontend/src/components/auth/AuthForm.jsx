import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import useToast from '../../hooks/useToast.js';
import { getApiError } from '../../utils/getApiError.js';
import Loader from '../ui/Loader.jsx';
import styles from './AuthForm.module.css';

const initialValues = { name: '', email: '', password: '' };

function AuthForm({ mode }) {
  const isSignup = mode === 'signup';
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (isSignup && values.name.trim().length < 2) {
      setError('Please enter a name with at least 2 characters.');
      return;
    }

    if (values.password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = isSignup ? values : { email: values.email, password: values.password };
      const user = isSignup ? await signUp(payload) : await signIn(payload);
      showToast(`Welcome${user.name ? `, ${user.name}` : ''}!`);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (requestError) {
      const message = getApiError(requestError, 'Unable to authenticate. Please try again.');
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">{isSignup ? 'Start today' : 'Welcome back'}</p>
        <h1>{isSignup ? 'Build a stronger routine' : 'Log in to continue'}</h1>
        <p>{isSignup ? 'Create your account and begin tracking every session.' : 'Pick up where your last workout left off.'}</p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {isSignup && <label>Name<input name="name" value={values.name} onChange={handleChange} autoComplete="name" disabled={isSubmitting} required /></label>}
          <label>Email<input name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" disabled={isSubmitting} required /></label>
          <label>Password<input name="password" type="password" value={values.password} onChange={handleChange} autoComplete={isSignup ? 'new-password' : 'current-password'} disabled={isSubmitting} required /></label>
          {isSignup && <small>Use 8+ characters with uppercase, lowercase, and a number.</small>}
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? <Loader label="Please wait" /> : isSignup ? 'Create account' : 'Log in'}</button>
        </form>
        <p className={styles.switch}>{isSignup ? 'Already have an account?' : 'New to Workout Planner?'} <Link to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Log in' : 'Create one'}</Link></p>
      </div>
    </section>
  );
}

export default AuthForm;
