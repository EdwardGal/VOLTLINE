import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '../../../../components';
import { useToast } from '../../../../components/toast';
import { clearCart } from '../../../../store/cart/cartActions';
import { selectCartItemsCount, selectCartTotal } from '../../../../store/cart/cartSelectors';
import { DELIVERY_PRICE, FREE_DELIVERY_THRESHOLD } from '../../delivery.constants';
import styles from './head.module.scss';

export const Head = () => {
  const cartItemsCount = useSelector(selectCartItemsCount);
  const totalPrice = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const clearCartHandler = () => {
    if (cartItemsCount) {
      dispatch(clearCart());
      showToast('Cart cleared successfully', 'success');
    }
  };

  return (
    <div className={styles.head}>
      <div className={styles.head__info}>
        <h1 className={styles.head__title}>Cart</h1>

        <p className={styles.head__description}>
          {cartItemsCount} items ·
          {totalPrice >= FREE_DELIVERY_THRESHOLD ? 'delivery free' : `delivery $${DELIVERY_PRICE}`}
        </p>
      </div>

      <CustomButton
        className={styles.head__btn}
        disabled={!cartItemsCount}
        onClick={clearCartHandler}
      >
        Clear cart
      </CustomButton>
    </div>
  );
};
