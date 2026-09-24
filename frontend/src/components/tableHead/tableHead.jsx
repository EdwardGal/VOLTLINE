import clsx from 'clsx';
import styles from './tableHead.module.scss';

export const TableHead = ({ eyebrow, title, description, variant, className }) => {
  const variantClass = variant ? styles[`tableHead--${variant}`] : null;

  return (
    <div className={clsx(styles.tableHead, variantClass, className)}>
      <p className={styles.tableHead__eyebrow}>{eyebrow}</p>
      <h1 className={styles.tableHead__title}>{title}</h1>
      {description && <p className={styles.tableHead__description}>{description}</p>}
    </div>
  );
};
