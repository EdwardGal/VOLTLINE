import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProducts } from '../../api/productService';
import { Breadcrumbs, ErrorMessage, Loading, PageContainer } from '../../components';

import { ControlPanel, ProductList } from './components';

import styles from './catalog.module.scss';

export const Catalog = () => {
  const { category } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setServerErrorMessage(null);
    setProducts([]);

    getProducts({ category })
      .then(({ data, error }) => {
        if (error) {
          setServerErrorMessage(error);
          return;
        }

        setProducts(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  return (
    <section className={styles.catalog}>
      <PageContainer>
        {isLoading ? (
          <Loading />
        ) : serverErrorMessage ? (
          <ErrorMessage error={serverErrorMessage} />
        ) : (
          <>
            <Breadcrumbs className={styles.catalog__breadcrumbs} />

            <div className={styles.catalog__content}>
              <ControlPanel className={styles.catalog__controlPanel} />

              {products.length > 0 ? (
                <ProductList className={styles.catalog__productList} products={products} />
              ) : (
                <ErrorMessage
                  error={{
                    title: 'Products not found',
                    description: 'There are no products in this category yet.',
                  }}
                />
              )}
            </div>
          </>
        )}
      </PageContainer>
    </section>
  );
};
