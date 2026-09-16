import { useState } from 'react';
import { FormError, FormInput } from '../../../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './authForm.module.scss';
import { schema } from './schema';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import { request } from '../../../../utils/request';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../store/actions';

export const AuthForm = () => {
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
  const [serverError, setServerError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSignin = activeTab === 'signin';

  const onSubmit = ({ email, password }) => {
    const requestUrl = isSignin ? ROUTES.LOGIN : ROUTES.REGISTER;

    request(requestUrl, 'POST', { email, password }).then(({ error, user }) => {
      if (error) {
        setServerError(error);
        return;
      }

      dispatch(setUser(user));
      sessionStorage.setItem('userData', JSON.stringify(user));
      reset();
      navigate(ROUTES.HOME, { replace: true });
    });
  };

  const clearServerError = () => setServerError(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    reset();
    setServerError(null);
  };

  return (
    <div className={styles.authForm}>
      <div className={styles.authForm__head}>
        <p className={styles.authForm__eyebrow}>// MEMBER ACCESS</p>
        <h1 className={styles.authForm__title}>{isSignin ? 'Welcome back' : 'Join the squad'}</h1>
        <p className={styles.authForm__description}>
          {isSignin
            ? 'Sign in to view orders, saved builds, and exclusive deals.'
            : 'Create an account to shop gaming PCs, components, and accessories.'}
        </p>
      </div>
      <div className={styles.authForm__tabs}>
        <button
          className={`${styles.authForm__tab} ${isSignin ? styles.active : ''}`}
          type="button"
          onClick={() => handleTabChange('signin')}
        >
          Sign in
        </button>

        <button
          className={`${styles.authForm__tab} ${!isSignin ? styles.active : ''}`}
          type="button"
          onClick={() => handleTabChange('create')}
        >
          Create account
        </button>
      </div>
      <form className={styles.authForm__form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          label="email"
          type="email"
          placeholder="player@example.com"
          error={errors.email?.message}
          {...register('email', { onChange: clearServerError })}
        />
        <FormInput
          label="password"
          type="password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register('password', { onChange: clearServerError })}
        />
        <button className={styles.authForm__btn} type="submit">
          {isSignin ? 'sign in' : 'create account'}
        </button>
        {serverError && <FormError error={serverError} />}
      </form>
    </div>
  );
};
