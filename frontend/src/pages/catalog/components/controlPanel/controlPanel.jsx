import clsx from 'clsx';
import styles from './controlPanel.module.scss';

export const ControlPanel = ({ className }) => {
  return <aside className={clsx(styles.controlPanel, className)}>ПАНЕЛЬ</aside>;
};
