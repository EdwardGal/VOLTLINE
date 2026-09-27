import clsx from 'clsx';

import styles from './toast.module.scss';
import { LucideIcon } from '../lucideIcon/lucideIcon';
import { CustomButton } from '../customButton/customButton';

export const Toast = ({ message, type, onClose }) => {
  const isError = type === 'error';

  return (
    <div className={clsx(styles.toast, styles[`toast--${type}`])} role="alert">
      <div className={styles.toast__icon}>{isError ? '!' : '✓'}</div>

      <div className={styles.toast__content}>
        <span className={styles.toast__title}>{isError ? 'Error' : 'Success'}</span>

        <span className={styles.toast__message}>{message}</span>
      </div>

      <CustomButton className={styles.toast__close} onClick={onClose}>
        <LucideIcon className={styles.toast__icon} name="X" />
      </CustomButton>
    </div>
  );
};
