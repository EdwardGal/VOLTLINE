import clsx from 'clsx';

import { ProductCard } from '../../../../components';
import { ROUTES } from '../../../../constants';
import { createSlug } from '../../../../utils';

import styles from './catalogList.module.scss';

export const CatalogList = ({ products, viewMode, className }) => {
  return (
    <div
      className={clsx(
        styles.catalogList,
        viewMode && styles[`catalogList--${viewMode}`],
        className
      )}
    >
      {products.map((product) => (
        <ProductCard
          variant="catalog"
          key={product.id}
          product={product}
          pathLink={`${ROUTES.CATALOG}/${createSlug(product.category)}/${product.id}`}
        />
      ))}
    </div>
  );
};
