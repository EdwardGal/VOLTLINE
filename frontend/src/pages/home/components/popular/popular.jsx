import { useEffect, useState } from 'react';
import { getProductsWithTags } from '../../../../api/productService';
import {
  ErrorMessage,
  Loading,
  PageContainer,
  ProductCard,
  SectionHead,
} from '../../../../components';
import { ROUTES } from '../../../../constants';
import { createSlug } from '../../../../utils';
import styles from './popular.module.scss';

export const Popular = () => {
  const [taggedProducts, setTaggedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setServerErrorMessage(null);
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
            <SectionHead className={styles.popular__head} title="Popular" to={ROUTES.CATALOG} />
            <div className={styles.popular__list}>
              {isLoading ? (
                <Loading />
              ) : serverErrorMessage ? (
                <ErrorMessage error={serverErrorMessage} />
              ) : (
                <>
                  {taggedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
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
