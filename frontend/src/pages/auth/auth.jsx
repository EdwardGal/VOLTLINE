import { Navigate } from 'react-router-dom';
import { PageContainer } from '../../components';
import { ROUTES } from '../../constants';
import { checkSession } from '../../utils';
import { Form, Header, Promo } from './components';
import styles from './auth.module.scss';

export const Auth = () => {
  const userData = checkSession();

  if (userData) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <section className={styles.auth}>
      <PageContainer>
        <Header />
        <div className={styles.auth__content}>
          <Form />
          <Promo />
        </div>
      </PageContainer>
    </section>
  );
};
