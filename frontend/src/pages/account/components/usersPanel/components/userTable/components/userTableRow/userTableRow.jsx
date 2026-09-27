import { useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { deleteUser, updateUser } from '../../../../../../../../api';
import { CustomButton, LucideIcon } from '../../../../../../../../components';
import { useModal } from '../../../../../../../../components/modal';
import { useToast } from '../../../../../../../../components/toast';
import { ROLES } from '../../../../../../../../constants';
import { selectUser } from '../../../../../../../../store/selectors';
import { findRoleName, formattedDate } from '../../../../../../../../utils';

import styles from './userTableRow.module.scss';

export const UserTableRow = ({ user, roles, removeUserHandler, updateUserHandler }) => {
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
      title: 'Delete user',
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
    updateUser(user.id, { roleId: selectedRoleId }).then(({ data, error }) => {
      if (error) {
        showToast(error);
        return;
      }

      setInitialRoleId(selectedRoleId);
      updateUserHandler(data);

      showToast('Role updated successfully', 'success');
    });
  };

  const isAdmin = selectedRoleId === ROLES.ADMIN;
  const isRoleChanged = selectedRoleId === initialRoleId;

  return (
    <div className={styles.userTableRow}>
      <div className={styles.userTableRow__profile}>
        <span className={styles.userTableRow__avatar}>{user.email.slice(0, 2)}</span>

        <div className={styles.userTableRow__info}>
          <span className={styles.userTableRow__email}>{user.email}</span>

          {currentEmail === user.email && (
            <span className={styles.userTableRow__meta}>That's you</span>
          )}
        </div>
      </div>

      <span className={styles.userTableRow__createdAt}>{formattedDate(user.createdAt)}</span>

      <span className={styles.userTableRow__lastLoginAt}>{formattedDate(user.lastLoginAt)}</span>

      <div className={styles.userTableRow__roles}>
        <span
          className={clsx(
            styles.userTableRow__badge,
            isAdmin && styles['userTableRow__badge--active']
          )}
        >
          {findRoleName(selectedRoleId)}
        </span>

        <select
          className={styles.userTableRow__select}
          value={selectedRoleId}
          onChange={onRoleChange}
        >
          {roles.map(({ id, name }) => (
            <option className={styles.userTableRow__option} key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.userTableRow__actions}>
        <CustomButton variant="default" onClick={onRoleUpdate} disabled={isRoleChanged}>
          <LucideIcon name="Save" />
        </CustomButton>

        <CustomButton variant="default" disabled={isAdmin} onClick={onUserRemove}>
          <LucideIcon name="Trash" color="#ed324b" />
        </CustomButton>
      </div>
    </div>
  );
};
