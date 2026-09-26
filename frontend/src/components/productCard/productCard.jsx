import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { CustomButton } from '../customButton/customButton';
import { Tag } from '../tag/tag';

import styles from './productCard.module.scss';
import { Price } from '../price/price';

export const ProductCard = ({ product, variant, onBuy }) => {
  const { image, images = [], name, sku, tags, price, quantity, discount = 0, slug } = product;

  const variantClass = variant ? styles[`productCard--${variant}`] : null;

  const productImage = image || images[0];

  const isCatalog = variant === 'category';


  return (
    <article className={clsx(styles.productCard, variantClass)}>
      <div className={styles.productCard__cover}>
        <img className={styles.productCard__image} src={productImage} alt={name} />

        {!isCatalog && (
          <div className={styles.productCard__tags}>
            {tags.map((tag) => (
              <Tag key={tag} className={styles.productCard__tag} name={tag} variant="accent" />
            ))}
          </div>
        )}

        <Link to={`/catalog/${slug}`} className={styles.productCard__link} aria-label={name} />
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
            <Price price={price} discount={discount} />
            <CustomButton
              className={styles.productCard__button}
              name="Buy"
              variant="productCard"
              icon={{
                name: 'ShoppingBasket',
                color: '#05070F',
                size: '20',
              }}
              onClick={() => onBuy?.(product)}
            />
          </div>
        )}
      </div>
    </article>
  );
};
