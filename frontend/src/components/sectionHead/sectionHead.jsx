import clsx from 'clsx';
import { CustomLink } from '../customLink/customLink';
import { H2 } from '../h2/h2';
import styles from './sectionHead.module.scss';

export const SectionHead = ({ className, title, pathLink, iconName, iconLabel }) => {
  return (
    <div className={clsx(styles.sectionHead, className)}>
      <H2 className={styles.sectionHead__title} title={title} />
      <CustomLink
        className={styles.sectionHead__link}
        name={iconLabel}
        variant="reverse"
        icon={{ name: iconName, size: '19', color: '#22d3ee' }}
        to={pathLink}
      />
    </div>
  );
};
