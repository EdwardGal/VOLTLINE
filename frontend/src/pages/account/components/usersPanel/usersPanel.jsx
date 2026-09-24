import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ErrorMessage, Loading, TableHead, TableCells } from '../../../../components';
import { TABLE_HEAD_CELLS } from '../../../../constants';
import { selectUser } from '../../../../store/selectors';

import { UserRow } from './components';

import styles from './usersPanel.module.scss';

import { getUsers, getRoles } from '../../../../api';

export const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getUsers(), getRoles()])
      .then(([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
          setServerErrorMessage(usersRes.error || rolesRes.error);
          return;
        }
        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const removeUserHandler = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className={styles.usersPanel}>
      <div className={styles.usersPanel__info}>
        <TableHead
          className={styles.usersPanel__head}
          variant="small"
          eyebrow="// Users"
          title="All accounts"
        />

        <span className={styles.usersPanel__counter}>всего: {users.length}</span>
      </div>

      <div className={styles.usersPanel__table}>
        {isLoading ? (
          <Loading />
        ) : serverErrorMessage ? (
          <ErrorMessage error={serverErrorMessage} />
        ) : (
          <>
            <TableCells cells={TABLE_HEAD_CELLS.USERS} variant="userPanel" />

            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                roles={roles}
                removeUserHandler={removeUserHandler}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
