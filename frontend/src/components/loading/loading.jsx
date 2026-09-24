import styles from './loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <span className={styles.loading__spinner} />
      <span className={styles.loading__text}>Loading...</span>
    </div>
  );
};
