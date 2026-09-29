import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';

import styles from './deliveryForm.module.scss';
import { FormInput, FormTextarea } from '../../../../../../components';
import clsx from 'clsx';

export const DeliveryForm = ({ className }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: '',
      street: '',
      building: '',
      apartment: '',
      entrance: '',
      intercom: '',
      deliveryDate: '',
      timeSlot: '',
      note: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form id="delivery-form" className={clsx(styles.deliveryForm, className)}>
      <div className={styles.deliveryForm__fields}>
        <FormInput
          className={styles.deliveryForm__field}
          id="City"
          label="City"
          placeholder="Moscow"
        />
        <FormInput
          className={styles.deliveryForm__field}
          id="Streett"
          label="Street"
          placeholder="Tverskaya St."
        />
      </div>
      <div className={styles.deliveryForm__fields}>
        <FormInput
          className={styles.deliveryForm__field}
          id="Building"
          label="Building"
          placeholder="12/3"
        />
        <FormInput
          className={styles.deliveryForm__field}
          id="Apartment / office"
          label="Apartment / office"
          placeholder="45"
        />
      </div>
      <div className={styles.deliveryForm__fields}>
        <FormInput
          className={styles.deliveryForm__field}
          id="Entrance"
          label="Entrance"
          placeholder="2"
        />
        <FormInput
          className={styles.deliveryForm__field}
          id="Intercom code"
          label="Intercom code"
          placeholder="B45"
        />
      </div>
      <div className={styles.deliveryForm__fields}>
        <FormInput
          className={styles.deliveryForm__field}
          id="Delivery date"
          label="Delivery date"
          placeholder="02.09.2026"
        />
        <FormInput
          className={styles.deliveryForm__field}
          id="Time slot"
          label="Time slot"
          placeholder="10:00-14:00"
        />
      </div>
      <FormTextarea
        label="Note for the courier"
        placeholder="Call 30 minutes ahead, leave at the door…"
      />
    </form>
  );
};
