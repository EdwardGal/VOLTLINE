import clsx from 'clsx';
import styles from './tag.module.scss';

export const Tag = ({ className, variant, name }) => {
  return (
    <span className={clsx(styles.tag, variant && styles[`tag--${variant}`], className)}>
      {name}
    </span>
  );
};
