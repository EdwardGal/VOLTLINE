import { useState } from 'react';

import { deleteProduct, updateProduct } from '../../../../../../../../api/productService';

import { CustomButton, LucideIcon, Quantity } from '../../../../../../../../components';

import { useModal } from '../../../../../../../../components/modal';
import { useToast } from '../../../../../../../../components/toast';

import { formatPrice } from '../../../../../../../../utils';

import { Form } from '../../../form/form';

import styles from './row.module.scss';
import clsx from 'clsx';

export const Row = ({ product, removeProductHandler, updateProductHandler }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [initialQuantity, setInitialQuantity] = useState(product.quantity);

  const { openModal, closeModal } = useModal();
  const { showToast } = useToast();

  const onQuantityChange = (value) => {
    setQuantity((prev) => Math.max(0, prev + value));
  };

  const onQuantitySave = () => {
    updateProduct(product.id, { quantity }).then(({ data, error }) => {
      if (error) {
        showToast(error);
        return;
      }

      updateProductHandler(data);

      setQuantity(data.quantity);
      setInitialQuantity(data.quantity);

      showToast('Quantity updated successfully', 'success');
    });
  };

  const onProductEdit = () => {
    openModal({
      icon: 'PackageOpen',
      title: 'Edit product',
      subtitle: `Edit ${product.name}`,
      content: (
        <Form
          product={product}
          onConfirm={(updatedProduct) => {
            updateProductHandler(updatedProduct);

            setQuantity(updatedProduct.quantity);
            setInitialQuantity(updatedProduct.quantity);

            showToast('Product updated successfully', 'success');
            closeModal();
          }}
        />
      ),
    });
  };

  const onProductRemove = () => {
    openModal({
      icon: 'ShieldAlert',
      title: 'Delete product',
      subtitle: `Are you sure you want to delete ${product.name}?`,
      onConfirm: () => {
        deleteProduct(product.id).then(({ error }) => {
          if (error) {
            showToast(error);
            return;
          }

          removeProductHandler(product.id);

          showToast('Product deleted successfully', 'success');
          closeModal();
        });
      },
    });
  };

  return (
    <div className={styles.row}>
      <div className={styles.row__cover}>
        <img className={styles.row__image} src={product.images[0]} alt={product.name} />
      </div>
      <span className={clsx(styles.row__cell, styles['row__cell--title'])}>{product.name}</span>
      <span className={styles.row__cell}>{product.brand}</span>
      <span className={styles.row__cell}>{product.sku}</span>
      <span className={styles.row__cell}>{product.warranty}</span>
      <span className={styles.row__cell}>{product.category}</span>
      <span className={styles.row__cell}>{formatPrice(product.price)} ₽</span>
      <span className={styles.row__cell}>{product.discount}%</span>
      <span className={styles.row__cell}>{product.tags || '—'}</span>
      <Quantity quantity={quantity} onQuantityChange={onQuantityChange} />

      <div className={styles.row__actions}>
        <CustomButton
          variant="form"
          disabled={quantity === initialQuantity}
          onClick={onQuantitySave}
        >
          <LucideIcon name="Save" />
        </CustomButton>

        <CustomButton variant="form" onClick={onProductEdit}>
          <LucideIcon name="Pencil" />
        </CustomButton>

        <CustomButton variant="form" onClick={onProductRemove}>
          <LucideIcon name="Trash" color="#ed324b" />
        </CustomButton>
      </div>
    </div>
  );
};
