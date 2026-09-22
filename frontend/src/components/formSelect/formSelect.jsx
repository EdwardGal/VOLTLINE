import clsx from 'clsx';
import styles from './formSelect.module.scss';
import { FormError } from '../formError/formError';

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

      {error && <FormError className={styles.formSelect__error} error={error} />}
    </div>
  );
};
