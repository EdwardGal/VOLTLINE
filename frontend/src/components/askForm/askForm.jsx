import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../formInput/formInput';
import { FormTextarea } from '../formTextArea/formTextArea';
import { H2 } from '../h2/h2';
import { schema } from './schema';
import styles from './askForm.module.scss';

export const AskForm = ({ className, onConfirm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      question: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => onConfirm(data);

  return (
    <div className={styles.askForm}>
      <div className={styles.askForm__head}>
        <img className={styles.askForm__logo} src="/logo.svg" alt="Voltline" />
        <H2 className={styles.askForm__title} title="Ask your question" />
      </div>

      <form
        id="ask-form"
        className={clsx(styles.askForm__form, className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.askForm__fields}>
          <FormInput
            className={styles.askForm__field}
            id="name"
            label="Name"
            placeholder="How should we address you"
            {...register('name')}
            error={errors.name?.message}
          />

          <FormInput
            className={styles.askForm__field}
            id="phone"
            label="Phone"
            type="tel"
            placeholder="+7 ___ ___-__-__"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>

        <FormTextarea
          id="question"
          label="Your question"
          placeholder="A question about a product, delivery or an order."
          rows={5}
          {...register('question')}
          error={errors.question?.message}
        />
      </form>
    </div>
  );
};
