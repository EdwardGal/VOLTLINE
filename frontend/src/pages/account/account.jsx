import styles from './account.module.scss';
import { Access, PageContainer, TableHead } from '../../components';
import { AccountHeader, ProductsPanel, UsersPanel } from './components';
import { ROLES } from '../../constants';

export const Account = () => {

  return (
    <div className={styles.account}>
      <PageContainer>
        <AccountHeader />

        <div className={styles.account__content}>
          <TableHead
            className={styles.account__head}
            eyebrow={'// Control panel'}
            title={'Controls'}
            description={'Users, roles, and stock levels in one place.'}
          />

          <Access roles={[ROLES.ADMIN]}>
            <UsersPanel />
          </Access>

          <Access roles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <ProductsPanel />
          </Access>
        </div>
      </PageContainer>
    </div>
  );
};
