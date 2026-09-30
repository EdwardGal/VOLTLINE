import clsx from 'clsx';
import { calcDiscountPrice, formatPrice } from '../../utils';
import styles from './price.module.scss';

export const Price = ({ price, discount, variant, className }) => {
  const variantClass = variant ? styles[`price--${variant}`] : null;

  const currentPrice = formatPrice(calcDiscountPrice(price, discount));
  const lastPrice = discount > 0 ? formatPrice(price) : null;

  return (
    <div className={clsx(styles.price, variantClass, className)}>
      <span className={styles.price__current}>{currentPrice}</span>
      {lastPrice && <del className={styles.price__old}>{lastPrice}</del>}
    </div>
  );
};
