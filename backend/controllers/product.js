import { mapProduct } from '../helpers/index.js';
import Product from '../models/Product.js';

export const getProducts = async () => {
  const products = await Product.find();

  return products.map(mapProduct);
};

export const addProduct = async (productData) => {
  const product = await Product.create(productData);

  return mapProduct(product);
};
export const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!product) {
    throw new Error('Product not found');
  }

  return mapProduct(product);
};

export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
