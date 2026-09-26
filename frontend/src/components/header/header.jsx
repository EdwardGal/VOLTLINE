import { PageContainer } from '../pageContainer/pageContainer';
import styles from './header.module.scss';
import {
  HeaderControlPanel,
  HeaderNav,
  HeaderSearch,
  HeaderTopBar,
  SearchResults,
} from './components';
import { HeaderLogo } from '../headerLogo/headerLogo';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState(null);

  useEffect(() => {
    setSearchValue('');
    setSearchResults([]);
    setSearchMessage(null);
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <PageContainer className={styles.header__container}>
        <HeaderTopBar className={styles.header__topBar} />

        <div className={styles.header__inner}>
          <HeaderLogo />
          <HeaderNav />

          <HeaderSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setSearchResults={setSearchResults}
            setSearchMessage={setSearchMessage}
          />

          <HeaderControlPanel className={styles.header__control} />

          <SearchResults products={searchResults} message={searchMessage} />
        </div>
      </PageContainer>
    </header>
  );
};
