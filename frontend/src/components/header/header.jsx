import logo from '../../assets/logo.svg';
import { PageContainer } from '../pageContainer/pageContainer';

import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import styles from './header.module.scss';
import { ControlPanel, Nav, Search, TopBar } from './components';

export const Header = () => {
  return (
    <header className={styles.header}>
      <PageContainer className={styles.header__container}>
        <TopBar className={styles.header__topBar} />
        <div className={styles.header__inner}>
          <Link className={styles.header__navLink} to={ROUTES.HOME}>
            <img className={styles.header__logo} src={logo} alt="Voltline" />
          </Link>
          <Nav />
          <Search className={styles.header__search} />
          <ControlPanel className={styles.header__} />
        </div>
      </PageContainer>
    </header>
  );
};
