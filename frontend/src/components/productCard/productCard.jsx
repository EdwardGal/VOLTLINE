import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useAddToCart } from '../../hooks';

import { CustomButton } from '../customButton/customButton';
import { LucideIcon } from '../lucideIcon/lucideIcon';
import { Price } from '../price/price';
import { Tag } from '../tag/tag';

import styles from './productCard.module.scss';

export const ProductCard = ({ product, pathLink }) => {
  const { image, images, name, sku, tags, price, quantity, discount } = product;
  const { handleBuy, isMaxQuantity } = useAddToCart(product);
  const productImage = image || images[0];

  return (
    <article className={clsx(styles.productCard, !quantity && styles[`productCard--disabled`])}>
      <div className={styles.productCard__cover}>
        <img className={styles.productCard__image} src={productImage} alt={name} />

        <div className={styles.productCard__tags}>
          {tags.map((tag) => (
            <Tag key={tag} className={styles.productCard__tag} name={tag} variant="accent" />
          ))}
        </div>

        <Link to={pathLink} className={styles.productCard__link} />
      </div>

      <div className={styles.productCard__info}>
        <div className={styles.productCard__infoHead}>
          <h3 className={styles.productCard__name}>{name}</h3>

          <span className={styles.productCard__sku}>{sku}</span>
        </div>

        <div className={styles.productCard__purchase}>
          <Price className={styles.productCard__price} price={price} discount={discount} />

          <CustomButton
            className={styles.productCard__button}
            onClick={handleBuy}
            variant="accent"
            disabled={!quantity || isMaxQuantity}
          >
            {!quantity ? (
              'Out of stock'
            ) : isMaxQuantity ? (
              'In cart'
            ) : (
              <>
                Buy
                <LucideIcon name="ShoppingBasket" size="20" color="#05070F" />
              </>
            )}
          </CustomButton>
        </div>
      </div>
    </article>
  );
};
