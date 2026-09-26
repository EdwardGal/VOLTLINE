import { request } from '../utils';

export const getProducts = async (search = '') => {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';

  return request(`/products${query}`);
};

export const getProduct = async (id) => {
  return request(`/products/${id}`);
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
