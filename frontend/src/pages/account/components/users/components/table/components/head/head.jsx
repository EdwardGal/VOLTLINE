import styles from './head.module.scss';

export const Head = () => {
  return (
    <div className={styles.head}>
      <div>Profile</div>
      <div>Created</div>
      <div>Last login</div>
      <div>Role</div>
      <div>Actions</div>
    </div>
  );
};
