import { Table as TableLayout } from '../../../../../../components';
import { Head, Row } from './components';

import styles from './table.module.scss';

export const Table = ({ users, roles, removeUserHandler, updateUserHandler }) => {
  return (
    <TableLayout>
      <div className={styles.table}>
        <Head />

        <div className={styles.table__body}>
          {users.map((user) => (
            <Row
              key={user.id}
              user={user}
              roles={roles}
              removeUserHandler={removeUserHandler}
              updateUserHandler={updateUserHandler}
            />
          ))}
        </div>
      </div>
    </TableLayout>
  );
};
