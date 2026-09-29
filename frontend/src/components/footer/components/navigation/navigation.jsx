import styles from './navigation.module.scss';
import { CustomLink } from '../../../customLink/customLink';
import { NAVIGATION_DATA } from '../contacts.constants';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      {NAVIGATION_DATA.map((section) => (
        <div className={styles.navigation__column} key={section.title}>
          <h3 className={styles.navigation__title}>{section.title}</h3>

          <ul className={styles.navigation__list}>
            {section.links.map(({ label, to }) => (
              <li className={styles.navigation__item} key={label}>
                <CustomLink className={styles.navigation__link} variant="default" to={to}>
                  {label}
                </CustomLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};
