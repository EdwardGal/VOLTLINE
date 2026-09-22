import * as lucideIcons from 'lucide-react';

import styles from './lucideIcon.module.scss';

export const LucideIcon = ({ name, ...props }) => {
  const Icon = lucideIcons[name];

  if (!Icon) {
    return null;
  }

  return <Icon className={styles.lucideIcon} size="16" color="#eaf2ff" {...props} />;
};
