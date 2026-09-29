import { Table as TableLayout } from '../../../../../../components';
import { Head, Row } from './components';

import styles from './table.module.scss';

export const Table = ({ products, removeProductHandler, updateProductHandler }) => {
  return (
    <TableLayout >
      <div className={styles.table}>
        <Head />

        <div className={styles.table__body}>
          {products.map((product) => (
            <Row
              key={product.id}
              product={product}
              removeProductHandler={removeProductHandler}
              updateProductHandler={updateProductHandler}
            />
          ))}
        </div>
      </div>
    </TableLayout>
  );
};
