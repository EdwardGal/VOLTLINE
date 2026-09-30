import { CustomLink } from '../../../customLink/customLink';
import { HEADER_NAV_LINKS } from './nav-links';
import styles from './nav.module.scss';

export const Nav = () => {
  return (
    <div className={styles.headerNav}>
      {HEADER_NAV_LINKS.map(({ to, label }) => (
        <CustomLink key={label} variant="default" to={to}>
          {label}
        </CustomLink>
      ))}
    </div>
  );
};
