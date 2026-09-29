import { useSelector } from 'react-redux';


import styles from './list.module.scss';
import { CartItem } from './components';
import { selectCartItems } from '../../../../store/cart/cartSelectors';

export const List = () => {
  const items = useSelector(selectCartItems);

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </ul>
  );
};
