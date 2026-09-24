import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInput, FormSelect, FormTextarea } from '../../../../../../components';
import { getCategories } from '../../../../../../api/productService';
import { request } from '../../../../../../utils';

import { schema } from './schema';
import styles from './productForm.module.scss';
import { PRODUCT_TAGS } from '../../../../../../constants';

export const ProductForm = ({ product, onConfirm }) => {
  const [serverError, setServerError] = useState(null);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      brand: product?.brand ?? '',
      sku: product?.sku ?? '',
      warranty: product?.warranty ?? '',
      category: '',
      price: product?.price ?? '',
      discount: product?.discount ?? '',
      tag: product?.tag ?? '',
      quantity: product?.quantity ?? '',
      images: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getCategories().then(({ data, error }) => {
      if (error) {
        setServerError(error);
        return;
      }

      setCategories(data);

      if (product) {
        const categoryId = data.find(({ name }) => name === product.category)?.id ?? '';

        reset({
          name: product.name ?? '',
          sku: product.sku ?? '',
          category: categoryId,
          price: product.price ?? '',
          discount: product.discount ?? 0,
          quantity: product.quantity ?? '',
        });
      }
    });
  }, [product, reset]);

  const clearServerError = () => {
    setServerError(null);
  };

  const onSubmit = async (formData) => {
    const isEdit = Boolean(product);
    const dataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        Array.from(value || []).forEach((file) => {
          dataToSend.append('images', file);
        });

        return;
      }

      dataToSend.append(key, value ?? '');
    });

    dataToSend.set('tag', formData.tag || '');

    const { data, error } = await request(
      isEdit ? `/products/${product.id}` : '/products',
      isEdit ? 'PATCH' : 'POST',
      dataToSend
    );

    if (error) {
      setServerError(error);
      return;
    }

    onConfirm(data);
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
            label="brand"
            id="product-brand"
            type="text"
            placeholder="Voltline"
            error={errors.brand?.message}
            {...register('brand', {
              onChange: clearServerError,
            })}
          />
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
        </div>

        <div className={styles.productForm__field}>
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

            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </FormSelect>
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
        </div>

        <div className={styles.productForm__field}>
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
          <FormInput
            label="discount"
            id="product-discount"
            type="number"
            placeholder="0"
            error={errors.discount?.message}
            {...register('discount', {
              valueAsNumber: true,
              onChange: clearServerError,
            })}
          />
        </div>

        <div className={styles.productForm__field}>
          <FormSelect
            label="tag"
            id="product-tag"
            error={errors.tag?.message}
            {...register('tag', {
              onChange: clearServerError,
            })}
          >
            <option value="">No tag</option>
            {PRODUCT_TAGS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </FormSelect>
          <FormInput
            label="warranty"
            id="product-warranty"
            type="text"
            placeholder="10"
            error={errors.warranty?.message}
            {...register('warranty', {
              valueAsNumber: true,
              onChange: clearServerError,
            })}
          />
        </div>

        <FormInput
          type="file"
          label="Product images"
          accept="image/jpeg,image/png,image/webp"
          multiple
          {...register('images')}
        />

        <FormTextarea
          label="Description"
          error={errors.description?.message}
          {...register('description', { onChange: clearServerError })}
        />
      </div>

      {serverError && <div className={styles.productForm__serverError}>{serverError}</div>}
    </form>
  );
};
