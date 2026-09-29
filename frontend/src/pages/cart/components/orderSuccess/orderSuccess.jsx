import { H2, LucideIcon } from '../../../../components';
import { generateOrderNumber } from '../../../../constants';
import { formatPrice } from '../../../../utils';
import styles from './orderSuccess.module.scss';

export const OrderSuccess = ({ totalPrice }) => {

  return (
    <div className={styles.orderSuccess}>
      <LucideIcon className={styles.orderSuccess__icon} name="Check" size="32" color="#05070f" />
      <H2 className={styles.orderSuccess__title} title="Order placed" />
      <p
        className={styles.orderSuccess__text}
      >{`Thank you! Your order for ${formatPrice(totalPrice)} € is confirmed. We'll email the receipt and call you about delivery.`}</p>
      <p className={styles.orderSuccess__order}>
        Order number: <strong>{generateOrderNumber()}</strong>
      </p>
    </div>
  );
};
