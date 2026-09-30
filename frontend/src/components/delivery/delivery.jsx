import clsx from 'clsx';
import { CustomButton } from '../customButton/customButton';
import { LucideIcon } from '../lucideIcon/lucideIcon';
import styles from './delivery.module.scss';
import { AskForm } from '../askForm/askForm';
import { useToast } from '../toast';
import { useModal } from '../modal';

export const Delivery = ({ className }) => {
  const { openModal, closeModal } = useModal();
  const { showToast } = useToast();

  const onConsultationClick = () => {
    openModal({
      variant: 'ask',
      content: (
        <AskForm
          onConfirm={() => {
            showToast('Consultation request sent successfully', 'success');
            closeModal();
          }}
        />
      ),
    });
  };

  return (
    <div className={clsx(styles.delivery, className)}>
      <div className={styles.delivery__row}>
        <p className={styles.delivery__time}>City delivery in 1 day</p>
        <p className={styles.delivery__adress}>
          Pickup: Moscow, 12 Sklyarenko St., showroom and workshop
        </p>
      </div>
      <div className={styles.delivery__row}>
        <p className={styles.delivery__title}>Pay by card or in installments</p>
        <CustomButton className={styles.delivery__btn} onClick={onConsultationClick}>
          <LucideIcon name="MoveRight" color="#22d3ee" size="19" />
          Ask a manager
        </CustomButton>
      </div>
    </div>
  );
};
