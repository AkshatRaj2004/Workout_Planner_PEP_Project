import styles from './Toast.module.css';

function Toast({ message, type, onDismiss }) {
  return <div className={`${styles.toast} ${styles[type] || styles.success}`} role="status"><span>{type === 'error' ? '!' : '✓'}</span><p>{message}</p><button type="button" onClick={onDismiss} aria-label="Dismiss notification">×</button></div>;
}

export default Toast;
