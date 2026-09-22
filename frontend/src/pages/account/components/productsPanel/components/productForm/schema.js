import * as yup from 'yup';

export const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Please enter product name')
    .min(2, 'Product name must be at least 2 characters long')
    .max(100, 'Product name must be no more than 100 characters long'),

  sku: yup
    .string()
    .trim()
    .required('Please enter SKU')
    .min(3, 'SKU must be at least 3 characters long')
    .max(30, 'SKU must be no more than 30 characters long'),

  category: yup.string().required('Please select a category'),

  price: yup
    .number()
    .typeError('Please enter a valid price')
    .required('Please enter product price')
    .min(0, 'Price cannot be negative'),

  quantity: yup
    .number()
    .typeError('Please enter a valid quantity')
    .required('Please enter product quantity')
    .integer('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1'),
});
