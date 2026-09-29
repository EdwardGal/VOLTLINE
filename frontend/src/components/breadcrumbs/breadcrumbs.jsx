import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { CustomLink } from '../customLink/customLink';

import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = ({ path, className }) => {
  const { pathname } = useLocation();

  const currentPath = pathname.split('/').filter(Boolean)[0];

  return (
    <nav className={clsx(styles.breadcrumbs, className)}>
      <div className={styles.breadcrumbs__item}>
        <CustomLink to="/" className={styles.breadcrumbs__link} variant="default">
          Home
        </CustomLink>

        <span className={styles.breadcrumbs__separator}>/</span>
      </div>

      <div className={styles.breadcrumbs__item}>
        <span className={styles.breadcrumbs__current}>{path || currentPath}</span>
      </div>
    </nav>
  );
};
