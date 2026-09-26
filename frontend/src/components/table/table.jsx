import clsx from 'clsx';

import { TableBody, TableHead } from './components';

import styles from './table.module.scss';

export const Table = ({ data, columns, Row, rowProps, variant, className }) => {
  const variantClass = variant ? styles[`table--${variant}`] : null;

  return (
    <div className={clsx(styles.table, variantClass, className)}>
      <TableHead columns={columns} variant={variant} />

      <TableBody>
        {data.map((item) => (
          <Row key={item.id} item={item} {...rowProps} />
        ))}
      </TableBody>
    </div>
  );
};
