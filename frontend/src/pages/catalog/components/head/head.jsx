import clsx from 'clsx';

import { CustomButton, FormSelect, LucideIcon } from '../../../../components';

import styles from './head.module.scss';
import { PRODUCT_TAGS } from '../../../../constants';
import { formatSlug } from '../../../../utils';

export const Head = ({
  title,
  productsLength,
  onProductsHandler,
  className,
  viewMode,
  onViewModeChange,
}) => {
  const lastOnPage = productsLength > 8 ? 8 : productsLength;

  return (
    <div className={clsx(styles.head, className)}>
      <div className={styles.head__info}>
        <h1 className={styles.head__title}>{formatSlug(title)}</h1>

        <p className={styles.head__description}>
          {productsLength} products found · showing the first {lastOnPage}
        </p>
      </div>

      <div className={styles.head__actions}>
        <FormSelect
          className={styles.head__select}
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

        <div className={styles.head__switchers}>
          <CustomButton
            className={clsx(
              styles.head__switcher,
              viewMode === 'grid' && styles['head__switcher--active']
            )}
            onClick={() => onViewModeChange('grid')}
          >
            <LucideIcon name="LayoutGrid" color={viewMode === 'grid' ? '#05070f' : '#8B9AC0'} />
          </CustomButton>

          <CustomButton
            className={clsx(
              styles.head__switcher,
              viewMode === 'list' && styles['head__switcher--active']
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
