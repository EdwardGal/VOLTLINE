import styles from './headerLogo.module.scss';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

export const HeaderLogo = () => {
  return (
    <Link className={styles.headerLogo__link} to={ROUTES.HOME}>
      <img className={styles.headerLogo__image} src={logo} alt="Voltline" />
    </Link>
  );
};
