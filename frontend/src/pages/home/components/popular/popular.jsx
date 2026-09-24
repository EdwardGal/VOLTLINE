import styles from './popular.module.scss';
import { ErrorMessage, Loading, PageContainer, SectionHead } from '../../../../components';
import { PopularCard } from './components';
import { useEffect, useState } from 'react';
import { getProductsWithTags } from '../../../../api/productService';

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
    <section className={styles.popular}>
      <PageContainer className={styles.popular__container}>
        <div className={styles.popular__content}>
          <SectionHead
            className={styles.popular__head}
            title="Popular"
            iconName="MoveRight"
            iconLabel="All products"
          />
          <div className={styles.popular__cards}>
            {isLoading ? (
              <Loading />
            ) : serverErrorMessage ? (
              <ErrorMessage error={serverErrorMessage} />
            ) : (
              <>
                {taggedProducts.map((product) => (
                  <PopularCard key={product.id} {...product} />
                ))}
              </>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
