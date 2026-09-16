import clsx from 'clsx';
import styles from './pageContainer.module.scss';

export const PageContainer = ({ className, children }) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};
