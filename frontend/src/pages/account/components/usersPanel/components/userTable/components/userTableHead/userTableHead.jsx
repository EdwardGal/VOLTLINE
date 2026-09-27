import styles from './userTableHead.module.scss';

export const UserTableHead = () => {
  return (
    <div className={styles.userTableHead}>
      <div>Profile</div>
      <div>Created</div>
      <div>Last login</div>
      <div>Role</div>
      <div>Actions</div>
    </div>
  );
};
