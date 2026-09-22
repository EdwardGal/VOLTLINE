import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInput, FormSelect } from '../../../../../../components';
import { PRODUCT_CATEGORIES } from '../../../../../../constants';
import { request } from '../../../../../../utils';
import { useModal } from '../../../../../../components/modal/useModal';

import { schema } from './schema';

import styles from './productForm.module.scss';

export const ProductForm = ({ product, onSuccess }) => {
  const [serverError, setServerError] = useState(null);

  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name ?? '',
      sku: product?.sku ?? '',
      category: product?.category ?? '',
      price: product?.price ?? '',
      quantity: product?.quantity ?? '',
    },
    resolver: yupResolver(schema),
  });

  const clearServerError = () => {
    setServerError(null);
  };

  const onSubmit = async (formData) => {
    const isEdit = Boolean(product);

    const { data, error } = await request(
      isEdit ? `/products/${product.id}` : '/products',
      isEdit ? 'PATCH' : 'POST',
      formData
    );

    if (error) {
      setServerError(error);
      return;
    }

    onSuccess(data);
    closeModal();
  };

  return (
    <form id="product-form" className={styles.productForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.productForm__fields}>
        <FormInput
          label="name"
          id="product-name"
          type="text"
          placeholder="Voltline Pulse — RTX 5070 Ti"
          autoFocus
          error={errors.name?.message}
          {...register('name', {
            onChange: clearServerError,
          })}
        />

        <div className={styles.productForm__field}>
          <FormInput
            label="sku"
            id="product-sku"
            type="text"
            placeholder="VL-PULSE-5070"
            error={errors.sku?.message}
            {...register('sku', {
              onChange: clearServerError,
            })}
          />

          <FormSelect
            label="category"
            id="product-category"
            error={errors.category?.message}
            {...register('category', {
              onChange: clearServerError,
            })}
          >
            <option value="" disabled>
              Select category
            </option>

            {PRODUCT_CATEGORIES.map(({ value }) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </FormSelect>
        </div>

        <div className={styles.productForm__field}>
          <FormInput
            label="price"
            id="product-price"
            type="number"
            placeholder="18990"
            error={errors.price?.message}
            {...register('price', {
              valueAsNumber: true,
              onChange: clearServerError,
            })}
          />

          <FormInput
            label="quantity"
            id="product-quantity"
            type="number"
            placeholder="1"
            error={errors.quantity?.message}
            {...register('quantity', {
              valueAsNumber: true,
              onChange: clearServerError,
            })}
          />
        </div>
      </div>

      {serverError && <div className={styles.productForm__serverError}>{serverError}</div>}
    </form>
  );
};
