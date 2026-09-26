import clsx from 'clsx';
import { ROUTES } from '../../../../constants';
import { CustomLink } from '../../../customLink/customLink';
import styles from './headerControlPanel.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/selectors';


export const HeaderControlPanel = ({ className }) => {
  const user = useSelector(selectUser);
  const isLoggedIn = Boolean(user?.id);

  return (
    <div className={clsx(styles.headerControlPanel, className)}>
      <CustomLink
        className={styles.headerControlPanel__actionsLink}
        icon={isLoggedIn ? { name: 'UserRound' } : null}
        to={isLoggedIn ? ROUTES.ACCOUNT : ROUTES.AUTH}
        name={isLoggedIn ? '' : 'Login'}
      />
      <CustomLink className={styles.headerControlPanel__actionsLink} to="/contacts" name="Contacts" />
      <CustomLink
        className={styles.headerControlPanel__actionsLink}
        to="/basket"
        counter="4"
        name="Basket"
        variant="accent"
      />
    </div>
  );
};
