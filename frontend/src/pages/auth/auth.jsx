import { PageContainer } from '../../components';
import { AuthForm, AuthHeader, AuthPromo } from './components';
import styles from './auth.module.scss';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { checkSession } from '../../utils';

export const Auth = () => {
  const userData = checkSession();

  if (userData) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <section className={styles.auth}>
      <PageContainer>
        <AuthHeader />
        <div className={styles.auth__content}>
          <AuthForm />
          <AuthPromo />
        </div>
      </PageContainer>
    </section>
  );
};
