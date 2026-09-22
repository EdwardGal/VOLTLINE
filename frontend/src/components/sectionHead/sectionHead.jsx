import clsx from 'clsx';
import styles from './sectionHead.module.scss';

export const SectionHead = ({ eyebrow, title, description, variant, className }) => {
  const variantClass = variant ? styles[`sectionHead--${variant}`] : null;

  return (
    <div className={clsx(styles.sectionHead, variantClass, className)}>
      <p className={styles.sectionHead__eyebrow}>{eyebrow}</p>
      <h1 className={styles.sectionHead__title}>{title}</h1>
      {description && <p className={styles.sectionHead__description}>{description}</p>}
    </div>
  );
};
