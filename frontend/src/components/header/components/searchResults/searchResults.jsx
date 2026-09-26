import { Link } from 'react-router-dom';

import styles from './searchResults.module.scss';
import { ErrorMessage } from '../../../errorMessage/errorMessage';

export const SearchResults = ({ products, message }) => {
  if (!products.length && !message) {
    return null;
  }

  return (
    <div className={styles.searchResults}>
      {message ? (
        <ErrorMessage error={{ ...message }} />
      ) : (
        // <div className={styles.searchResults__message}>
        //   <span className={styles.searchResults__title}>{message.title}</span>

        //   <p className={styles.searchResults__description}>{message.description}</p>
        // </div>
        products.map(({ id, images, sku, name }) => (
          <Link key={id} className={styles.searchResults__result} to={`/products/${id}`}>
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
