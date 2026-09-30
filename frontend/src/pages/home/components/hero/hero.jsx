import { AskForm, CustomButton, CustomLink, PageContainer, Tag } from '../../../../components';
import { useToast } from '../../../../components/toast';
import { useModal } from '../../../../components/modal';
import { ROUTES } from '../../../../constants';
import { HERO_TAGS } from './hero.constants';
import styles from './hero.module.scss';

export const Hero = () => {
  const { openModal, closeModal } = useModal();
  const { showToast } = useToast();

  const onConsultationClick = () => {
    openModal({
      variant: 'ask',
      content: (
        <AskForm
          onConfirm={() => {
            showToast('Consultation request sent successfully', 'success');
            closeModal();
          }}
        />
      ),
    });
  };

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
              <CustomLink variant="accent" to={ROUTES.GAMING_PCS}>
                Buy a PC
              </CustomLink>

              <CustomButton className={styles.hero__btn} onClick={onConsultationClick}>Consultation</CustomButton>
            </div>

            <div className={styles.hero__tags}>
              {HERO_TAGS.map((tag) => (
                <Tag className={styles.hero__tag} key={tag} name={tag} />
              ))}
            </div>
          </div>

          <picture className={styles.hero__picture}>
            <source type="image/webp" srcSet="/assets/hero.webp 1x, /assets/hero@2x.webp 2x" />

            <img
              src="/assets/hero.png"
              srcSet="/assets/hero.png 1x, /assets/hero@2x.png 2x"
              alt="Gaming PC"
            />
          </picture>
        </div>
      </PageContainer>
    </section>
  );
};
