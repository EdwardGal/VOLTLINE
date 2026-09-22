import { useState } from 'react';

import { CustomButton } from '../../../../../../components';
import { request } from '../../../../../../utils';
import { useModal } from '../../../../../../components/modal/useModal';

import styles from './productRow.module.scss';

export const ProductRow = ({ product, onProductUpdate, onProductRemove }) => {
  const { openModal } = useModal();

  const [quantity, setQuantity] = useState(Number(product.quantity));
  const [initialQuantity, setInitialQuantity] = useState(Number(product.quantity));

  const onQuantityChange = (value) => {
    setQuantity((prev) => Math.max(0, prev + value));
  };

  const onProductSave = async () => {
    const { data, error } = await request(`/products/${product.id}`, 'PATCH', {
      ...product,
      quantity,
    });

    if (error) {
      return;
    }

    setQuantity(Number(data.quantity));
    setInitialQuantity(Number(data.quantity));
    onProductUpdate(data);
  };

  const onProductEdit = () => {
    openModal('editProduct', {
      product: {
        ...product,
        quantity,
      },
      onSuccess: (updatedProduct) => {
        setQuantity(Number(updatedProduct.quantity));
        setInitialQuantity(Number(updatedProduct.quantity));
        onProductUpdate(updatedProduct);
      },
    });
  };

  const onProductDelete = async () => {
    const { error } = await request(`/products/${product.id}`, 'DELETE');

    if (!error) {
      onProductRemove(product.id);
    }
  };

  return (
    <div className={styles.productRow}>
      <div className={styles.productRow__info}>
        <span className={styles.productRow__name}>{product.name}</span>

        <span className={styles.productRow__sku}>{product.sku}</span>
      </div>

      <span className={styles.productRow__category}>{product.category}</span>

      <span className={styles.productRow__price}>{product.price}</span>

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
          onClick={onProductSave}
        />

        <CustomButton icon={{ name: 'Pencil' }} variant="default" onClick={onProductEdit} />

        <CustomButton
          icon={{ name: 'Trash', color: '#ed324b' }}
          variant="default"
          onClick={onProductDelete}
        />
      </div>
    </div>
  );
};
