import { PageContainer } from '../../components/pageContainer/pageContainer';
import styles from './cart.module.scss';
import { Delivery, Head, List, Summary } from './components';

export const Cart = () => {
  return (
    <section className={styles.cart}>
      <PageContainer>
        <div className={styles.cart__content}>
          <Head />
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
