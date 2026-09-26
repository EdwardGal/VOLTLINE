import { PageContainer } from '../pageContainer/pageContainer';
import { Brand, Contacts, Legal, Navigation } from './components';
import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <PageContainer>
        <div className={styles.footer__content}>
          <Brand />
          <Navigation />
          <Contacts />
          <Legal />
        </div>
      </PageContainer>
    </footer>
  );
};
