import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ErrorMessage, FormInput, FormSelect, FormTextarea } from '../../../../../../components';
import { getCategories } from '../../../../../../api/productService';
import { request } from '../../../../../../utils';

import { schema } from './schema';
import styles from './productForm.module.scss';
import { PRODUCT_TAGS } from '../../../../../../constants';

export const ProductForm = ({ product, onConfirm }) => {
  const [categories, setCategories] = useState([]);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

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
      tags: product?.tags ?? [],
      quantity: product?.quantity ?? '',
      images: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getCategories().then(({ data, error }) => {
      if (error) {
        setServerErrorMessage(error);
        return;
      }

      setCategories(data);

      if (product) {
        const categoryId = data.find(({ name }) => name === product.category)?.id ?? '';

        reset({
          name: product.name ?? '',
          description: product.description ?? '',
          brand: product.brand ?? '',
          sku: product.sku ?? '',
          warranty: product.warranty ?? '',
          category: categoryId,
          price: product.price ?? '',
          discount: product.discount ?? 0,
          tags: product.tags ?? [],
          quantity: product.quantity ?? '',
          images: [],
        });
      }
    });
  }, [product, reset]);

  const clearServerError = () => {
    setServerErrorMessage(null);
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

      if (key === 'tags') {
        dataToSend.append('tags', JSON.stringify(value));
        return;
      }

      dataToSend.append(key, value ?? '');
    });

    const { data, error } = await request(
      isEdit ? `/products/${product.id}` : '/products',
      isEdit ? 'PATCH' : 'POST',
      dataToSend
    );

    if (error) {
      serverErrorMessage(error);
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
          <div className={styles.productForm__tags}>
            <span className={styles.productForm__label}>TAGS</span>
            <div className={styles.productForm__tagsList}>
              {PRODUCT_TAGS.map(({ id, name }) => (
                <FormInput
                  key={id}
                  type="checkbox"
                  value={id}
                  label={name}
                  error={errors.tags?.message}
                  {...register('tags')}
                />
              ))}
            </div>
          </div>
          <FormInput
            label="warranty"
            id="product-warranty"
            type="text"
            placeholder="10"
            error={errors.warranty?.message}
            {...register('warranty', {
              onChange: clearServerError,
            })}
          />
        </div>

        <div className={styles.productForm__field}>
          <FormInput
            type="file"
            label="Product images"
            accept="image/jpeg,image/png,image/webp"
            multiple
            {...register('images')}
          />
          {product?.images?.length > 0 && (
            <div className={styles.productForm__images}>
              {product.images.map((image) => (
                <span key={image} className={styles.productForm__image}>
                  {image.split('/uploads/products/')[1]}
                </span>
              ))}
            </div>
          )}
        </div>

        <FormTextarea
          label="Description"
          placeholder="Describe the product, its features and specifications.."
          error={errors.description?.message}
          {...register('description', { onChange: clearServerError })}
        />
      </div>

      {serverErrorMessage && <ErrorMessage error={serverErrorMessage} />}
    </form>
  );
};
