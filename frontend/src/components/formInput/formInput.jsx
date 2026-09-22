import clsx from 'clsx';
import styles from './formInput.module.scss';
import { FormError } from '../formError/formError';

export const FormInput = ({ label, error, className, ...props }) => {
  return (
    <div className={clsx(styles.formField, error && styles.formField__error, className)}>
      {label && (
        <label className={styles.formField__label} htmlFor={props.id}>
          {label}
        </label>
      )}

      <input className={styles.formField__input} {...props} />

      {error && <FormError className={styles.formField__error} error={error} />}
    </div>
  );
};
