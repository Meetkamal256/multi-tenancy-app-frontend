import AnalyticsChart from "@/app/_components/analyticsChart/AnalyticsChart"
import styles from "./analytics.module.css"

const page = () => {
  return (
      <div className="container">
          <h1>Analytics</h1>
          <AnalyticsChart />
    </div>
  )
}

export default page