import styles from './errorMessage.module.scss';

export const ErrorMessage = ({ error }) => {
  return <div className={styles.errorMessage}>{error}</div>;
};
