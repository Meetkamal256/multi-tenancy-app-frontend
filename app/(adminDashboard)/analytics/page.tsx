import AnalyticsChart from "@/app/_components/analyticsChart/AnalyticsChart"
import styles from "./analytics.module.css"

const page = () => {
  return (
      <section className="container">
          <h1 className={styles.sectionHeading}>Analytics</h1>
          <AnalyticsChart />
    </section>
  )
}

export default page