import clsx from 'clsx';
import { ErrorMessage } from '../errorMessage/errorMessage';
import styles from './formSelect.module.scss';

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

      {error && <ErrorMessage error={error} />}
    </div>
  );
};
