import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageContainer } from '../pageContainer/pageContainer';
import { HeaderLogo } from '../headerLogo/headerLogo';
import { Actions, Nav, Search, TopBar, SearchResults } from './components';
import styles from './header.module.scss';

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
        <TopBar className={styles.header__topBar} />

        <div className={styles.header__inner}>
          <HeaderLogo />
          <Nav />

          <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setSearchResults={setSearchResults}
            setSearchMessage={setSearchMessage}
          />

          <Actions className={styles.header__control} />

          <SearchResults products={searchResults} message={searchMessage} />
        </div>
      </PageContainer>
    </header>
  );
};
