import clsx from 'clsx';
import styles from './tableCells.module.scss';

export const TableCells = ({ cells, variant, className }) => {
  const variantClass = variant ? styles[`tableCells--${variant}`] : null;

  return (
    <div className={clsx(styles.tableCells, variantClass, className)}>
      {cells.map((cellName, index) => (
        <span key={cellName} className={clsx(styles.tableCells__cell, styles[`cell_${index + 1}`])}>
          {cellName}
        </span>
      ))}
    </div>
  );
};
