import clsx from 'clsx';
import styles from './topBar.module.scss';

export const TopBar = ({ className }) => {
  return (
    <div className={clsx(styles.topBar, className)}>
      <p className={styles.topBar__text}>We build computers that don't slow down</p>
      <div className={styles.topBar__contacts}>
        <time className={styles.topBar__time}>Daily 10:00 — 21:00</time>
        <a className={styles.topBar__tel} href="tel:74951184060">
          +7 495 118-40-60
        </a>
      </div>
    </div>
  );
};
