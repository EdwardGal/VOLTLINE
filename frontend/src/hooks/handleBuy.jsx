import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../components/toast';
import { selectCartItemById } from '../store/cart/cartSelectors';
import { addToCart } from '../store/cart/cartActions';

export const useAddToCart = (product) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const cartItem = useSelector((state) => selectCartItemById(state, product.id));

  const cartQuantity = cartItem?.counter ?? 0;
  const isMaxQuantity = cartQuantity >= product.quantity;

  const handleBuy = () => {
    if (isMaxQuantity) {
      return;
    }

    dispatch(addToCart(product));

    if (cartQuantity + 1 >= product.quantity) {
      showToast('Maximum quantity added to basket', 'success');
      return;
    }

    showToast('Product added to basket', 'success');
  };

  return {
    handleBuy,
    isMaxQuantity,
  };
};
