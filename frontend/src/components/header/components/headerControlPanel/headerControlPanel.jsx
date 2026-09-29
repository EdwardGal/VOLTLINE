import clsx from 'clsx';
import { ROUTES } from '../../../../constants';
import { CustomLink } from '../../../customLink/customLink';
import styles from './headerControlPanel.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/selectors';
import { selectCartItemsCount } from '../../../../store/cart/cartSelectors';
import { LucideIcon } from '../../../lucideIcon/lucideIcon';

export const HeaderControlPanel = ({ className }) => {
  const user = useSelector(selectUser);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const isLoggedIn = Boolean(user?.id);

  return (
    <div className={clsx(styles.headerControlPanel, className)}>
      <CustomLink
        className={styles.headerControlPanel__actionsLink}
        to={isLoggedIn ? ROUTES.ACCOUNT : ROUTES.AUTH}
      >
        {isLoggedIn ? <LucideIcon name={isLoggedIn && 'UserRound'} /> : 'Login'}
      </CustomLink>
      <CustomLink className={styles.headerControlPanel__actionsLink} to={ROUTES.COMING_SOON}>
        Contacts
      </CustomLink>
      <CustomLink
        className={styles.headerControlPanel__actionsLink}
        to={ROUTES.CART}
        variant="accent"
      >
        Cart {cartItemsCount > 0 && cartItemsCount}
      </CustomLink>
    </div>
  );
};
