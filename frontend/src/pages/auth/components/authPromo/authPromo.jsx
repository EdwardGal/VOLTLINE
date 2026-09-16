import authImage from '../../../../assets/images/auth.jpg';
import styles from './authPromo.module.scss';

export const AuthPromo = () => {
  return (
    <div className={styles.authPromo}>
      <div className={styles.authPromo__cover}>
        <img
          className={styles.authPromo__image}
          src={authImage}
          alt="Voltline gaming PC with neon lighting"
        />
      </div>

      <div className={styles.authPromo__content}>
        <div className={styles.authPromo__info}>
          <p className={styles.authPromo__eyebrow}>BUILT FOR YOUR FPS</p>
          <h2 className={styles.authPromo__title}>Performance without compromise.</h2>
        </div>
        <span className={styles.authPromo__version}>VL // 2026</span>
      </div>
    </div>
  );
};
