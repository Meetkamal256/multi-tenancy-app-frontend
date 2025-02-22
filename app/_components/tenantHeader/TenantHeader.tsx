import styles from "./tenantHeader.module.css"

const user = {
  name: "Tenant",
  email: "tenant@example.com",
};

const AdminHeader = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>          
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userEmail}>{user.email}</span>
            <button className={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AdminHeader;