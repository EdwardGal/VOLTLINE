import { Header, Footer } from '../../components';
import { Catalog, Hero, Popular } from './components';
import styles from './home.module.scss';

export const Home = () => {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <Hero />
        <Catalog />
        <Popular />
      </main>
      <Footer />
    </>
  );
};
