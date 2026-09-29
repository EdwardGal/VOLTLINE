import { PageContainer } from '../../components/pageContainer/pageContainer';
import styles from './cart.module.scss';
import { Delivery, List, Summary } from './components';

export const Cart = () => {
  return (
    <section className={styles.cart}>
      <PageContainer>
        <div className={styles.cart__content}>
          <div className={styles.cart__head}>
            <h1 className={styles.cart__title}>Cart</h1>
            <p className={styles.cart__description}>2 items · delivery free</p>
          </div>
          <div className={styles.cart__layout}>
            <div className={styles.cart__main}>
              <List />
              <Delivery />
            </div>

            <Summary className={styles.cart__summary} />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
