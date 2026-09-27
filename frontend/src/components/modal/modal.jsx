import { CustomButton } from '../customButton/customButton';
import { H2 } from '../h2/h2';
import { LucideIcon } from '../lucideIcon/lucideIcon';

import styles from './modal.module.scss';

export const Modal = ({ title, subtitle, icon, content, onClose, onConfirm }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={onClose} />

      <div className={styles.modal__content}>
        <div className={styles.modal__head}>
          <LucideIcon className={styles.modal__icon} name={icon} size="20" />

          <div className={styles.modal__info}>
            <H2 className={styles.modal__title} title={title} />

            <div className={styles.modal__subtitle}>{subtitle}</div>
          </div>

          <CustomButton className={styles.modal__close} variant="default" onClick={onClose}>
            <LucideIcon name="X" />
          </CustomButton>
        </div>

        <div className={styles.modal__body}>{content}</div>

        <div className={styles.modal__actions}>
          <CustomButton variant="productForm" onClick={onClose}>
            Close
          </CustomButton>

          <CustomButton form="product-form" type="submit" variant="productForm" onClick={onConfirm}>
            {title}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
