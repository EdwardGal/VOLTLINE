import clsx from 'clsx';
import styles from './search.module.scss';

export const Search = ({ className }) => {
  return (
    <div className={clsx(styles.search, className)}>
      <input type="search" name="search" id="search" placeholder="What are you looking for?" />
    </div>
  );
};
