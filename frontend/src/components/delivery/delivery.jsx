import clsx from 'clsx';
import styles from './delivery.module.scss';
import { CustomButton } from '../customButton/customButton';
import { LucideIcon } from '../lucideIcon/lucideIcon';

export const Delivery = ({ className }) => {
  return (
    <div className={clsx(styles.delivery, className)}>
      <div className={styles.delivery__row}>
        <p className={styles.delivery__time}>City delivery in 1 day</p>
        <p className={styles.delivery__adress}>
          Pickup: Moscow, 12 Sklyarenko St., showroom and workshop
        </p>
      </div>
      <div className={styles.delivery__row}>
        <p className={styles.delivery__title}>Pay by card or in installments</p>
        <CustomButton className={styles.delivery__button} variant="ask">
          Ask a manager
          <LucideIcon name="MoveRight" color="#22d3ee" size="19" />
        </CustomButton>
      </div>
    </div>
  );
};
