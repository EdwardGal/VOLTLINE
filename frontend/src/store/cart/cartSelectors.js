export const selectCartItems = ({ cart }) => cart.items;

export const selectCartItemsCount = ({ cart }) =>
  cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = ({ cart }) =>
  cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartItemById = ({ cart }, productId) =>
  cart.items.find((item) => item.id === productId);
