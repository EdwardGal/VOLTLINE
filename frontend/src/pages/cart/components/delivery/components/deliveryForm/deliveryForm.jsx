import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInput, FormTextarea } from '../../../../../../components';

import { schema } from './schema';
import styles from './deliveryForm.module.scss';
import { useModal } from '../../../../../../components/modal';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../../../../../store/cart/cartSelectors';
import { OrderSuccess } from '../../../orderSuccess/orderSuccess';
import { useToast } from '../../../../../../components/toast';

export const DeliveryForm = ({ className }) => {
  const { openModal } = useModal();
  const { showToast } = useToast();
  const totalPrice = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

  const {
    register,
    handleSubmit,
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

  const onSubmit = () => {
    if (cartItems.length === 0) {
      showToast('Add products to your cart before placing an order', 'error');
      return;
    }
    openModal({
      variant: 'success',
      content: <OrderSuccess totalPrice={totalPrice} />,
    });
  };

  return (
    <form
      id="delivery-form"
      className={clsx(styles.deliveryForm, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.deliveryForm__fields}>
        <FormInput
          className={styles.deliveryForm__field}
          id="city"
          label="City"
          placeholder="Moscow"
          {...register('city')}
          error={errors.city?.message}
        />

        <FormInput
          className={styles.deliveryForm__field}
          id="street"
          label="Street"
          placeholder="Tverskaya St."
          {...register('street')}
          error={errors.street?.message}
        />
      </div>

      <div className={styles.deliveryForm__fields}>
        <FormInput
          className={styles.deliveryForm__field}
          id="building"
          label="Building"
          placeholder="12/3"
          {...register('building')}
          error={errors.building?.message}
        />

        <FormInput
          className={styles.deliveryForm__field}
          id="apartment"
          label="Apartment / office"
          placeholder="45"
          {...register('apartment')}
          error={errors.apartment?.message}
        />
      </div>

      <div className={styles.deliveryForm__fields}>
        <FormInput
          className={styles.deliveryForm__field}
          id="entrance"
          label="Entrance"
          placeholder="2"
          {...register('entrance')}
          error={errors.entrance?.message}
        />

        <FormInput
          className={styles.deliveryForm__field}
          id="intercom"
          label="Intercom code"
          placeholder="B45"
          {...register('intercom')}
          error={errors.intercom?.message}
        />
      </div>

      <div className={styles.deliveryForm__fields}>
        <FormInput
          className={styles.deliveryForm__field}
          id="deliveryDate"
          label="Delivery date"
          placeholder="02.09.2026"
          {...register('deliveryDate')}
          error={errors.deliveryDate?.message}
        />

        <FormInput
          className={styles.deliveryForm__field}
          id="timeSlot"
          label="Time slot"
          placeholder="10:00-14:00"
          {...register('timeSlot')}
          error={errors.timeSlot?.message}
        />
      </div>

      <FormTextarea
        id="note"
        label="Note for the courier"
        placeholder="Call 30 minutes ahead, leave at the door…"
        {...register('note')}
        error={errors.note?.message}
      />
    </form>
  );
};
