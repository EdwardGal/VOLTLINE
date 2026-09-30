import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './customLink.module.scss';

export const CustomLink = ({ children, to, variant }) => {
  const variantClass = variant ? styles[`customLink--${variant}`] : null;

  return (
    <Link className={clsx(styles.customLink, variantClass)} to={to}>
      {children}
    </Link>
  );
};
