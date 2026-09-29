import clsx from 'clsx';
import styles from './card.module.scss';
import { Link } from 'react-router-dom';

export const Card = ({ image, name, to, quantity }) => {
  return (
    <article className={clsx(styles.card, !quantity && styles[`card--disabled`])}>
      <div className={styles.card__cover}>
        <img className={styles.card__image} src={image} alt={name} />

        <Link className={styles.card__link} to={to} />
      </div>

      <div className={styles.card__info}>
        <div className={styles.card__infoHead}>
          <h3 className={styles.card__name}>{name}</h3>

          <span className={styles.card__sku}>{quantity} models</span>
        </div>
      </div>
    </article>
  );
};
