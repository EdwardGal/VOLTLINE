import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, HeaderLogo } from '../../../../components';
import styles from './accountHeader.module.scss';
import { selectUser } from '../../../../store/selectors';
import { findRoleName } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { logout } from '../../../../store/actions';
import { useToast } from '../../../../components/toast';

export const AccountHeader = () => {
  const { email, roleId } = useSelector(selectUser);

  const { showToast } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleName = findRoleName(roleId);

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('userData');
    showToast('Logged out successfully', 'success');
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <header className={styles.accountHeader}>
      <HeaderLogo />
      <span className={styles.accountHeader__role}>{roleName}</span>
      <div className={styles.accountHeader__user}>
        <span className={styles.accountHeader__status}></span>
        <span className={styles.accountHeader__email}>{email}</span>
      </div>
      <CustomButton
        className={styles.accountHeader__button}
        name="Logout"
        icon={{ name: 'LogOut', size: '24' }}
        onClick={onLogout}
      />
    </header>
  );
};
