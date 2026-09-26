import styles from './legal.module.scss';
import { CustomLink } from '../../../customLink/customLink';

export const Legal = () => {
  return (
    <div className={styles.legal}>
      <p className={styles.legal__copy}>© 2026 VOLTLINE. Computer hardware</p>
      <div className={styles.legal__links}>
        <CustomLink variant="default" name="Privacy policy" to="/privacy" />
        <CustomLink variant="default" name="Terms of sale" to="/terms-of-sale" />
      </div>
    </div>
  );
};
