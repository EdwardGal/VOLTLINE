import { mapProduct } from '../helpers/index.js';
import Product from '../models/Product.js';
import fs from 'fs/promises';
import path from 'path';

export const getProducts = async (search = '') => {
  const filter = search
    ? {
        name: {
          $regex: search,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find(filter).populate('category');

  return products.map(mapProduct);
};

export const getProduct = async (id) => {
  const product = await Product.findById(id).populate('category');

  if (!product) {
    throw new Error('Product not found');
  }

  return mapProduct(product);
};

export const getProductsWithTags = async () => {
  const products = await Product.find({
    tags: {
      $exists: true,
      $ne: [],
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

    const uploadsDir = path.resolve('uploads/products');

    await Promise.all(
      product.images.map(async (image) => {
        const fileName = image.split('/uploads/products/')[1];

        if (!fileName) {
          return;
        }

        const filePath = path.join(uploadsDir, fileName);

        try {
          await fs.unlink(filePath);
        } catch (error) {
          if (error.code !== 'ENOENT') {
            throw error;
          }
        }
      })
    );

    updateData.images = newImages;
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
