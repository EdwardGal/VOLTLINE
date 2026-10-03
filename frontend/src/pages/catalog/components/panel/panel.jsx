import clsx from 'clsx';
import { useState } from 'react';
import { FormInput } from '../../../../components';
import { formatPrice } from '../../../../utils';
import { FilterSection } from './components';
import styles from './panel.module.scss';

const conditionOptions = [
  {
    key: 'inStock',
    label: 'In stock',
  },
  {
    key: 'onSale',
    label: 'On sale',
  },
];

export const Panel = ({
  products,
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

  const maxPrice = Math.max(...products.map(({ price }) => price), 0);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCategory = (categoryName) => {
    const nextCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((name) => name !== categoryName)
      : [...selectedCategories, categoryName];

    onCategoryChange(nextCategories);
  };

  const toggleCondition = (condition) => {
    onConditionsChange({
      ...conditions,
      [condition]: !conditions[condition],
    });
  };

  const minPercent = maxPrice ? (priceRange.min / maxPrice) * 100 : 0;

  const maxPercent = maxPrice ? (priceRange.max / maxPrice) * 100 : 100;

  return (
    <aside className={clsx(styles.panel, className)}>
      {!category && (
        <FilterSection
          title="Category"
          isOpen={openSections.category}
          onToggle={() => toggleSection('category')}
        >
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
        </FilterSection>
      )}

      <FilterSection
        title="Price"
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className={styles.panel__price}>
          <div className={styles.panel__priceRange}>
            <div className={styles.panel__priceTrack} />

            <div
              className={styles.panel__priceProgress}
              style={{
                left: `${minPercent}%`,
                right: `${100 - maxPercent}%`,
              }}
            />

            <input
              className={clsx(styles.panel__priceSlider, styles['panel__priceSlider--min'])}
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange.min}
              onChange={({ target }) => {
                const value = Number(target.value);

                if (value <= priceRange.max) {
                  onPriceRangeChange({
                    ...priceRange,
                    min: value,
                  });
                }
              }}
            />

            <input
              className={clsx(styles.panel__priceSlider, styles['panel__priceSlider--max'])}
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange.max}
              onChange={({ target }) => {
                const value = Number(target.value);

                if (value >= priceRange.min) {
                  onPriceRangeChange({
                    ...priceRange,
                    max: value,
                  });
                }
              }}
            />
          </div>

          <div className={styles.panel__priceValues}>
            <span>{formatPrice(priceRange.min)}</span>
            <span>{formatPrice(priceRange.max)}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection
        title="Conditions"
        isOpen={openSections.conditions}
        onToggle={() => toggleSection('conditions')}
      >
        <ul className={styles.panel__conditions}>
          {conditionOptions.map(({ key, label }) => (
            <li className={styles.panel__condition} key={key}>
              <span className={styles.panel__conditionLabel}>{label}</span>

              <button
                className={clsx(
                  styles.panel__conditionToggle,
                  conditions[key] && styles['panel__conditionToggle--active']
                )}
                onClick={() => toggleCondition(key)}
              >
                <span />
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>
    </aside>
  );
};
