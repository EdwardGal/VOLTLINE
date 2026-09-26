import { HeaderLogo } from '../../../headerLogo/headerLogo';
import { Social } from '../socials/socials';
import styles from './brand.module.scss';

export const Brand = () => {
  return (
    <div className={styles.brand}>
      <HeaderLogo className={styles.brand__logo} />
      <div className={styles.brand__description}>
        We build computers that never lag. Computer hardware delivered across the country.
      </div>
      <Social />
    </div>
  );
};
