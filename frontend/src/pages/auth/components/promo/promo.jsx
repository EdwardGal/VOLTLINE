import { H2 } from '../../../../components';
import styles from './promo.module.scss';

export const Promo = () => {
  return (
    <div className={styles.promo}>
      <div className={styles.promo__cover}>
        <img
          className={styles.promo__image}
          src="/assets/auth.jpg"
          alt="Voltline gaming PC with neon lighting"
        />
      </div>

      <div className={styles.promo__content}>
        <div className={styles.promo__info}>
          <p className={styles.promo__eyebrow}>BUILT FOR YOUR FPS</p>
          <H2 className={styles.promo__title} title="Performance without compromise." />
        </div>
        <span className={styles.promo__version}>VL // 2026</span>
      </div>
    </div>
  );
};
