import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="hero">
      <p className="eyebrow">Train with intention</p>
      <h1>Plan every workout. See every win.</h1>
      <p className="hero-copy">A focused space to log training, track effort, and build a routine that lasts.</p>
      <div className="hero-actions"><Link className="button button-primary" to="/signup">Create your plan</Link><Link className="button button-secondary" to="/login">I have an account</Link></div>
      <div className="feature-grid"><article><strong>Log workouts</strong><span>Capture exercises, sets, duration, and more.</span></article><article><strong>Stay consistent</strong><span>Review your effort across every session.</span></article><article><strong>See progress</strong><span>Turn your training history into clear insights.</span></article></div>
    </section>
  );
}

export default HomePage;
