import clsx from 'clsx';
import styles from './headerTopBar.module.scss';

export const HeaderTopBar = ({ className }) => {
  return (
    <div className={clsx(styles.headerTopBar, className)}>
      <p className={styles.headerTopBar__text}>We build computers that don't slow down</p>
      <div className={styles.headerTopBar__contacts}>
        <time className={styles.headerTopBar__time}>Daily 10:00 — 21:00</time>
        <a className={styles.headerTopBar__tel} href="tel:74951184060">
          +7 495 118-40-60
        </a>
      </div>
    </div>
  );
};
