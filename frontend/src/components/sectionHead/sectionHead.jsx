import clsx from 'clsx';
import { CustomLink } from '../customLink/customLink';
import { H2 } from '../h2/h2';
import { LucideIcon } from '../lucideIcon/lucideIcon';
import styles from './sectionHead.module.scss';

export const SectionHead = ({ className, title, to }) => {
  return (
    <div className={clsx(styles.sectionHead, className)}>
      <H2 className={styles.sectionHead__title} title={title} />
      <CustomLink className={styles.sectionHead__link} to={to}>
        <LucideIcon name="MoveRight" size="19" color="#22d3ee" />
        {title}
      </CustomLink>
    </div>
  );
};
