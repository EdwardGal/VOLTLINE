import clsx from 'clsx';
import styles from './summary.module.scss';
import { CustomButton, CustomLink } from '../../../../components';
import { useSelector } from 'react-redux';
import { selectCartItemsCount, selectCartTotal } from '../../../../store/cart/cartSelectors';
import { formatPrice } from '../../../../utils';
import { DELIVERY_PRICE, FREE_DELIVERY_THRESHOLD } from '../../delivery.constants';
import { ROUTES } from '../../../../constants';

export const Summary = ({ className }) => {
  const totalPrice = useSelector(selectCartTotal);
  const itemsCount = useSelector(selectCartItemsCount);

  return (
    <aside className={clsx(styles.summary, className)}>
      <div className={styles.summary__card}>
        <h2 className={styles.summary__title}>Summary</h2>

        <dl className={styles.summary__list}>
          <div className={styles.summary__row}>
            <dt className={styles.summary__label}>Items</dt>
            <dd className={styles.summary__value}>{itemsCount}</dd>
          </div>

          <div className={styles.summary__row}>
            <dt className={styles.summary__label}>Delivery</dt>
            <dd className={styles.summary__value}>
              {totalPrice >= FREE_DELIVERY_THRESHOLD ? 'delivery free' : `${DELIVERY_PRICE}$`}
            </dd>
          </div>

          <div className={clsx(styles.summary__row, styles.summary__row_total)}>
            <dt className={styles.summary__totalLabel}>Total</dt>
            <dd className={styles.summary__totalValue}>{formatPrice(totalPrice)} ₽</dd>
          </div>
        </dl>
      </div>

      <div className={styles.summary__actions}>
        <CustomButton
          className={clsx(styles.button, styles.button_primary, styles.summary__btn)}
          type="submit"
          form="delivery-form"
          variant="accent"
        >
          Place order
        </CustomButton>
        <CustomLink className={clsx(styles.button)} to={ROUTES.CATALOG}>
          Continue shopping
        </CustomLink>
      </div>
    </aside>
  );
};
