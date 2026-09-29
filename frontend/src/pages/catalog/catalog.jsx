import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCategories, getProducts } from '../../api/productService';
import { Breadcrumbs, ErrorMessage, Loading, PageContainer } from '../../components';

import { CatalogHead, CatalogList, CatalogPagination, CatalogPanel } from './components';
import { MAX_PRICE } from './catalog.constants';
import styles from './catalog.module.scss';

export const Catalog = () => {
  const { category } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterParams, setFilterParams] = useState('');

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [viewMode, setViewMode] = useState('grid');

  const [conditions, setConditions] = useState({
    inStock: false,
    onSale: false,
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: MAX_PRICE,
  });

  useEffect(() => {
    setIsLoading(true);
    setServerErrorMessage(null);

    Promise.all([getProducts({ category }), getCategories()])
      .then(([productsRes, categoriesRes]) => {
        if (productsRes.error || categoriesRes.error) {
          setServerErrorMessage(productsRes.error || categoriesRes.error);

          return;
        }

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    if (filterParams && !product.tags.includes(filterParams.toLowerCase())) {
      return false;
    }

    if (conditions.inStock && product.quantity <= 0) {
      return false;
    }

    if (conditions.onSale && (!product.discount || product.discount <= 0)) {
      return false;
    }

    const productPrice =
      product.discount > 0
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    if (productPrice < priceRange.min || productPrice > priceRange.max) {
      return false;
    }

    return true;
  });

  const onProductsHandler = ({ value, trigger }) => {
    if (trigger === 'tag') {
      setFilterParams(value);
    }
  };

  return (
    <section className={styles.catalog}>
      <PageContainer>
        {isLoading ? (
          <Loading />
        ) : serverErrorMessage ? (
          <ErrorMessage error={serverErrorMessage} />
        ) : (
          <div className={styles.catalog__content}>
            <Breadcrumbs className={styles.catalog__breadcrumbs} />

            <CatalogHead
              className={styles.catalog__head}
              title={category ? category : 'All products'}
              productsLength={filteredProducts.length}
              onProductsHandler={onProductsHandler}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            <div className={styles.catalog__inner}>
              <CatalogPanel
                className={styles.catalog__panel}
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                conditions={conditions}
                onConditionsChange={setConditions}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                category={category}
              />

              {filteredProducts.length > 0 ? (
                <div className={styles.catalog__products}>
                  <CatalogList
                    className={styles.catalog__list}
                    products={filteredProducts}
                    viewMode={viewMode}
                  />

                  <CatalogPagination className={styles.catalog__pagination} />
                </div>
              ) : (
                <ErrorMessage
                  error={{
                    title: 'Products not found',
                    description: 'There are no products matching the selected filters yet.',
                  }}
                />
              )}
            </div>
          </div>
        )}
      </PageContainer>
    </section>
  );
};
