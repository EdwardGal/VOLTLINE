import styles from './headerNav.module.scss';
import { CustomLink } from '../../../customLink/customLink';
import { HEADER_NAV_LINKS } from './header-nav-links';

export const HeaderNav = () => {
  return (
    <div className={styles.headerNav}>
      {HEADER_NAV_LINKS.map(({ key, label }) => (
        <CustomLink
          key={key}
          variant="default"
          to={key}
          name={label}
        />
      ))}
    </div>
  );
};
