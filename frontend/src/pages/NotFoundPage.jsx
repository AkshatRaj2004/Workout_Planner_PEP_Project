import { Link } from 'react-router-dom';

function NotFoundPage() {
  return <section className="not-found"><p className="eyebrow">404</p><h1>That page is off track.</h1><p>We could not find the page you requested.</p><Link className="button button-primary" to="/">Return home</Link></section>;
}

export default NotFoundPage;
