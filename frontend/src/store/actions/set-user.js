import { ACTION_TYPE } from "../../constants";

export const setUser = (user) => ({
  type: ACTION_TYPE.SET_USER,
  payload: user,
});
