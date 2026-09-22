import { PageContainer } from '../pageContainer/pageContainer';
import styles from './header.module.scss';
import { ControlPanel, Nav, Search, TopBar } from './components';
import { HeaderLogo } from '../headerLogo/headerLogo';

export const Header = () => {
  return (
    <header className={styles.header}>
      <PageContainer className={styles.header__container}>
        <TopBar className={styles.header__topBar} />
        <div className={styles.header__inner}>
          <HeaderLogo />
          <Nav />
          <Search className={styles.header__search} />
          <ControlPanel className={styles.header__control} />
        </div>
      </PageContainer>
    </header>
  );
};
