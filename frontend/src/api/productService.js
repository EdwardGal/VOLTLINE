import { request } from '../utils';

export const getProducts = async ({ search = '', category = '' } = {}) => {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }

  if (category) {
    params.set('category', category);
  }

  const query = params.toString();

  return request(`/products${query ? `?${query}` : ''}`);
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
