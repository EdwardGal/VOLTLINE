import { useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../../../../../../../api';
import { CustomButton, FormSelect, LucideIcon } from '../../../../../../../../components';
import { useModal } from '../../../../../../../../components/modal';
import { useToast } from '../../../../../../../../components/toast';
import { ROLES } from '../../../../../../../../constants';
import { selectUser } from '../../../../../../../../store/user/userSelectors';
import { findRoleName, formattedDate } from '../../../../../../../../utils';
import styles from './row.module.scss';

export const Row = ({ user, roles, removeUserHandler, updateUserHandler }) => {
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
    <div className={styles.row}>
      <div className={styles.row__profile}>
        <span className={styles.row__avatar}>{user.email.slice(0, 2)}</span>

        <div className={styles.row__info}>
          <span className={styles.row__email}>{user.email}</span>

          {currentEmail === user.email && <span className={styles.row__meta}>That's you</span>}
        </div>
      </div>

      <span className={styles.row__createdAt}>{formattedDate(user.createdAt)}</span>

      <span className={styles.row__lastLoginAt}>{formattedDate(user.lastLoginAt)}</span>

      <div className={styles.row__roles}>
        <span className={clsx(styles.row__badge, isAdmin && styles['row__badge--active'])}>
          {findRoleName(selectedRoleId)}
        </span>

        <FormSelect className={styles.row__select} value={selectedRoleId} onChange={onRoleChange}>
          {roles.map(({ id, name }) => (
            <option className={styles.row__option} key={id} value={id}>
              {name}
            </option>
          ))}
        </FormSelect>
      </div>

      <div className={styles.row__actions}>
        <CustomButton variant="form" onClick={onRoleUpdate} disabled={isRoleChanged}>
          <LucideIcon name="Save" />
        </CustomButton>

        <CustomButton variant="form" disabled={isAdmin} onClick={onUserRemove}>
          <LucideIcon name="Trash" color="#ed324b" />
        </CustomButton>
      </div>
    </div>
  );
};
