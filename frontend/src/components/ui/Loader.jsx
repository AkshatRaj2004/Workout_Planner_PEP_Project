import styles from './Loader.module.css';

function Loader({ label = 'Loading...' }) {
  return <div className={styles.loader} role="status"><span className={styles.spinner} /><span>{label}</span></div>;
}

export default Loader;
