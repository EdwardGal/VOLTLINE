import { useSelector } from 'react-redux';
import { ErrorMessage } from '../../../../components';
import { selectCartItems } from '../../../../store/cart/cartSelectors';
import { CartItem } from './components';
import styles from './list.module.scss';

export const List = () => {
  const items = useSelector(selectCartItems);

  return (
    <ul className={styles.list}>
      {items.length === 0 ? (
        <ErrorMessage error="Add products to your cart to continue shopping" />
      ) : (
        items.map((item) => <CartItem key={item.id} {...item} />)
      )}
    </ul>
  );
};
