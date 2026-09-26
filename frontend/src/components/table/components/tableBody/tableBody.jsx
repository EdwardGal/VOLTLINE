import styles from './tableBody.module.scss';

export const TableBody = ({ children }) => {
  return <div className={styles.tableBody}>{children}</div>;
};
