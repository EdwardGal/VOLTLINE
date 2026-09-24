import { CustomButton, Tag } from '../../../../../../components';
import { calcDiscountPrice, formatPrice } from '../../../../../../utils';

import styles from './popularCard.module.scss';

export const PopularCard = ({ images, name, sku, price, discount, tag }) => {
  const priceWithDiscount = calcDiscountPrice(price, discount);

  const checkDiscount = discount !== 0 ? price : '';

  return (
    <div className={styles.popularCard}>
      <div className={styles.popularCard__cover}>
        <img className={styles.popularCard__image} src={images[0]} alt={name} />
        <Tag className={styles.popularCard__tag} name={tag} variant="accent" />
      </div>
      <div className={styles.popularCard__info}>
        <div className={styles.popularCard__infoHead}>
          <h3 className={styles.popularCard__name}>{name}</h3>
          <span className={styles.popularCard__sku}>{sku}</span>
        </div>
        <div className={styles.popularCard__purchase}>
          <div className={styles.popularCard__price}>
            <span className={styles.popularCard__currentPrice}>
              {formatPrice(priceWithDiscount)}
            </span>
            <span className={styles.popularCard__lastPice}>{checkDiscount}</span>
          </div>
          <CustomButton
            className={styles.popularCard__button}
            name="Buy"
            variant="productCard"
            icon={{ name: 'ShoppingBasket', color: '#05070F', size: '20' }}
          />
        </div>
      </div>
    </div>
  );
};
