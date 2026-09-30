import clsx from 'clsx';
import { LucideIcon } from '../lucideIcon/lucideIcon';
import { CustomButton } from '../customButton/customButton';
import styles from './toast.module.scss';

export const Toast = ({ message, type = 'success', onClose }) => {
  const isError = type === 'error';

  return (
    <div className={clsx(styles.toast, styles[`toast--${type}`])} role="alert">
      <div className={clsx(styles.toast__statusIcon, styles[`toast__statusIcon--${type}`])}>
        <LucideIcon name={isError ? 'AlertCircle' : 'CheckCircle2'} size={20} />
      </div>

      <div className={styles.toast__content}>
        <span className={styles.toast__title}>{isError ? 'Error' : 'Success'}</span>
        <span className={styles.toast__message}>{message}</span>
      </div>

      <CustomButton className={styles.toast__close} variant="clear" onClick={onClose}>
        <LucideIcon name="X" size={16} />
      </CustomButton>
    </div>
  );
};
