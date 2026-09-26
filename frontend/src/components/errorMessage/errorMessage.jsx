import styles from './errorMessage.module.scss';

export const ErrorMessage = ({ error }) => {
  if (error && typeof error === 'object') {
    const { title, description } = error;

    return (
      <div className={styles.errorMessage}>
        <div className={styles.errorMessage__inner}>
          <span className={styles.errorMessage__title}>{title}</span>
          <span className={styles.errorMessage__description}>{description}</span>
        </div>
      </div>
    );
  }

  return <div className={styles.errorMessage}>{error}</div>;
};
