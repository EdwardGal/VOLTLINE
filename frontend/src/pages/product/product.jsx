import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProduct } from '../../api/productService';
import { Breadcrumbs, ErrorMessage, Loading, PageContainer } from '../../components';
import { Gallery, Info } from './components';

import styles from './product.module.scss';

export const Product = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setServerErrorMessage(null);
    setProduct(null);

    getProduct(id)
      .then(({ data, error }) => {
        if (error) {
          setServerErrorMessage(error);
          return;
        }

        setProduct(data);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <section className={styles.product}>
      <PageContainer className={styles.product__container}>
        {!isLoading && !serverErrorMessage && (
          <Breadcrumbs className={styles.product__breadcrumbs} category={product.category} />
        )}

        <div className={styles.product__content}>
          {isLoading ? (
            <Loading />
          ) : serverErrorMessage ? (
            <ErrorMessage error={serverErrorMessage} />
          ) : (
            <>
              <Gallery images={product.images} name={product.name} tags={product.tags} />

              <Info product={product} />
            </>
          )}
        </div>
      </PageContainer>
    </section>
  );
};
