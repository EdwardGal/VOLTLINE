import clsx from 'clsx';
import styles from './formInput.module.scss';
import { FormError } from '../formError/formError';

export const FormInput = ({ label, error, type, placeholder, className, ...props }) => {

  return (
    <div className={clsx(styles.field, className)}>
      {label && (
        <label className={styles.field__label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={styles.field__input}
        type={type}
        name={type}
        id={type}
        placeholder={placeholder}
        autoComplete={type}
        required
        {...props}
      />
      {error && <FormError className={styles.field__error} error={error} />}
    </div>
  );
};
