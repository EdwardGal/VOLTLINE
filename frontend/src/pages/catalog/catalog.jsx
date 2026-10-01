import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategories, getProducts } from '../../api/productService';
import { Breadcrumbs, ErrorMessage, Loading, PageContainer } from '../../components';
import { MAX_PRICE, PRODUCTS_PER_PAGE } from './catalog.constants';
import { Head, List, Pagination, Panel } from './components';
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
  const [currentPage, setCurrentPage] = useState(1);
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
    setCurrentPage(1);

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

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
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
      }),
    [products, selectedCategories, filterParams, conditions, priceRange]
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const onProductsTagHandler = ({ value, trigger }) => {
    if (trigger === 'tag') {
      setFilterParams(value);
      setCurrentPage(1);
    }
  };

  const onCategoryChange = (value) => {
    setSelectedCategories(value);
    setCurrentPage(1);
  };

  const onConditionsChange = (value) => {
    setConditions(value);
    setCurrentPage(1);
  };

  const onPriceRangeChange = (value) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  return (
    <section className={styles.catalog}>
      <PageContainer>
        <div className={styles.catalog__content}>
          <Breadcrumbs className={styles.catalog__breadcrumbs} />

          <Head
            className={styles.catalog__head}
            title={category ? category : 'All products'}
            productsLength={filteredProducts.length}
            onProductsHandler={onProductsTagHandler}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <div className={styles.catalog__inner}>
            <Panel
              className={styles.catalog__panel}
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={onCategoryChange}
              conditions={conditions}
              onConditionsChange={onConditionsChange}
              priceRange={priceRange}
              onPriceRangeChange={onPriceRangeChange}
              category={category}
            />

            {isLoading ? (
              <Loading />
            ) : serverErrorMessage ? (
              <ErrorMessage error={serverErrorMessage} />
            ) : filteredProducts.length > 0 ? (
              <div className={styles.catalog__products}>
                <List
                  className={styles.catalog__list}
                  products={paginatedProducts}
                  viewMode={viewMode}
                />

                {totalPages > 1 && (
                  <Pagination
                    className={styles.catalog__pagination}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
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
      </PageContainer>
    </section>
  );
};
