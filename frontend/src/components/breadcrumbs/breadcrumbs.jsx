import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = ({ category, className }) => {
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    ...segments.map((segment, index) => ({
      label:
        index === 1
          ? category
          : segment.replaceAll('-', ' ').replace(/^./, (char) => char.toUpperCase()),
      path: '/' + segments.slice(0, index + 1).join('/'),
    })),
  ];

  return (
    <nav className={clsx(styles.breadcrumbs, className)} aria-label="Breadcrumb">
      {breadcrumbs.map(({ label, path }, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div className={styles.breadcrumbs__item} key={path}>
            {isLast ? (
              <span className={styles.breadcrumbs__current}>{label}</span>
            ) : (
              <Link to={path} className={styles.breadcrumbs__link}>
                {label}
              </Link>
            )}

            {!isLast && <span className={styles.breadcrumbs__separator}>/</span>}
          </div>
        );
      })}
    </nav>
  );
};
