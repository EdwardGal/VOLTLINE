import { useState } from 'react';
import clsx from 'clsx';

import { CustomButton, FormInput, LucideIcon } from '../../../../components';

import styles from './panel.module.scss';
import { MAX_PRICE } from '../../catalog.constants';
import { formatPrice } from '../../../../utils';

export const Panel = ({
  categories,
  selectedCategories,
  onCategoryChange,
  conditions,
  onConditionsChange,
  priceRange,
  onPriceRangeChange,
  className,
  category,
}) => {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: false,
    conditions: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCategory = (categoryName) => {
    onCategoryChange((current) =>
      current.includes(categoryName)
        ? current.filter((name) => name !== categoryName)
        : [...current, categoryName]
    );
  };

  const toggleCondition = (condition) => {
    onConditionsChange((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));
  };

  return (
    <aside className={clsx(styles.panel, className)}>
      {!category && (
        <div
          className={clsx(
            styles.panel__section,
            openSections.category && styles['panel__section--open']
          )}
        >
          <CustomButton
            className={styles.panel__sectionHeader}
            onClick={() => toggleSection('category')}
          >
            <span className={styles.panel__sectionTitle}>Category</span>

            <LucideIcon
              className={styles.panel__chevron}
              name={openSections.category ? 'ChevronUp' : 'ChevronDown'}
              size="24"
              color="#22d3ee"
            />
          </CustomButton>

          <div className={styles.panel__content}>
            <div className={styles.panel__options}>
              {categories.map(({ id, name }) => (
                <FormInput
                  className={styles.panel__option}
                  key={id}
                  type="checkbox"
                  value={name}
                  label={name}
                  checked={selectedCategories.includes(name)}
                  onChange={() => toggleCategory(name)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={clsx(
          styles.panel__section,
          openSections.price && styles['panel__section--open']
        )}
      >
        <CustomButton
          className={styles.panel__sectionHeader}
          onClick={() => toggleSection('price')}
        >
          <span className={styles.panel__sectionTitle}>Price</span>

          <LucideIcon
            className={styles.panel__chevron}
            name={openSections.price ? 'ChevronUp' : 'ChevronDown'}
            size="24"
            color="#22d3ee"
          />
        </CustomButton>

        <div className={styles.panel__content}>
          <div className={styles.panel__price}>
            <div className={styles.panel__priceRange}>
              <div className={styles.panel__priceTrack} />

              <div
                className={styles.panel__priceProgress}
                style={{
                  left: `${(priceRange.min / MAX_PRICE) * 100}%`,
                  right: `${100 - (priceRange.max / MAX_PRICE) * 100}%`,
                }}
              />

              <input
                className={styles.panel__priceSlider}
                type="range"
                min="0"
                max={MAX_PRICE}
                value={priceRange.min}
                onChange={({ target }) => {
                  const value = Number(target.value);

                  if (value < priceRange.max) {
                    onPriceRangeChange((prev) => ({
                      ...prev,
                      min: value,
                    }));
                  }
                }}
              />

              <input
                className={styles.panel__priceSlider}
                type="range"
                min="0"
                max={MAX_PRICE}
                value={priceRange.max}
                onChange={({ target }) => {
                  const value = Number(target.value);

                  if (value > priceRange.min) {
                    onPriceRangeChange((prev) => ({
                      ...prev,
                      max: value,
                    }));
                  }
                }}
              />
            </div>

            <div className={styles.panel__priceValues}>
              <span>{formatPrice(priceRange.min)} ₽</span>
              <span>{formatPrice(priceRange.max)} ₽</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          styles.panel__section,
          openSections.conditions && styles['panel__section--open']
        )}
      >
        <CustomButton
          className={styles.panel__sectionHeader}
          onClick={() => toggleSection('conditions')}
        >
          <span className={styles.panel__sectionTitle}>Conditions</span>

          <LucideIcon
            className={styles.panel__chevron}
            name={openSections.conditions ? 'ChevronUp' : 'ChevronDown'}
            size="24"
            color="#22d3ee"
          />
        </CustomButton>

        <div className={styles.panel__content}>
          <ul className={styles.panel__conditions}>
            <li className={styles.panel__condition}>
              <span className={styles.panel__conditionLabel}>In stock</span>

              <button
                className={clsx(
                  styles.panel__conditionToggle,
                  conditions.inStock && styles['panel__conditionToggle--active']
                )}
                onClick={() => toggleCondition('inStock')}
              >
                <span />
              </button>
            </li>

            <li className={styles.panel__condition}>
              <span className={styles.panel__conditionLabel}>On sale</span>

              <button
                className={clsx(
                  styles.panel__conditionToggle,
                  conditions.onSale && styles['panel__conditionToggle--active']
                )}
                onClick={() => toggleCondition('onSale')}
              >
                <span />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
