import { request } from '../utils';

export const getProducts = async () => {
  return request('/products');
};

export const getProductsWithTags = async () => {
  return request('/products/tagged');
};

export const addProduct = async (productData) => {
  return request('/products', 'POST', productData);
};

export const updateProduct = async (id, productData) => {
  return request(`/products/${id}`, 'PATCH', productData);
};

export const deleteProduct = async (id) => {
  return request(`/products/${id}`, 'DELETE');
};

export const getCategories = async () => {
  return request('/categories');
};
