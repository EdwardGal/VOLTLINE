import clsx from 'clsx';

import styles from './toast.module.scss';

export const Toast = ({ message, type, onClose }) => {
  const isError = type === 'error';

  return (
    <div className={clsx(styles.toast, styles[`toast--${type}`])} role="alert">
      <div className={styles.toast__icon}>{isError ? '!' : '✓'}</div>

      <div className={styles.toast__content}>
        <span className={styles.toast__title}>{isError ? 'Error' : 'Success'}</span>

        <span className={styles.toast__message}>{message}</span>
      </div>

      <button
        className={styles.toast__close}
        type="button"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};
