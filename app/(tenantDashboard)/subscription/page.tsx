import styles from "./subscription.module.css";

const SubscriptionPage = () => {
  // Dummy subscription data
  const subscription = {
    plan: "Pro",
    billingCycle: "Monthly",
    status: "Active",
    nextPaymentDate: "2025-03-15",
  };
  
  return (
    <div className="container">
      <h1 className={styles.title}>Subscription Details</h1>
      
      <div className={styles.card}>
        <p>
          <strong>Plan:</strong> {subscription.plan}
        </p>
        <p>
          <strong>Billing Cycle:</strong> {subscription.billingCycle}
        </p>
        <p>
          <strong>Status:</strong>
          <span
            className={`${styles.status} ${
              styles[subscription.status.toLowerCase()]
            }`}
          >
            {subscription.status}
          </span>
        </p>
        <p>
          <strong>Next Payment Date:</strong> {subscription.nextPaymentDate}
        </p>
        
        <div className={styles.actions}>
          <button className={styles.upgradeButton}>Upgrade Plan</button>
          <button className={styles.cancelButton}>Cancel Subscription</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
