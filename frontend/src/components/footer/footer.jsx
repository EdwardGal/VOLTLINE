import { PageContainer } from '../pageContainer/pageContainer';
import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <PageContainer>
        <div>footer</div>
      </PageContainer>
    </footer>
  );
};
