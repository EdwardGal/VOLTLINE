import { useState } from 'react';
import clsx from 'clsx';

import { CustomButton } from '../../../../../../components';
import { findRoleName, formattedDate } from '../../../../../../utils';
import { ROLES } from '../../../../../../constants';
import { deleteUser, updateUser } from '../../../../../../api/userService';
import { useToast } from '../../../../../../components/toast';

import styles from './userRow.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../store/selectors';
import { useModal } from '../../../../../../components/modal';

export const UserRow = ({ user, roles, removeUserHandler }) => {
  const [initialRoleId, setInitialRoleId] = useState(user.roleId);
  const [selectedRoleId, setSelectedRoleId] = useState(user.roleId);

  const { showToast } = useToast();

  const { openModal, closeModal } = useModal();

  const { email: currentEmail } = useSelector(selectUser);

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onUserRemove = () => {
    openModal({
      icon: 'ShieldAlert',
      title: 'Delete user?',
      subtitle: `Are you sure you want to delete ${user.email}?`,
      onConfirm: () => {
        deleteUser(user.id).then(({ error }) => {
          if (error) {
            showToast(error);
            return;
          }

          removeUserHandler(user.id);
          showToast('User deleted successfully', 'success');
          closeModal();
        });
      },
    });
  };

  const onRoleUpdate = () => {
    updateUser(user.id, { roleId: selectedRoleId }).then(({ error }) => {
      if (error) {
        showToast(error);
        return;
      }

      setInitialRoleId(selectedRoleId);
      showToast('Role updated successfully', 'success');
    });
  };

  const isAdmin = selectedRoleId === ROLES.ADMIN;
  const isRoleChanged = selectedRoleId === initialRoleId;

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
          onClick={onRoleUpdate}
          disabled={isRoleChanged}
        />

        <CustomButton
          icon={{ name: 'Trash', color: '#ed324b' }}
          variant="default"
          disabled={isAdmin}
          onClick={onUserRemove}
        />
      </div>
    </div>
  );
};
