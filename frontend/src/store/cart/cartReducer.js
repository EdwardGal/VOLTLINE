import { ACTION_TYPE } from '../../constants';

const initialCartState = {
  items: [],
};

export const cartReducer = (state = initialCartState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.ADD_TO_CART: {
      const existItem = state.items.find((item) => item.id === payload.id);

      if (existItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...payload,
            quantity: 1,
          },
        ],
      };
    }

    default:
      return state;
  }
};
