import { ACTION_TYPE } from '../../constants';
import { request } from '../../utils';

export const logout = () => {
  request('/logout', 'POST');

  return {
    type: ACTION_TYPE.LOGOUT,
  };
};
