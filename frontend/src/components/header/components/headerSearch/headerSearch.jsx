import { useEffect } from 'react';

import { getProducts } from '../../../../api/productService';
import { useDebounce } from '../../../../hooks/useDebounce';
import { FormInput } from '../../../formInput/formInput';

import styles from './headerSearch.module.scss';

export const HeaderSearch = ({
  searchValue,
  setSearchValue,
  setSearchResults,
  setSearchMessage,
}) => {
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    const search = debouncedSearch.trim();

    if (!search) {
      setSearchResults([]);
      setSearchMessage(null);
      return;
    }

    if (search.length < 3) {
      setSearchResults([]);
      setSearchMessage({
        title: 'Enter More Characters',
        description: 'Search starts after entering three characters',
      });
      return;
    }

    getProducts(search).then(({ data, error }) => {
      if (error) {
        setSearchResults([]);
        setSearchMessage({
          title: 'Search Error',
          description: 'Unable to perform the search',
        });
        return;
      }

      if (!data.length) {
        setSearchResults([]);
        setSearchMessage({
          title: 'Nothing Found',
          description: 'Try rephrasing your search or look for something else',
        });
        return;
      }

      setSearchResults(data);
      setSearchMessage(null);
    });
  }, [debouncedSearch]);

  return (
    <FormInput
      className={styles.headerSearch}
      type="search"
      name="search"
      id="search"
      placeholder="What are you looking for?"
      value={searchValue}
      onChange={({ target }) => setSearchValue(target.value)}
    />
  );
};
