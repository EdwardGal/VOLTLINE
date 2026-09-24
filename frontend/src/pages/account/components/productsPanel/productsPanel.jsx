import { useEffect, useState } from 'react';

import { CustomButton, ErrorMessage, Loading, TableHead, TableCells } from '../../../../components';
import { TABLE_HEAD_CELLS } from '../../../../constants';
import { calcQuantity } from '../../../../utils';

import { ProductForm, ProductRow } from './components';

import styles from './productsPanel.module.scss';

import { useToast } from '../../../../components/toast';
import { useModal } from '../../../../components/modal';
import { getProducts } from '../../../../api/productService';

export const ProductsPanel = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  const { showToast } = useToast();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    getProducts()
      .then(({ data, error }) => {
        if (error) {
          setServerErrorMessage(error);
          return;
        }
        setProducts(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onProductAdd = () => {
    openModal({
      icon: 'PackagePlus',
      title: 'Add product',
      subtitle: 'A new item will appear in the warehouse list.',
      content: (
        <ProductForm
          onConfirm={(product) => {
            setProducts((prev) => [...prev, product]);
            showToast('Product added successfully', 'success');
            closeModal();
          }}
        />
      ),
    });
  };

  const removeProductHandler = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const updateProductHandler = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  return (
    <div className={styles.productsPanel}>
      <div className={styles.productsPanel__info}>
        <TableHead variant="small" eyebrow="// warehouse" title="Products" />

        <div className={styles.productsPanel__toolbar}>
          {products.length > 0 && (
            <span className={styles.productsPanel__summary}>
              {products.length} item · {calcQuantity(products)} units
            </span>
          )}

          <CustomButton
            className={styles.productsPanel__addButton}
            name="Add product"
            icon={{ name: 'Plus', color: '#10121d' }}
            variant="accent"
            onClick={onProductAdd}
          />
        </div>
      </div>

      <div className={styles.productsPanel__table}>
        {isLoading ? (
          <Loading />
        ) : serverErrorMessage ? (
          <ErrorMessage error={serverErrorMessage} />
        ) : (
          <>
            <TableCells cells={TABLE_HEAD_CELLS.PRODUCTS} variant="products" />

            <div className={styles.productsPanel__rows}>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  removeProductHandler={removeProductHandler}
                  updateProductHandler={updateProductHandler}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
