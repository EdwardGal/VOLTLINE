import { useState } from 'react';

import { deleteProduct, updateProduct } from '../../../../../../../../api/productService';

import { CustomButton, LucideIcon, Quantity } from '../../../../../../../../components';

import { useModal } from '../../../../../../../../components/modal';
import { useToast } from '../../../../../../../../components/toast';

import { formatPrice } from '../../../../../../../../utils';

import { ProductForm } from '../../../productForm/productForm';

import styles from './productTableRow.module.scss';
import clsx from 'clsx';

export const ProductTableRow = ({ product, removeProductHandler, updateProductHandler }) => {
  const [quantity, setQuantity] = useState(Number(product.quantity));
  const [initialQuantity, setInitialQuantity] = useState(Number(product.quantity));

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

      setQuantity(Number(data.quantity));
      setInitialQuantity(Number(data.quantity));

      showToast('Quantity updated successfully', 'success');
    });
  };

  const onProductEdit = () => {
    openModal({
      icon: 'PackageOpen',
      title: 'Edit product',
      subtitle: `Edit ${product.name}`,
      content: (
        <ProductForm
          product={product}
          onConfirm={(updatedProduct) => {
            updateProductHandler(updatedProduct);

            setQuantity(Number(updatedProduct.quantity));
            setInitialQuantity(Number(updatedProduct.quantity));

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
    <div className={styles.productTableRow}>
      <div>
        <img src={product.images[0]} alt={product.name} />
      </div>
      <span className={clsx(styles.productTableRow__cell, styles['productTableRow__cell--title'])}>
        {product.name}
      </span>
      <span className={styles.productTableRow__cell}>{product.brand}</span>
      <span className={styles.productTableRow__cell}>{product.sku}</span>
      <span className={styles.productTableRow__cell}>{product.warranty}</span>
      <span className={styles.productTableRow__cell}>{product.category}</span>
      <span className={styles.productTableRow__cell}>{formatPrice(product.price)} ₽</span>
      <span className={styles.productTableRow__cell}>{product.discount}%</span>
      <span className={styles.productTableRow__cell}>{product.tags || '—'}</span>
      <Quantity quantity={quantity} onQuantityChange={onQuantityChange} />

      <div className={styles.productTableRow__actions}>
        <CustomButton
          variant="default"
          disabled={quantity === initialQuantity}
          onClick={onQuantitySave}
        >
          <LucideIcon name="Save" />
        </CustomButton>

        <CustomButton variant="default" onClick={onProductEdit}>
          <LucideIcon name="Pencil" />
        </CustomButton>

        <CustomButton variant="default" onClick={onProductRemove}>
          <LucideIcon name="Trash" color="#ed324b" />
        </CustomButton>
      </div>
    </div>
  );
};
