import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import styles from './headerLogo.module.scss';

export const HeaderLogo = () => {
  return (
    <Link className={styles.headerLogo} to={ROUTES.HOME}>
      <img className={styles.headerLogo__image} src="/logo.svg" alt="Voltline" />
    </Link>
  );
};
