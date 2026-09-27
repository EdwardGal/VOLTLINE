import clsx from 'clsx';
import styles from './customButton.module.scss';

export const CustomButton = ({ className, children, type = 'button', variant, ...props }) => {
  const variantClass = variant ? styles[`customButton--${variant}`] : null;

  return (
    <button className={clsx(styles.customButton, variantClass, className)} type={type} {...props}>
      {children}
    </button>
  );
};
