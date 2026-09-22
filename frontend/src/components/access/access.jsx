import { useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors';
import { checkAccess } from '../../utils';

export const Access = ({ roles, children }) => {
  const { roleId } = useSelector(selectUser);

  if (!checkAccess(roles, roleId)) {
    return null;
  }

  return children;
};
