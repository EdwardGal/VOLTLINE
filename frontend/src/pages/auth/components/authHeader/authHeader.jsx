import styles from './authHeader.module.scss';
import { HeaderLogo } from '../../../../components';

export const AuthHeader = () => {
  return (
    <header className={styles.authHeader}>
      <HeaderLogo />
      <div className={styles.authHeader__status}>
        <span className={styles.authHeader__statusDot}></span>
        <span className={styles.authHeader__statusText}>All systems online</span>
      </div>
    </header>
  );
};
