import { useEffect, useState } from 'react';
import { getCategories } from '../../../../api/productService';
import { ErrorMessage, Loading, PageContainer, SectionHead } from '../../../../components';

import styles from './catalog.module.scss';
import { ProductCard } from './components';

export const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  useEffect(() => {
    getCategories()
      .then(({ data, error }) => {
        if (error) {
          setServerErrorMessage(error);
          return;
        }
        setCategories(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className={styles.catalog}>
      <PageContainer className={styles.catalog__container}>
        <div className={styles.catalog__content}>
          <SectionHead
            className={styles.catalog__head}
            title="Catalog"
            iconName="MoveRight"
            iconLabel="Full catalog"
          />
          <div className={styles.catalog__cards}>
            {isLoading ? (
              <Loading />
            ) : serverErrorMessage ? (
              <ErrorMessage error={serverErrorMessage} />
            ) : (
              <>
                {categories.map((category) => (
                  <ProductCard key={category.id} {...category} />
                ))}
              </>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
