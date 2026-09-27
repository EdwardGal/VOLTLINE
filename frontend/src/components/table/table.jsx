import styles from './table.module.scss';

export const Table = ({ children }) => {
  return <div className={styles.table}>{children}</div>;
};
