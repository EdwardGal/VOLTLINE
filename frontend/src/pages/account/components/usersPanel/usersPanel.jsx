import { useEffect, useState } from 'react';

import { ErrorMessage, Loading, TableHead, Table } from '../../../../components';

import styles from './usersPanel.module.scss';

import { getUsers, getRoles } from '../../../../api';
import { USER_TABLE_COLUMNS } from './user-table-columns';

import { UserRow } from './components/userRow/userRow';

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
          <Table
            data={users}
            columns={USER_TABLE_COLUMNS}
            Row={UserRow}
            rowProps={{
              roles,
              removeUserHandler,
            }}
            variant="users"
          />
        )}
      </div>
    </div>
  );
};
