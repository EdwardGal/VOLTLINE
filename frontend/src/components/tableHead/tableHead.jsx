import clsx from 'clsx';
import styles from './tableHead.module.scss';

export const TableHead = ({ cells, variant, className }) => {
  const variantClass = variant ? styles[`tableHead--${variant}`] : null;

  return (
    <div className={clsx(styles.tableHead, variantClass, className)}>
      {cells.map((cellName, index) => (
        <span key={cellName} className={clsx(styles.tableHead__cell, styles[`cell_${index + 1}`])}>
          {cellName}
        </span>
      ))}
    </div>
  );
};
