import { request } from "../utils";

export const getUsers = () => {
  return request('/users');
};

export const getRoles = () => {
  return request('/users/roles');
};

export const updateUser = (id, data) => {
  return request(`/users/${id}`, 'PATCH', data);
};

export const deleteUser = (id) => {
  return request(`/users/${id}`, 'DELETE');
};
