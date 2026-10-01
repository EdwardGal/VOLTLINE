import { useState } from 'react';
import { ErrorMessage, FormInput, TableHead } from '../../../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './form.module.scss';
import { schema } from './schema';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { request } from '../../../../utils/request';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../store/user/userActions';
import { useToast } from '../../../../components/toast';

export const Form = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const [activeTab, setActiveTab] = useState('signin');
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { showToast } = useToast();

  const isSignin = activeTab === 'signin';

  const onSubmit = ({ email, password }) => {
    const requestUrl = isSignin ? ROUTES.LOGIN : ROUTES.REGISTER;

    request(requestUrl, 'POST', { email, password }).then(({ error, user }) => {
      if (error) {
        setServerErrorMessage(error);
        return;
      }

      dispatch(setUser(user));
      sessionStorage.setItem('userData', JSON.stringify(user));
      reset();

      showToast(isSignin ? 'Logged in successfully' : 'Account created successfully', 'success');

      navigate(ROUTES.HOME, { replace: true });
    });
  };

  const clearServerError = () => setServerErrorMessage(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    reset();
    setServerErrorMessage(null);
  };

  return (
    <div className={styles.form}>
      <TableHead
        className={styles.form__head}
        eyebrow="// MEMBER ACCESS"
        title={isSignin ? 'Welcome back' : 'Join the squad'}
        description={
          isSignin
            ? 'Sign in to view orders, saved builds, and exclusive deals.'
            : 'Create an account to shop gaming PCs, components, and accessories.'
        }
      />
      <div className={styles.form__tabs}>
        <button
          className={`${styles.form__tab} ${isSignin ? styles.active : ''}`}
          type="button"
          onClick={() => handleTabChange('signin')}
        >
          Sign in
        </button>

        <button
          className={`${styles.form__tab} ${!isSignin ? styles.active : ''}`}
          type="button"
          onClick={() => handleTabChange('create')}
        >
          Create account
        </button>
      </div>
      <form className={styles.form__form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          label="email"
          type="email"
          placeholder="player@example.com"
          autoComplete={'email'}
          error={errors.email?.message}
          {...register('email', { onChange: clearServerError })}
        />
        <FormInput
          label="password"
          type="password"
          placeholder="At least 6 characters"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password', { onChange: clearServerError })}
        />
        <button className={styles.form__btn} type="submit">
          {isSignin ? 'sign in' : 'create account'}
        </button>
        {serverErrorMessage && <ErrorMessage error={serverErrorMessage} />}
      </form>
    </div>
  );
};
