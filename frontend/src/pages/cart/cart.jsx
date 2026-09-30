import { useSelector } from 'react-redux';
import { PageContainer } from '../../components/pageContainer/pageContainer';
import { selectCartItemsCount } from '../../store/cart/cartSelectors';
import { Delivery, Head, List, Summary } from './components';
import styles from './cart.module.scss';

export const Cart = () => {
  const cartItemsCount = useSelector(selectCartItemsCount);

  return (
    <section className={styles.cart}>
      <PageContainer>
        <div className={styles.cart__content}>
          <Head />

          <div className={styles.cart__layout}>
            <div className={styles.cart__main}>
              <List />

              {cartItemsCount > 0 && <Delivery />}
            </div>

            <Summary className={styles.cart__summary} />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
