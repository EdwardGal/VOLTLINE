import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.svg';
import { ROUTES } from '../../../../constants';
import styles from './authHeader.module.scss';

export const AuthHeader = () => {
  return (
    <header className={styles.authHeader}>
      <Link to={ROUTES.HOME}>
        <img className={styles.authHeader__logo} src={logo} alt="voltline" />
      </Link>
      <div className={styles.authHeader__status}>
        <span className={styles.authHeader__statusDot}></span>
        <span className={styles.authHeader__statusText}>All systems online</span>
      </div>
    </header>
  );
};
