import { ErrorMessage } from '../errorMessage/errorMessage';
import styles from './formTextarea.module.scss';

export const FormTextarea = ({ label, error, ...props }) => {
  return (
    <div className={styles.formTextarea}>
      <label className={styles.formTextarea__label}>{label}</label>

      <textarea className={styles.formTextarea__input} {...props} />

      {error && <ErrorMessage className={styles.formTextarea__error} error={error} />}
    </div>
  );
};
