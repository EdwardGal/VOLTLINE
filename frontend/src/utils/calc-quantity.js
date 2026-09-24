export const calcQuantity = (products) =>
  products.reduce((total, product) => total + Number(product.quantity), 0);
