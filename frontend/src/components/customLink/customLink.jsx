import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './customLink.module.scss';

export const CustomLink = ({
  className,
  variant,
  name,
  to,
  counter,
  icon: { src, alt } = {},
  ...props
}) => {
  const variantClass = variant ? styles[`customLink--${variant}`] : null;

  return (
    <Link className={clsx(styles.customLink, variantClass, className)} to={to} {...props}>
      {src && <img className={styles.customLink__icon} src={src} alt={alt} />}
      {name && <span className={styles.customLink__name}>{name}</span>}
      {counter && <span className={styles.customLink__counter}>{counter}</span>}
    </Link>
  );
};
