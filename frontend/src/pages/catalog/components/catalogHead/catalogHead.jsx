import clsx from 'clsx';

import { CustomButton, FormSelect, LucideIcon } from '../../../../components';

import styles from './catalogHead.module.scss';
import { PRODUCT_TAGS } from '../../../../constants';
import { formatSlug } from '../../../../utils';

export const CatalogHead = ({
  title,
  productsLength,
  onProductsHandler,
  className,
  viewMode,
  onViewModeChange,
}) => {
  const lastOnPage = productsLength > 8 ? 8 : productsLength;

  return (
    <div className={clsx(styles.catalogHead, className)}>
      <div className={styles.catalogHead__info}>
        <h1 className={styles.catalogHead__title}>{formatSlug(title)}</h1>

        <p className={styles.catalogHead__description}>
          {productsLength} products found · showing the first {lastOnPage}
        </p>
      </div>

      <div className={styles.catalogHead__actions}>
        <FormSelect
          className={styles.catalogHead__select}
          onChange={({ target }) =>
            onProductsHandler({
              value: target.value,
              trigger: 'tag',
            })
          }
        >
          <option value="">Show all</option>

          {PRODUCT_TAGS.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </FormSelect>

        <div className={styles.catalogHead__switchers}>
          <CustomButton
            className={clsx(
              styles.catalogHead__switcher,
              viewMode === 'grid' && styles['catalogHead__switcher--active']
            )}
            onClick={() => onViewModeChange('grid')}
          >
            <LucideIcon name="LayoutGrid" color={viewMode === 'grid' ? '#05070f' : '#8B9AC0'} />
          </CustomButton>

          <CustomButton
            className={clsx(
              styles.catalogHead__switcher,
              viewMode === 'list' && styles['catalogHead__switcher--active']
            )}
            onClick={() => onViewModeChange('list')}
          >
            <LucideIcon name="List" color={viewMode === 'list' ? '#05070f' : '#8B9AC0'} />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
