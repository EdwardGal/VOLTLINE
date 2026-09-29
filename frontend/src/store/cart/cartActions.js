import { ACTION_TYPE } from '../../constants';

export const addToCart = (product) => ({
  type: ACTION_TYPE.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: ACTION_TYPE.REMOVE_FROM_CART,
  payload: productId,
});

export const increaseCartQuantity = (productId) => ({
  type: ACTION_TYPE.INCREASE_CART_QUANTITY,
  payload: productId,
});

export const decreaseCartQuantity = (productId) => ({
  type: ACTION_TYPE.DECREASE_CART_QUANTITY,
  payload: productId,
});

export const clearCart = () => ({
  type: ACTION_TYPE.CLEAR_CART,
});
