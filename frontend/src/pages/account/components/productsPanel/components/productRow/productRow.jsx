import { useState } from 'react';

import { deleteProduct, updateProduct } from '../../../../../../api/productService';
import { CustomButton, Quantity } from '../../../../../../components';
import { useModal } from '../../../../../../components/modal';
import { useToast } from '../../../../../../components/toast';
import { formatPrice } from '../../../../../../utils';

import styles from './productRow.module.scss';
import { ProductForm } from '../productForm/productForm';

export const ProductRow = ({ item: product, removeProductHandler, updateProductHandler }) => {
  const [quantity, setQuantity] = useState(Number(product.quantity));
  const [initialQuantity, setInitialQuantity] = useState(Number(product.quantity));

  const { showToast } = useToast();
  const { openModal, closeModal } = useModal();

  const { images, ...techs } = product;

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
        <img className={styles.productRow__image} src={images[0]} alt={product.name} />
      </div>
      {Object.entries(techs).map(([name, value]) => {
        const formattedValue = name === 'price' ? `${formatPrice(value)} ₽` : value;

        if (name === 'description' || name === 'id') {
          return null;
        }

        if (name === 'tags') {
          return value.join(' ');
        }

        if (name === 'quantity') {
          return <Quantity key={name} quantity={quantity} onQuantityChange={onQuantityChange} />;
        }

        return (
          <span key={name} className={styles[`productRow__${name}`]}>
            {formattedValue}
          </span>
        );
      })}

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
