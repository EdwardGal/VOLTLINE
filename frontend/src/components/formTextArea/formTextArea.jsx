import { ErrorMessage } from '../errorMessage/errorMessage';
import styles from './formTextArea.module.scss';

export const FormTextarea = ({ label, error, ...props }) => {
  return (
    <div className={styles.formTextarea}>
      <label className={styles.formTextarea__label}>{label}</label>

      <textarea className={styles.formTextarea__input} {...props} rows={2} />

      {error && <ErrorMessage error={error} />}
    </div>
  );
};
