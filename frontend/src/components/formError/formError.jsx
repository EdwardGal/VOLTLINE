import styles from './formError.module.scss';

export const FormError = ({ error }) => {
  return <div className={styles.formError}>{error}</div>;
};
