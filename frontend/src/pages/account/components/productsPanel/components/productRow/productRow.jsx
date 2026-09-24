import { useState } from 'react';

import { CustomButton } from '../../../../../../components';

import styles from './productRow.module.scss';
import { useToast } from '../../../../../../components/toast';
import { deleteProduct, updateProduct } from '../../../../../../api/productService';
import { useModal } from '../../../../../../components/modal';
import { ProductForm } from '../productForm/productForm';

export const ProductRow = ({ product, removeProductHandler, updateProductHandler }) => {
  const [quantity, setQuantity] = useState(Number(product.quantity));
  const [initialQuantity, setInitialQuantity] = useState(Number(product.quantity));

  const { showToast } = useToast();
  const { openModal, closeModal } = useModal();

  const onProductRemove = () => {
    openModal({
      icon: 'ShieldAlert',
      title: 'Delete product?',
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

  return (
    <div className={styles.productRow}>
      <div className={styles.productRow__cover}>
        <img className={styles.productRow__image} src={product.images[0]} alt={product.name} />
      </div>

      <div className={styles.productRow__info}>
        <span className={styles.productRow__name}>{product.name}</span>

        <span className={styles.productRow__sku}>{product.sku}</span>
      </div>

      <span className={styles.productRow__brand}>{product.brand}</span>

      <span className={styles.productRow__category}>{product.category}</span>

      <span className={styles.productRow__price}>{product.price} ₽</span>

      <span className={styles.productRow__discount}>{product.discount}%</span>

      <span className={styles.productRow__tag}>{product.tag}</span>

      <span className={styles.productRow__warranty}>{product.warranty}</span>

      <div className={styles.productRow__quantity}>
        <CustomButton
          icon={{ name: 'Plus' }}
          variant="default"
          onClick={() => onQuantityChange(1)}
        />

        <span className={styles.productRow__counter}>{quantity}</span>

        <CustomButton
          icon={{ name: 'Minus' }}
          variant="default"
          disabled={quantity === 0}
          onClick={() => onQuantityChange(-1)}
        />
      </div>

      <div className={styles.productRow__actions}>
        <CustomButton
          icon={{ name: 'Save' }}
          variant="default"
          disabled={quantity === initialQuantity}
          onClick={onQuantitySave}
        />

        <CustomButton icon={{ name: 'Pencil' }} variant="default" onClick={onProductEdit} />

        <CustomButton
          icon={{ name: 'Trash', color: '#ed324b' }}
          variant="default"
          onClick={onProductRemove}
        />
      </div>
    </div>
  );
};
