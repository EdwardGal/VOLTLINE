import clsx from 'clsx';
import styles from './h2.module.scss';

export const H2 = ({ className, variant, title }) => {
  const variantClass = variant ? styles[`h2--${variant}`] : null;

  return <h2 className={clsx(styles.h2, variantClass, className)}>{title}</h2>;
};
