import clsx from 'clsx';
import { CustomButton } from '../customButton/customButton';
import { H2 } from '../h2/h2';
import { LucideIcon } from '../lucideIcon/lucideIcon';

import styles from './modal.module.scss';

export const Modal = ({ title, subtitle, icon, content, onClose, onConfirm, variant }) => {
  return (
    <div className={`${styles.modal} modal-open`}>
      <div className={styles.modal__overlay} onClick={onClose} />

      <div className={styles.modal__content}>
        {variant !== 'success' && (
          <div className={styles.modal__head}>
            <LucideIcon className={styles.modal__icon} name={icon} size="20" />

            <div className={styles.modal__info}>
              <H2 className={styles.modal__title} title={title} />

              <div className={styles.modal__subtitle}>{subtitle}</div>
            </div>

            <CustomButton className={styles.modal__close} variant="form" onClick={onClose}>
              <LucideIcon name="X" />
            </CustomButton>
          </div>
        )}

        <div className={styles.modal__body}>{content}</div>

        {variant === 'success' ? (
          <div className={clsx(styles.modal__actions, styles[`modal__actions--success`])}>
            <CustomButton onClick={onClose} variant="accent">
              Great
            </CustomButton>
            <CustomButton onClick={onClose}>Continue shopping</CustomButton>
          </div>
        ) : (
          <div className={styles.modal__actions}>
            <CustomButton className={styles.modal__btn} onClick={onClose}>
              Close
            </CustomButton>

            <CustomButton
              className={styles.modal__btn}
              form="product-form"
              type="submit"
              onClick={onConfirm}
            >
              {title}
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};
