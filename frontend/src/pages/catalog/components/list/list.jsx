import clsx from 'clsx';

import { ProductCard } from '../../../../components';
import { ROUTES } from '../../../../constants';
import { createSlug } from '../../../../utils';

import styles from './list.module.scss';

export const List = ({ products, viewMode, className }) => {
  return (
    <div
      className={clsx(
        styles.list,
        viewMode && styles[`list--${viewMode}`],
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
