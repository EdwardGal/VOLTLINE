export const mapProduct = (product) => ({
  id: product._id,
  name: product.name,
  description: product.description,
  images: product.images,
  brand: product.brand,
  warranty: product.warranty,
  sku: product.sku,
  category: product.category.name,
  price: product.price,
  discount: product.discount,
  tag: product.tag,
  quantity: product.quantity,
});
