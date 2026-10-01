import { ACTION_TYPE } from '../../constants';
import { request } from '../../utils';

export const logout = () => {
  request('/logout', 'POST');

  return {
    type: ACTION_TYPE.LOGOUT,
  };
};


export const setUser = (user) => ({
  type: ACTION_TYPE.SET_USER,
  payload: user,
});
