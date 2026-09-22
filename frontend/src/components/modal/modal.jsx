import { CustomButton } from '../customButton/customButton';
import { LucideIcon } from '../lucideIcon/lucideIcon';

import styles from './modal.module.scss';

export const Modal = ({ title, subtitle, icon, children, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={onClose} />

      <div className={styles.modal__content}>
        <div className={styles.modal__head}>
          <LucideIcon className={styles.modal__icon} name={icon} size="20" />

          <div className={styles.modal__info}>
            <h2 className={styles.modal__title}>{title}</h2>

            <div className={styles.modal__subtitle}>{subtitle}</div>
          </div>

          <CustomButton
            className={styles.modal__close}
            icon={{ name: 'X' }}
            type="button"
            variant="default"
            onClick={onClose}
          />
        </div>

        <div className={styles.modal__body}>{children}</div>

        <div className={styles.modal__actions}>
          <CustomButton name="Close" type="button" variant="productForm" onClick={onClose} />

          <CustomButton name={title} form="product-form" type="submit" variant="productForm" />
        </div>
      </div>
    </div>
  );
};
