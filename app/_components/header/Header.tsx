import styles from "./header.module.css"

const user = {
  name: "Admin User",
  email: "admin@example.com",
};

const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          
          <div className={styles.logo}>
            <h1>SaaS Dashboard</h1>
          </div>
          
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

export default Header