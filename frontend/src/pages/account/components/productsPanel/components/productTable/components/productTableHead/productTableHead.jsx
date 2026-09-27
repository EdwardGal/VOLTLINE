import styles from './productTableHead.module.scss';

export const ProductTableHead = () => {
  return (
    <div className={styles.productTableHead}>
      <div>Image</div>
      <div>Name</div>
      <div>Brand</div>
      <div>SKU</div>
      <div>Warranty</div>
      <div>Category</div>
      <div>Price</div>
      <div>Discount</div>
      <div>Tag</div>
      <div>Quantity</div>
      <div>Actions</div>
    </div>
  );
};
