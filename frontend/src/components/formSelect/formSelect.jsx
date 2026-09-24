import clsx from 'clsx';
import styles from './formSelect.module.scss';
import { ErrorMessage } from '../errorMessage/errorMessage';

export const FormSelect = ({ label, error, className, children, ...props }) => {
  return (
    <div className={clsx(styles.formSelect, error && styles.formSelect__error, className)}>
      {label && (
        <label className={styles.formSelect__label} htmlFor={props.id}>
          {label}
        </label>
      )}

      <select className={styles.formSelect__select} {...props}>
        {children}
      </select>

      {error && <ErrorMessage className={styles.formSelect__error} error={error} />}
    </div>
  );
};
