import styles from './header.module.scss';
import { HeaderLogo } from '../../../../components';

export const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo />
      <div className={styles.header__status}>
        <span className={styles.header__statusDot}></span>
        <span className={styles.header__statusText}>All systems online</span>
      </div>
    </header>
  );
};
