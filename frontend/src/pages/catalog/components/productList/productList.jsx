import clsx from 'clsx';
import { ProductCard } from '../../../../components';
import styles from './productList.module.scss';
import { ROUTES } from '../../../../constants';
import { createSlug } from '../../../../utils';

export const ProductList = ({ products, className }) => {
  return (
    <div className={clsx(styles.productList, className)}>
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
