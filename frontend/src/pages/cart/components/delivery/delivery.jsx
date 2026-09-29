import { DeliveryForm } from './components';
import styles from './delivery.module.scss';

export const Delivery = () => {
  return (
    <div className={styles.delivery}>
      <div className={styles.delivery__inner}>
        <h2 className={styles.delivery__title}>Delivery</h2>
        <DeliveryForm className={styles.delivery__form} />
      </div>
    </div>
  );
};
