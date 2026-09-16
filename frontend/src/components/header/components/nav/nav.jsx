import { Link } from 'react-router-dom';
import styles from './nav.module.scss';

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link className={styles.nav__link} to="/catalog">
        Catalog
      </Link>
      <Link className={styles.nav__link} to="/news">
        News
      </Link>
      <Link className={styles.nav__link} to="/service">
        Service
      </Link>
    </nav>
  );
};
