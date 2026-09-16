import styles from './account.module.scss';
import logoutIcon from '../../assets/icons/logout.svg';
import prevIcon from '../../assets/icons/prev.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { CustomButton, CustomLink, PageContainer } from '../../components';
import { selectUser } from '../../store/selectors';

export const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector(selectUser);

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('userData');
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <div className={styles.account}>
      <PageContainer>
        <div className={styles.accout__content}>
          <div className={styles.account__nav}>
            <CustomLink name="Home" icon={{ src: prevIcon, alt: 'Prev page' }} to={ROUTES.HOME} />
            <span className={styles.account__name}>{email}</span>
            <CustomButton
              name="Logout"
              icon={{ src: logoutIcon, alt: 'Profile logout' }}
              onClick={onLogout}
            />
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
