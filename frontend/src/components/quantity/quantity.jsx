import { CustomButton } from '../customButton/customButton';
import styles from './quantity.module.scss';



export const Quantity = ({ quantity, onQuantityChange }) => {
  return (
    <div className={styles.quantity}>
      <CustomButton icon={{ name: 'Plus' }} variant="default" onClick={() => onQuantityChange(1)} />

      <span className={styles.info__counter}>{quantity}</span>

      <CustomButton
        icon={{ name: 'Minus' }}
        variant="default"
        disabled={quantity === 0}
        onClick={() => onQuantityChange(-1)}
      />
    </div>
  );
};
