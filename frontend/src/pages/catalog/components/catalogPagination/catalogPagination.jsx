import clsx from 'clsx';

import { CustomButton } from '../../../../components';

import styles from './catalogPagination.module.scss';

export const CatalogPagination = ({ className, currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={clsx(styles.pagination, className)}>
      {pages.map((page) => (
        <CustomButton
          key={page}
          variant="pagination"
          className={clsx(
            styles.pagination__button,
            page === currentPage && styles['pagination__button--active']
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </CustomButton>
      ))}
    </div>
  );
};
