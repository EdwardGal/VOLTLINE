import { useSelector } from 'react-redux';
import { Access, PageContainer, TableHead } from '../../components';
import { ROLES } from '../../constants';
import { selectUser } from '../../store/selectors';
import { ComingSoon } from '../сomingSoon/comingSoon';
import { Head, Products, Users } from './components';
import styles from './account.module.scss';

export const Account = () => {
  const { roleId } = useSelector(selectUser);

  return (
    <div className={styles.account}>
      <PageContainer>
        <Head />

        {roleId === ROLES.USER ? (
          <ComingSoon />
        ) : (
          <div className={styles.account__content}>
            <TableHead
              className={styles.account__head}
              eyebrow={'// Control panel'}
              title={'Controls'}
              description={'Users, roles, and stock levels in one place.'}
            />

            <Access roles={[ROLES.ADMIN]}>
              <Users />
            </Access>

            <Access roles={[ROLES.ADMIN, ROLES.MANAGER]}>
              <Products />
            </Access>
          </div>
        )}
      </PageContainer>
    </div>
  );
};
