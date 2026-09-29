import styles from './legal.module.scss';
import { CustomLink } from '../../../customLink/customLink';

export const Legal = () => {
  return (
    <div className={styles.legal}>
      <p className={styles.legal__copy}>© 2026 VOLTLINE. Computer hardware</p>
      <div className={styles.legal__links}>
        <CustomLink variant="default" to="/privacy">
          Privacy policy
        </CustomLink>
        <CustomLink variant="default" to="/terms-of-sale">
          Terms of sale
        </CustomLink>
      </div>
    </div>
  );
};
