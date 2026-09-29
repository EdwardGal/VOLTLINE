import clsx from 'clsx';
import styles from './summary.module.scss';
import { CustomButton } from '../../../../components';

export const Summary = ({ className }) => {
  return (
    <aside className={clsx(styles.summary, className)}>
      <div className={styles.summary__card}>
        <h2 className={styles.summary__title}>Summary</h2>

        <dl className={styles.summary__list}>
          <div className={styles.summary__row}>
            <dt className={styles.summary__label}>Items</dt>
            <dd className={styles.summary__value}>279 100 ₽</dd>
          </div>

          <div className={styles.summary__row}>
            <dt className={styles.summary__label}>Delivery</dt>
            <dd className={styles.summary__value}>Free</dd>
          </div>

          <div className={clsx(styles.summary__row, styles.summary__row_total)}>
            <dt className={styles.summary__totalLabel}>Total</dt>
            <dd className={styles.summary__totalValue}>279 100 ₽</dd>
          </div>
        </dl>
      </div>

      <div className={styles.summary__actions}>
        <CustomButton
          className={clsx(styles.button, styles.button_primary, styles.summary__btn)}
          variant="accent"
        >
          Place order
        </CustomButton>
        <CustomButton className={clsx(styles.button, styles.button_outline, styles.summary__btn)}>
          Continue shopping
        </CustomButton>
      </div>
    </aside>
  );
};
