import clsx from 'clsx';
import { CustomButton, LucideIcon } from '../../../../../../components';
import styles from './filterSection.module.scss';

export const FilterSection = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className={clsx(styles.filterSection, isOpen && styles['filterSection--open'])}>
      <CustomButton className={styles.filterSection__header} onClick={onToggle}>
        <span className={styles.filterSection__title}>{title}</span>

        <LucideIcon
          className={styles.filterSection__chevron}
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size="24"
          color="#22d3ee"
        />
      </CustomButton>

      <div className={styles.filterSection__content}>{children}</div>
    </div>
  );
};
