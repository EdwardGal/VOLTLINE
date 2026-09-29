import { useSelector } from 'react-redux';

import styles from './list.module.scss';
import { CartItem } from './components';
import { selectCartItems } from '../../../../store/cart/cartSelectors';
import { ErrorMessage } from '../../../../components';

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
