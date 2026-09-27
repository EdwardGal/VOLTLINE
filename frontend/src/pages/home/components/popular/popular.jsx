import styles from './popular.module.scss';
import {
  ErrorMessage,
  Loading,
  PageContainer,
  ProductCard,
  SectionHead,
} from '../../../../components';

import { useEffect, useState } from 'react';
import { getProductsWithTags } from '../../../../api/productService';
import { ROUTES } from '../../../../constants';
import { createSlug } from '../../../../utils';

export const Popular = () => {
  const [taggedProducts, setTaggedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  useEffect(() => {
    getProductsWithTags()
      .then(({ data, error }) => {
        if (error) {
          setServerErrorMessage(error);
          return;
        }
        setTaggedProducts(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    taggedProducts.length > 0 && (
      <section className={styles.popular}>
        <PageContainer className={styles.popular__container}>
          <div className={styles.popular__content}>
            <SectionHead
              className={styles.popular__head}
              title="Popular"
              iconName="MoveRight"
              iconLabel="All products"
              pathLink={ROUTES.CATALOG}
            />
            <div className={styles.popular__cards}>
              {isLoading ? (
                <Loading />
              ) : serverErrorMessage ? (
                <ErrorMessage error={serverErrorMessage} />
              ) : (
                <>
                  {taggedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      variant="popular"
                      product={product}
                      pathLink={`${ROUTES.CATALOG}/${createSlug(product.category)}/${product.id}`}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </PageContainer>
      </section>
    )
  );
};
