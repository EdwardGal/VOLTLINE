import clsx from 'clsx';
import styles from './customButton.module.scss';
import { LucideIcon } from '../lucideIcon/lucideIcon';

export const CustomButton = ({ icon, className, name, variant, ...props }) => {
  const variantClass = variant ? styles[`customButton--${variant}`] : null;

  return (
    <button className={clsx(styles.customButton, variantClass, className)} type="button" {...props}>
      {icon && <LucideIcon {...icon} />}
      <span className={styles.customButton__name}>{name}</span>
    </button>
  );
};
