import { useEffect, useState } from 'react';
import { SectionHead, TableHead } from '../../../../components';
import styles from './usersPanel.module.scss';
import { request } from '../../../../utils';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/selectors';
import { UserRow } from './components';
import { TABLE_HEAD_CELLS } from '../../../../constants';

export const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [usersUpdateTrigger, setUsersUpdateTrigger] = useState(false);

  const { email } = useSelector(selectUser);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([request('/users'), request('/users/roles')]).then(([usersRes, rolesRes]) => {
      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        setIsLoading(false);
        return;
      }

      setUsers(usersRes.data);
      setRoles(rolesRes.data);
      setIsLoading(false);
    });
  }, [usersUpdateTrigger]);

  if (isLoading) {
    return 'Loading ...';
  }

  return (
    <div className={styles.usersPanel}>
      <div className={styles.usersPanel__info}>
        <SectionHead
          className={styles.usersPanel__head}
          variant="small"
          eyebrow={'// Users'}
          title={'All accounts'}
        />
        <span className={styles.usersPanel__counter}>всего: {users?.length}</span>
      </div>

      <div className={styles.usersPanel__table}>
        <TableHead cells={TABLE_HEAD_CELLS.USERS} variant="userPanel" />
        {users.map((user) => (
          <UserRow
            key={user.id}
            currentEmail={email}
            user={user}
            roles={roles}
            setUsersUpdateTrigger={setUsersUpdateTrigger}
          />
        ))}
      </div>
    </div>
  );
};
