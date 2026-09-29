import { PageContainer } from '../../components';
import styles from './notFound.module.scss';

export const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <PageContainer>
        <div className={styles.notFound__content}>
          <h1 className={styles.notFound__title}>Oops! That page can’t be found</h1>
          <div className={styles.notFound__cover}>
            <img className={styles.notFound__image} src="/assets/404@2x.png" alt="404" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
