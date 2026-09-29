import { Quantity } from '../../../../../../components/quantity/quantity';

import styles from './cartItem.module.scss';

export const CartItem = ({ images, name, sku, quantity, price }) => {
  return (
    <li className={styles.cartItem}>
      <div className={styles.cartItem__cover}>
        <img className={styles.cartItem__image} src={images[0]} alt={name} />
      </div>

      <div className={styles.cartItem__info}>
        <div className={styles.cartItem__infoHead}>
          <h3 className={styles.cartItem__name}>{name}</h3>

          <span className={styles.cartItem__sku}>{sku}</span>

          <span className={styles.cartItem__status}>In stock · delivered tomorrow</span>
        </div>
        <div className={styles.cartItem__purchase}>
          <Quantity quantity={quantity} />

          <span className={styles.cartItem__price}>{price} ₽</span>
        </div>
      </div>
    </li>
  );
};
