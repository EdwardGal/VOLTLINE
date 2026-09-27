import { CustomButton } from '../customButton/customButton';
import { LucideIcon } from '../lucideIcon/lucideIcon';
import styles from './quantity.module.scss';

export const Quantity = ({ quantity, onQuantityChange }) => {
  return (
    <div className={styles.quantity}>
      <CustomButton variant="default" disabled={!quantity} onClick={() => onQuantityChange(-1)}>
        <LucideIcon name="Minus" />
      </CustomButton>
      <span className={styles.info__counter}>{quantity}</span>
      <CustomButton variant="default" onClick={() => onQuantityChange(1)}>
        <LucideIcon name="Plus" />
      </CustomButton>
    </div>
  );
};
