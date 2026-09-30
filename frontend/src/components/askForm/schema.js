import * as yup from 'yup';

export const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must contain at least 2 characters')
    .max(50, 'Name must contain no more than 50 characters'),

  phone: yup
    .string()
    .trim()
    .required('Phone is required')
    .matches(/^\+?[0-9\s\-()]{10,20}$/, 'Enter a valid phone number'),

  question: yup
    .string()
    .trim()
    .min(10, 'Question must contain at least 10 characters')
    .max(500, 'Question must contain no more than 500 characters'),
});
