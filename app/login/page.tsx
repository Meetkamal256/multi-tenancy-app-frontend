import styles from "./login.module.css"

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.tab}>
          <div className={`${styles.tabItem} ${styles.activeTab}`}>Login</div>
          <div className={styles.tabItem}>Sign Up</div>
        </div>
        <h1 className={styles.sectionHeading}>Welcome back</h1>
        <p className={styles.sectionParagraph}>
          Let's get back to managing your clients
        </p>

        <form action="" className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email address"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
        <button className={styles.submitButton}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default page;