import clsx from 'clsx';
import styles from './h2.module.scss';

export const H2 = ({ className, children }) => {
  return <h2 className={clsx(styles.h2, className)}>{children}</h2>;
};
