import { UserTableHead, UserTableRow } from './components';

import styles from './userTable.module.scss';

export const UserTable = ({ users, roles, removeUserHandler, updateUserHandler }) => {
  return (
    <div className={styles.userTable}>
      <UserTableHead />

      <div className={styles.userTable__body}>
        {users.map((user) => (
          <UserTableRow
            key={user.id}
            user={user}
            roles={roles}
            removeUserHandler={removeUserHandler}
            updateUserHandler={updateUserHandler}
          />
        ))}
      </div>
    </div>
  );
};
