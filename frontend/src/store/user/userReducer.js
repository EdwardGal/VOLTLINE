import { ACTION_TYPE } from '../../constants';

const EMPTY_USER = {
  id: '',
  email: '',
  roleId: '',
  createdAt: '',
};

const getInitialUserState = () => {
  const userData = sessionStorage.getItem('userData');

  return userData ? JSON.parse(userData) : EMPTY_USER;
};

const initialUserState = getInitialUserState();

export const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...state,
        ...payload,
      };

    case ACTION_TYPE.LOGOUT:
      return EMPTY_USER;

    default:
      return state;
  }
};
