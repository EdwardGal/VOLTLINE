export const mapProduct = (product) => ({
  id: product._id.toString(),
  name: product.name,
  sku: product.sku,
  category: product.category,
  price: product.price,
  quantity: product.quantity,
});
