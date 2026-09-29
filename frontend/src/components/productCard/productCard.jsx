import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { CustomButton } from '../customButton/customButton';
import { LucideIcon } from '../lucideIcon/lucideIcon';
import { Price } from '../price/price';
import { Tag } from '../tag/tag';

import { addToCart } from '../../store/cart/cartActions';

import styles from './productCard.module.scss';

export const ProductCard = ({ product, variant, pathLink }) => {
  const { image, images = [], name, sku, tags = [], price, quantity, discount = 0 } = product;

  const dispatch = useDispatch();

  const variantClass = variant ? styles[`productCard--${variant}`] : null;

  const productImage = image || images[0];

  const isCatalog = variant === 'category';

  const handleBuy = () => {
    dispatch(addToCart(product));
  };

  return (
    <article
      className={clsx(
        styles.productCard,
        !quantity && styles[`productCard--disabled`],
        variantClass
      )}
    >
      <div className={styles.productCard__cover}>
        <img className={styles.productCard__image} src={productImage} alt={name} />

        {!isCatalog && (
          <div className={styles.productCard__tags}>
            {tags.map((tag) => (
              <Tag key={tag} className={styles.productCard__tag} name={tag} variant="accent" />
            ))}
          </div>
        )}

        <Link to={pathLink} className={styles.productCard__link} />
      </div>

      <div className={styles.productCard__info}>
        <div className={styles.productCard__infoHead}>
          <h3 className={styles.productCard__name}>{name}</h3>

          {isCatalog ? (
            <span className={styles.productCard__sku}>{quantity} models</span>
          ) : (
            <span className={styles.productCard__sku}>{sku}</span>
          )}
        </div>

        {!isCatalog && (
          <div className={styles.productCard__purchase}>
            <Price
              className={styles.productCard__price}
              variant={variant}
              price={price}
              discount={discount}
            />

            <CustomButton
              className={styles.productCard__button}
              variant={variant}
              onClick={handleBuy}
            >
              {variant === 'popular' ? (
                <>
                  Buy
                  <LucideIcon name="ShoppingBasket" size="20" color="#05070F" />
                </>
              ) : (
                <LucideIcon name="ShoppingBasket" size="20" color="#05070F" />
              )}
            </CustomButton>
          </div>
        )}
      </div>
    </article>
  );
};
