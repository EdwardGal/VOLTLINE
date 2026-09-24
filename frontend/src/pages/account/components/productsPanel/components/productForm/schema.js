import * as yup from 'yup';

export const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Please enter product name')
    .min(2, 'Product name must be at least 2 characters long')
    .max(100, 'Product name must be no more than 100 characters long'),

  description: yup
    .string()
    .trim()
    .required('Please enter product description')
    .min(10, 'Product description must be at least 10 characters long')
    .max(2000, 'Product description must be no more than 2000 characters long'),

  brand: yup
    .string()
    .trim()
    .required('Please enter product brand')
    .min(2, 'Brand must be at least 2 characters long')
    .max(50, 'Brand must be no more than 50 characters long'),

  sku: yup
    .string()
    .trim()
    .required('Please enter SKU')
    .min(3, 'SKU must be at least 3 characters long')
    .max(30, 'SKU must be no more than 30 characters long'),

  warranty: yup
    .number()
    .typeError('Please enter a valid warranty period')
    .required('Please enter warranty period')
    .integer('Warranty must be a whole number')
    .min(1, 'Warranty must be at least 1 month')
    .max(120, 'Warranty must be no more than 120 months'),

  category: yup.string().required('Please select a category'),

  price: yup
    .number()
    .typeError('Please enter a valid price')
    .required('Please enter product price')
    .min(0, 'Price cannot be negative'),

  discount: yup
    .number()
    .typeError('Please enter a valid discount')
    .required('Please enter product discount')
    .integer('Discount must be a whole number')
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot be more than 100%'),

  tag: yup.string(),

  quantity: yup
    .number()
    .typeError('Please enter a valid quantity')
    .required('Please enter product quantity')
    .integer('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1'),
  images: yup.mixed().test('fileSize', 'Each image must be no more than 5 MB', (files) => {
    if (!files?.length) return true;

    return Array.from(files).every((file) => file.size <= 5 * 1024 * 1024);
  }),
});
