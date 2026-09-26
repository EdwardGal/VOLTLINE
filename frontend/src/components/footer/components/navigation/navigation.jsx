import styles from './navigation.module.scss';
import { CustomLink } from '../../../customLink/customLink';
import { NAVIGATION_DATA } from './navigation-data';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      {NAVIGATION_DATA.map((section) => (
        <div className={styles.navigation__column} key={section.title}>
          <h3 className={styles.navigation__title}>{section.title}</h3>

          <ul className={styles.navigation__list}>
            {section.links.map(({ label, href }) => (
              <li className={styles.navigation__item} key={href}>
                <CustomLink
                  className={styles.navigation__link}
                  variant="default"
                  name={label}
                  to={href}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};
