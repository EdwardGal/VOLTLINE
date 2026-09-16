import { CustomLink, PageContainer, Tag } from '../../../../components';
import heroImagePng1x from '../../../../assets/images/hero.png';
import heroImagePng2x from '../../../../assets/images/hero@2x.png';
import heroImageWebp1x from '../../../../assets/images/hero.webp';
import heroImageWebp2x from '../../../../assets/images/hero@2x.webp';
import styles from './hero.module.scss';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <PageContainer className={styles.hero__container}>
        <div className={styles.hero__content}>
          <div className={styles.hero__info}>
            <h1 className={styles.hero__title}>Gaming PCs built for your FPS</h1>
            <div className={styles.hero__subtitle}>
              Real-world gaming tests, 3-year warranty, and no-cost upgrades
            </div>
            <div className={styles.hero__actions}>
              <CustomLink name="Buy a PC" variant="accent" to="/" />
              <CustomLink name="Consultation" to="/" />
            </div>
            <div className={styles.hero__tags}>
              <Tag className={styles.hero__tag} name="RTX 50-series" />
              <Tag className={styles.hero__tag} name="DDR5" />
              <Tag className={styles.hero__tag} name="Quiet Builds" />
              <Tag className={styles.hero__tag} name="0% Installment Plan" />
            </div>
          </div>
          <picture className={styles.hero__picture}>
            <source type="image/webp" srcSet={`${heroImageWebp1x} 1x, ${heroImageWebp2x} 2x`} />
            <img
              src={heroImagePng1x}
              srcSet={`${heroImagePng1x} 1x, ${heroImagePng2x} 2x`}
              alt="Perfect World"
            />
          </picture>
        </div>
      </PageContainer>
    </section>
  );
};
