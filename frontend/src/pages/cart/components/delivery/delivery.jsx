import { H2 } from '../../../../components';
import { Form } from './components';
import styles from './delivery.module.scss';


export const Delivery = () => {
  return (
    <div className={styles.delivery}>
      <div className={styles.delivery__content}>
        <H2 className={styles.delivery__title} title="Delivery" />
        <Form className={styles.delivery__form} />
      </div>
    </div>
  );
};
