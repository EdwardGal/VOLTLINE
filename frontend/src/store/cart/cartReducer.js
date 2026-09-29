import { ACTION_TYPE } from '../../constants';

const initialCartState = {
  items: [],
};

export const cartReducer = (state = initialCartState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.ADD_TO_CART: {
      const existItem = state.items.find((item) => item.id === payload.id);

      if (existItem) {
        const stockLimit = payload.initialQuantity ?? existItem.initialQuantity;

        if (existItem.counter >= stockLimit) {
          return state;
        }

        return {
          ...state,
          items: state.items.map((item) =>
            item.id === payload.id
              ? {
                  ...item,
                  counter: item.counter + 1,
                }
              : item
          ),
        };
      }

      if (payload.initialQuantity <= 0) {
        return state;
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...payload,
            counter: 1,
          },
        ],
      };
    }

    case ACTION_TYPE.INCREASE_CART_QUANTITY: {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload
            ? {
                ...item,
                counter: item.counter + 1,
              }
            : item
        ),
      };
    }

    case ACTION_TYPE.DECREASE_CART_QUANTITY: {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload
            ? {
                ...item,
                counter: item.counter - 1,
              }
            : item
        ),
      };
    }

    case ACTION_TYPE.REMOVE_FROM_CART: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      };
    }

    case ACTION_TYPE.CLEAR_CART: {
      return initialCartState;
    }

    default:
      return state;
  }
};
