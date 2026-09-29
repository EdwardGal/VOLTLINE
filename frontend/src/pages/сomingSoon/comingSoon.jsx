import { PageContainer } from '../../components';
import styles from './comingSoon.module.scss';

export const ComingSoon = () => {
  return (
    <section className={styles.comingSoon}>
      <PageContainer className={styles.comingSoon__container}>
        <div className={styles.comingSoon__content}>
          <h1 className={styles.comingSoon__title}>Something awesome is coming soon</h1>
          <div className={styles.comingSoon__cover}>
            <img
              className={styles.comingSoon__image}
              src="/assets/coming-soon@2x.png"
              alt="coming soon"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
