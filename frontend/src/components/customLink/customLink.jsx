import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './customLink.module.scss';
import { LucideIcon } from '../lucideIcon/lucideIcon';



export const CustomLink = ({ className, variant, name, to, counter, icon, ...props }) => {
  const variantClass = variant ? styles[`customLink--${variant}`] : null;

  return (
    <Link className={clsx(styles.customLink, variantClass, className)} to={to} {...props}>
      {icon && <LucideIcon {...icon} />}
      {name && <span className={styles.customLink__name}>{name}</span>}
      {counter && <span className={styles.customLink__counter}>{counter}</span>}
    </Link>
  );
};
