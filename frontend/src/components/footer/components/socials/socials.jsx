import { Link } from 'react-router-dom';
import styles from './socials.module.scss';
import { SOCIALS_DATA } from '../contacts.constants';



export const Social = () => {
  return (
    <div className={styles.social}>
      {SOCIALS_DATA.map(({ name, href, icon }) => (
        <Link key={name} className={styles.social__link} to={href}>
          <svg className={styles.social__icon}>
            <use href={`/assets/sprite.svg#${icon}`} />
          </svg>
        </Link>
      ))}
    </div>
  );
};
