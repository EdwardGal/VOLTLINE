import clsx from 'clsx';
import { ROUTES } from '../../../../constants';
import { CustomLink } from '../../../customLink/customLink';
import styles from './controlPanel.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/selectors';
import userIcon from '../../../../assets/icons/user.svg';

export const ControlPanel = ({ className }) => {
  const user = useSelector(selectUser);
  const isLoggedIn = Boolean(user?.id);

  return (
    <div className={clsx(styles.controlPanel, className)}>
      <CustomLink
        className={styles.controlPanel__actionsLink}
        icon={isLoggedIn ? { name: 'UserRound' } : null}
        to={isLoggedIn ? ROUTES.ACCOUNT : ROUTES.AUTH}
        name={isLoggedIn ? '' : 'Login'}
      />
      <CustomLink className={styles.controlPanel__actionsLink} to="/contacts" name="Contacts" />
      <CustomLink
        className={styles.controlPanel__actionsLink}
        to="/basket"
        counter="4"
        name="Basket"
        variant="accent"
      />
    </div>
  );
};
