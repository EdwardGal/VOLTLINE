import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput, FormTextarea } from '../../../../../../components';
import { useModal } from '../../../../../../components/modal';
import { clearCart } from '../../../../../../store/cart/cartActions';
import { selectCartTotal } from '../../../../../../store/cart/cartSelectors';
import { OrderSuccess } from '../../../orderSuccess/orderSuccess';
import { schema } from './schema';
import styles from './form.module.scss';

export const Form = ({ className }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectCartTotal);

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
    dispatch(clearCart());

    openModal({
      variant: 'success',
      content: <OrderSuccess totalPrice={totalPrice} />,
    });
  };

  return (
    <form
      id="delivery-form"
      className={clsx(styles.form, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.form__fields}>
        <FormInput
          className={styles.form__field}
          id="city"
          label="City"
          placeholder="Moscow"
          {...register('city')}
          error={errors.city?.message}
        />

        <FormInput
          className={styles.form__field}
          id="street"
          label="Street"
          placeholder="Tverskaya St."
          {...register('street')}
          error={errors.street?.message}
        />
      </div>

      <div className={styles.form__fields}>
        <FormInput
          className={styles.form__field}
          id="building"
          label="Building"
          placeholder="12/3"
          {...register('building')}
          error={errors.building?.message}
        />

        <FormInput
          className={styles.form__field}
          id="apartment"
          label="Apartment / office"
          placeholder="45"
          {...register('apartment')}
          error={errors.apartment?.message}
        />
      </div>

      <div className={styles.form__fields}>
        <FormInput
          className={styles.form__field}
          id="entrance"
          label="Entrance"
          placeholder="2"
          {...register('entrance')}
          error={errors.entrance?.message}
        />

        <FormInput
          className={styles.form__field}
          id="intercom"
          label="Intercom code"
          placeholder="B45"
          {...register('intercom')}
          error={errors.intercom?.message}
        />
      </div>

      <div className={styles.form__fields}>
        <FormInput
          className={styles.form__field}
          id="deliveryDate"
          label="Delivery date"
          placeholder="02.09.2026"
          {...register('deliveryDate')}
          error={errors.deliveryDate?.message}
        />

        <FormInput
          className={styles.form__field}
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
