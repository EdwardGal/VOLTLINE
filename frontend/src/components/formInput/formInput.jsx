import clsx from 'clsx';
import { ErrorMessage } from '../errorMessage/errorMessage';
import styles from './formInput.module.scss';

export const FormInput = ({ label, error, className, type = 'text', ...props }) => {
  const isCheckbox = type === 'checkbox';

  return (
    <div className={clsx(styles.formField, isCheckbox && styles[`formField--checkbox`], className)}>
      {isCheckbox ? (
        <label className={styles.formField__checkboxLabel}>
          <input className={styles.formField__checkbox} type="checkbox" {...props} />

          <span>{label}</span>
        </label>
      ) : (
        <>
          {label && (
            <label className={styles.formField__label} htmlFor={props.id}>
              {label}
            </label>
          )}

          <input className={styles.formField__input} type={type} {...props} />
        </>
      )}

      {error && <ErrorMessage error={error} />}
    </div>
  );
};
