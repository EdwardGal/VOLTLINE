import clsx from 'clsx';

import styles from './tableRow.module.scss';

export const TableRow = ({ children, variant, className }) => {
  return (
    <div className={clsx(styles.tableRow, variant && styles[`tableRow_${variant}`], className)}>
      {children}
    </div>
  );
};
