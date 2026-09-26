import { Outlet } from 'react-router-dom';
import { Footer, Header, PageContainer } from '../../components';
import styles from './mainLayout.module.scss';

export const MainLayout = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
