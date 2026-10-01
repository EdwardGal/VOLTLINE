import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../../constants';
import { selectUser } from '../../../../store/user/userSelectors';
import { selectCartItemsCount } from '../../../../store/cart/cartSelectors';
import { CustomLink } from '../../../customLink/customLink';
import { LucideIcon } from '../../../lucideIcon/lucideIcon';
import styles from './actions.module.scss';

export const Actions = ({ className }) => {
  const user = useSelector(selectUser);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const isLoggedIn = Boolean(user?.id);

  return (
    <div className={clsx(styles.actions, className)}>
      <CustomLink className={styles.actions__link} to={isLoggedIn ? ROUTES.ACCOUNT : ROUTES.AUTH}>
        {isLoggedIn ? <LucideIcon name={isLoggedIn && 'UserRound'} /> : 'Login'}
      </CustomLink>
      <CustomLink className={styles.actions__link} to={ROUTES.COMING_SOON}>
        Contacts
      </CustomLink>
      <CustomLink className={styles.actions__link} to={ROUTES.CART} variant="accent">
        Cart {cartItemsCount > 0 && cartItemsCount}
      </CustomLink>
    </div>
  );
};
