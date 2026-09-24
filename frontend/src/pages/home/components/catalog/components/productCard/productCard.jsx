import { Link } from 'react-router-dom';
import styles from './productCard.module.scss';

export const ProductCard = ({ name, quantity, image, slug }) => {
  return (
    <Link to={`/catalog/${slug}`}>
      <div className={styles.productCard}>
        <div className={styles.productCard__cover}>
          <img className={styles.productCard__image} src={image} alt={name} />
        </div>
        <div className={styles.productCard__info}>
          <h3 className={styles.productCard__name}>{name}</h3>
          <span className={styles.productCard__quantity}>{quantity} models</span>
        </div>
      </div>
    </Link>
  );
};
