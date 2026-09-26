import styles from './catalog.module.scss';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/productService';
import { ErrorMessage, Loading, PageContainer } from '../../components';

export const Catalog = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setServerErrorMessage(null);
    setProducts(null);

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

  return (
    <section className={styles.catalog}>
      <PageContainer>
        <div className={styles.catalog__content}>
          {isLoading ? (
            <Loading />
          ) : serverErrorMessage ? (
            <ErrorMessage error={serverErrorMessage} />
          ) : (
            ''
          )}
        </div>
      </PageContainer>
    </section>
  );
};
