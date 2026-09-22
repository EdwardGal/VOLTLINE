import { ROLES } from '../constants';

export const findRoleName = (roleId) => Object.entries(ROLES).find(([, id]) => id === roleId)?.[0];
