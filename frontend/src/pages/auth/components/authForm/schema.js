import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Заполните email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Введите корректный email'),
  password: yup
    .string()
    .required('Заполните пароль')
    .min(6, 'Неверно заполнен пароль. Минимум 6 символов')
    .max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});
