import clsx from 'clsx';
import styles from './customButton.module.scss';

export const CustomButton = ({ icon: { src, alt } = {}, className, name, ...props }) => {
  return (
    <button className={clsx(styles.customButton, className)} type="button" {...props}>
      <span className={styles.customButton__name}>{name}</span>
      {src && <img className={styles.customButton__icon} src={src} alt={alt} />}
    </button>
  );
};
