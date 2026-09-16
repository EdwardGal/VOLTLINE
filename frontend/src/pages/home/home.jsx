import { Header, Footer } from '../../components';
import { Hero } from './components';
import styles from './home.module.scss';



export const Home = () => {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <Hero />
      </main>
      <Footer />
    </>
  );
};
