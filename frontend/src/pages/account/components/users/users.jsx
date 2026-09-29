import { useEffect, useState } from 'react';

import { getRoles, getUsers } from '../../../../api';
import { ErrorMessage, Loading, TableHead } from '../../../../components';

import { Table } from './components';

import styles from './users.module.scss';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setServerErrorMessage(null);

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

  const updateUserHandler = (updatedUser) => {
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <div className={styles.users}>
      <div className={styles.users__info}>
        <TableHead
          className={styles.users__head}
          variant="small"
          eyebrow="// Users"
          title="All accounts"
        />

        <span className={styles.users__counter}>Total: {users.length}</span>
      </div>

      <div className={styles.users__table}>
        {isLoading ? (
          <Loading />
        ) : serverErrorMessage ? (
          <ErrorMessage error={serverErrorMessage} />
        ) : (
          <Table
            users={users}
            roles={roles}
            removeUserHandler={removeUserHandler}
            updateUserHandler={updateUserHandler}
          />
        )}
      </div>
    </div>
  );
};
