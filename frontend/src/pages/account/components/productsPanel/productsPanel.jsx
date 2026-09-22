import { useEffect, useState } from 'react';

import { CustomButton, SectionHead, TableHead } from '../../../../components';
import { TABLE_HEAD_CELLS } from '../../../../constants';
import { request } from '../../../../utils';
import { useModal } from '../../../../components/modal/useModal';

import { ProductRow } from './components';

import styles from './productsPanel.module.scss';

export const ProductsPanel = () => {
  const { openModal } = useModal();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    request('/products', 'GET').then(({ data }) => {
      setProducts(data);
    });
  }, []);

  const handleProductCreated = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleProductUpdated = (product) => {
    setProducts((prev) => prev.map((item) => (item.id === product.id ? product : item)));
  };

  const handleProductRemoved = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const totalQuantity = products.reduce((total, product) => total + Number(product.quantity), 0);

  return (
    <div className={styles.productsPanel}>
      <div className={styles.productsPanel__info}>
        <SectionHead variant="small" eyebrow="// warehouse" title="Products" />

        <div className={styles.productsPanel__toolbar}>
          {products.length > 0 && (
            <span className={styles.productsPanel__summary}>
              {products.length} позиций · {totalQuantity} шт.
            </span>
          )}

          <CustomButton
            className={styles.productsPanel__addButton}
            name="Add product"
            icon={{ name: 'Plus', color: '#10121d' }}
            variant="accent"
            onClick={() =>
              openModal('addProduct', {
                onSuccess: handleProductCreated,
              })
            }
          />
        </div>
      </div>

      <TableHead cells={TABLE_HEAD_CELLS.PRODUCTS} variant="products" />

      {products.map((product) => (
        <ProductRow
          key={product.id}
          product={product}
          onProductUpdate={handleProductUpdated}
          onProductRemove={handleProductRemoved}
        />
      ))}
    </div>
  );
};
