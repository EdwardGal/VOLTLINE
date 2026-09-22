import { useState } from 'react';
import { findRoleName, formattedDate, request } from '../../../../../../utils';
import styles from './userRow.module.scss';
import { ROLES } from '../../../../../../constants';
import clsx from 'clsx';
import { CustomButton } from '../../../../../../components';

export const UserRow = ({ currentEmail, user, roles, setUsersUpdateTrigger }) => {
  const [initialRoleId, setInitialRolId] = useState(user.roleId);
  const [selectedRoleId, setSelectedRoleId] = useState(user.roleId);

  const onRoleChange = ({ target }) => setSelectedRoleId(Number(target.value));

  const onRoleSave = (userId, newUserRoleId) =>
    request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
      setInitialRolId(newUserRoleId);
    });

  const onUserRemove = (userId) => {
    request(`/users/${userId}`, 'DELETE').then(() => setUsersUpdateTrigger((prev) => !prev));
  };

  const isAdmin = selectedRoleId === ROLES.ADMIN;
  const isButtonDisabled = selectedRoleId === initialRoleId;

  return (
    <div className={styles.userRow}>
      <div className={styles.userRow__profile}>
        <span className={styles.userRow__avatar}>{user.email.slice(0, 2)}</span>
        <div className={styles.userRow__info}>
          <span className={styles.userRow__email}>{user.email}</span>
          {currentEmail === user.email && <span className={styles.userRow__meta}>That's you</span>}
        </div>
      </div>
      <span className={styles.userRow__createdAt}>{formattedDate(user.createdAt)}</span>
      <span className={styles.userRow__lastLoginAt}>{formattedDate(user.lastLoginAt)}</span>
      <div className={styles.userRow__roles}>
        <span className={clsx(styles.userRow__badge, isAdmin && styles['userRow__badge--active'])}>
          {findRoleName(selectedRoleId)}
        </span>
        <select className={styles.userRow__select} value={selectedRoleId} onChange={onRoleChange}>
          {roles.map(({ id, name }) => (
            <option className={styles.userRow__option} key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.userRow__actions}>
        <CustomButton
          icon={{ name: 'Save' }}
          variant="default"
          onClick={() => onRoleSave(user.id, selectedRoleId)}
          disabled={isButtonDisabled}
        />
        <CustomButton
          icon={{ name: 'Trash', color: '#ed324b' }}
          variant="default"
          onClick={() => onUserRemove(user.id)}
        />
      </div>
    </div>
  );
};
