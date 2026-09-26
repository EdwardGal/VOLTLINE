import clsx from 'clsx';
import styles from './tableHead.module.scss';

export const TableHead = ({ columns, variant }) => {
  const variantClass = variant ? styles[`tableHead--${variant}`] : null;
  return (
    <div className={clsx(styles.tableHead, variantClass)}>
      {columns.map(({ key, label }) => (
        <span key={key} className={styles.tableHead__cell}>
          {label}
        </span>
      ))}
    </div>
  );
};
