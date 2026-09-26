import { useState } from 'react';

import {
  CustomButton,
  CustomLink,
  Delivery,
  H2,
  Price,
  Quantity,
} from '../../../../components';
import { useToast } from '../../../../components/toast';
import { ROUTES } from '../../../../constants';

import styles from './info.module.scss';

export const Info = ({ product }) => {
  const {
    name,
    description,
    price,
    discount,
    quantity: initialQuantity,
    images,
    id,
    tags,
    ...techs
  } = product;

  const [quantity, setQuantity] = useState(0);

  const { showToast } = useToast();

  const onQuantityChange = (value) => {
    const newQuantity = quantity + value;

    if (newQuantity > initialQuantity) {
      showToast(`Only ${initialQuantity} left in stock`, 'error');
      return;
    }

    if (newQuantity < 0) {
      return;
    }

    setQuantity(newQuantity);
  };

  return (
    <div className={styles.info}>
      <H2
        className={styles.info__title}
        variant="productCard"
        title={name}
      />

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
            <Quantity
              quantity={quantity}
              onQuantityChange={onQuantityChange}
            />

            <CustomButton
              name="Buy"
              variant="productCard"
              icon={{
                name: 'ShoppingBasket',
                color: '#05070F',
                size: '20',
              }}
            />
          </div>
        ) : (
          <p className={styles.info__stockMessage}>
            Out of stock
          </p>
        )}

        <CustomLink
          name="Back to catalog"
          to={ROUTES.CATALOG}
        />
      </div>

      <div className={styles.info__techs}>
        {Object.entries(techs).map(([name, value]) => (
          <div key={name} className={styles.info__tech}>
            <span>{name}</span>
            <span className={styles.info__techTitle}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <Delivery className={styles.info__delivery} />
    </div>
  );
};
