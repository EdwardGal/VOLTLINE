import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomButton, HeaderLogo, LucideIcon, PageContainer } from '../../../../components';
import { ROUTES } from '../../../../constants';
import { logout } from '../../../../store/user/userActions';
import { selectUser } from '../../../../store/user/userSelectors';
import { useToast } from '../../../../components/toast';
import { findRoleName } from '../../../../utils';
import styles from './head.module.scss';


export const Head = () => {
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
    <header className={styles.head}>
      <PageContainer>
        <div className={styles.head__content}>
          <HeaderLogo />
          <span className={styles.head__role}>{roleName}</span>
          <div className={styles.head__user}>
            <span className={styles.head__status}></span>
            <span className={styles.head__email}>{email}</span>
          </div>
          <CustomButton className={styles.head__button} onClick={onLogout}>
            <LucideIcon name="LogOut" />
            Logout
          </CustomButton>
        </div>
      </PageContainer>
    </header>
  );
};
