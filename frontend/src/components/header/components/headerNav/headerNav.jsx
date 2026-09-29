import styles from './headerNav.module.scss';
import { CustomLink } from '../../../customLink/customLink';
import { HEADER_NAV_LINKS } from './header-nav-links';

export const HeaderNav = () => {
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
