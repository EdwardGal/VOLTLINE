import { useDispatch } from 'react-redux';
import { CustomButton, LucideIcon } from '../../../../../../components';
import { Quantity } from '../../../../../../components/quantity/quantity';
import { useToast } from '../../../../../../components/toast';
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from '../../../../../../store/cart/cartActions';
import { formatPrice } from '../../../../../../utils';
import styles from './cartItem.module.scss';

export const CartItem = ({ id, images, name, sku, quantity, counter, price }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const onQuantityChange = (value) => {
    if (value === 1) {
      if (counter >= quantity) {
        showToast('No more items available', 'error');
        return;
      }

      dispatch(increaseCartQuantity(id));
      return;
    }

    if (value === -1 && counter > 1) {
      dispatch(decreaseCartQuantity(id));
    }
  };

  const onItemRemove = () => {
    dispatch(removeFromCart(id));
    showToast('Product removed from cart', 'success');
  };

  return (
    <li className={styles.cartItem}>
      <div className={styles.cartItem__cover}>
        <img className={styles.cartItem__image} src={images[0]} alt={name} />
      </div>

      <div className={styles.cartItem__info}>
        <div className={styles.cartItem__infoHead}>
          <h3 className={styles.cartItem__name}>{name}</h3>

          <span className={styles.cartItem__sku}>{sku}</span>

          <span className={styles.cartItem__status}>
            {quantity ? 'In stock · delivered tomorrow' : 'Out of stock'}
          </span>
        </div>

        <div className={styles.cartItem__purchase}>
          <div className={styles.cartItem__controls}>
            <Quantity quantity={counter} onQuantityChange={onQuantityChange} />

            <CustomButton className={styles.cartItem__remove} variant="form" onClick={onItemRemove}>
              <LucideIcon name="Trash2" size="20" color="rgba(139, 154, 192, 0.4)" />
            </CustomButton>
          </div>

          <span className={styles.cartItem__price}>{formatPrice(price * counter)}</span>
        </div>
      </div>
    </li>
  );
};
