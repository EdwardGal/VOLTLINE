import { Link } from 'react-router-dom';

import styles from './searchResults.module.scss';
import { ErrorMessage } from '../../../errorMessage/errorMessage';
import { createSlug } from '../../../../utils';


export const SearchResults = ({ products, message }) => {
  if (!products.length && !message) {
    return null;
  }

  return (
    <div className={styles.searchResults}>
      {message ? (
        <ErrorMessage error={{ ...message }} />
      ) : (
        products.map(({ id, images, sku, name, category }) => (
          <Link
            key={id}
            className={styles.searchResults__result}
            to={`/catalog/${createSlug(category)}/${id}`}
          >
            <div className={styles.searchResults__cover}>
              {images?.[0] && (
                <img className={styles.searchResults__image} src={images[0]} alt={name} />
              )}
            </div>

            <div className={styles.searchResults__info}>
              <span className={styles.searchResults__name}>{name}</span>

              <span className={styles.searchResults__sku}>{sku}</span>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};
