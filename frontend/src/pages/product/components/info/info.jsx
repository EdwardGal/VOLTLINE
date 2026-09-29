import { CustomButton, CustomLink, Delivery, H2, LucideIcon, Price } from '../../../../components';

import { ROUTES } from '../../../../constants';

import styles from './info.module.scss';

export const Info = ({ product }) => {
  const { name, description, price, discount, quantity: initialQuantity } = product;

  const techs = {
    Brand: product.brand,
    Warranty: product.warranty,
    SKU: product.sku,
    Category: product.category,
  };

  return (
    <div className={styles.info}>
      <H2 className={styles.info__title} variant="productCard" title={name} />

      <p className={styles.info__description}>{description}</p>

      <Price
        className={styles.info__price}
        variant="productCard"
        price={price}
        discount={discount}
      />

      <div className={styles.info__actions}>
        {initialQuantity > 0 ? (
          <div className={styles.info__purchase}>
            <CustomButton variant="accent">
              Buy
              <LucideIcon name="ShoppingBasket" size="20" color="#05070F" />
            </CustomButton>
          </div>
        ) : (
          <p className={styles.info__stockMessage}>Out of stock</p>
        )}

        <CustomLink name="Back to catalog" to={ROUTES.CATALOG} />
      </div>

      <div className={styles.info__techs}>
        {Object.entries(techs).map(([name, value]) => (
          <div key={name} className={styles.info__tech}>
            <span>{name}</span>
            <span className={styles.info__techTitle}>{value}</span>
          </div>
        ))}
      </div>

      <Delivery className={styles.info__delivery} />
    </div>
  );
};
