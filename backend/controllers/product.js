import { mapProduct } from '../helpers/index.js';

import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const getProducts = async () => {
  const products = await Product.find().populate('category');

  return products.map(mapProduct);
};

export const getProductsWithTags = async () => {
  const products = await Product.find({
    tag: {
      $exists: true,
      $nin: [null, ''],
    },
  }).populate('category');

  return products.map(mapProduct);
};

export const addProduct = async (productData) => {
  const product = await Product.create(productData);

  await product.populate('category');

  return mapProduct(product);
};

export const updateProduct = async (id, productData, files = []) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error('Product not found');
  }

  const updateData = {
    ...productData,
  };

  if (files.length > 0) {
    const newImages = files.map((file) => `/uploads/products/${file.filename}`);

    updateData.images = [...product.images, ...newImages];
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after',
    runValidators: true,
  }).populate('category');

  return mapProduct(updatedProduct);
};

export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
