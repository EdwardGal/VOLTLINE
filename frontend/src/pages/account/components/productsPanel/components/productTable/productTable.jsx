import { Table } from '../../../../../../components';
import { ProductTableHead, ProductTableRow } from './components';

import styles from './productTable.module.scss';

export const ProductTable = ({ products, removeProductHandler, updateProductHandler }) => {
  return (
    <Table>
      <div className={styles.productTable}>
        <ProductTableHead />

        <div className={styles.productTable__body}>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              removeProductHandler={removeProductHandler}
              updateProductHandler={updateProductHandler}
            />
          ))}
        </div>
      </div>
    </Table>
  );
};
