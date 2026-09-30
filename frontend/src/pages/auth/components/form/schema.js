import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Please enter your email')
    .matches(/^[^\s@]+@[^\s@]+.[^\s@]+$/, 'Please enter a valid email address'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be no more than 30 characters long'),
});
