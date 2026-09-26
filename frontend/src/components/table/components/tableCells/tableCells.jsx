import clsx from 'clsx';

import styles from './tableCells.module.scss';

export const TableCells = ({ cells }) => {
  return (
    <div className={styles.tableCells}>
      {cells.map(({ key, label }, index) => (
        <span key={key} className={clsx(styles.tableCells__cell, styles[`cell_${index + 1}`])}>
          {label}
        </span>
      ))}
    </div>
  );
};
