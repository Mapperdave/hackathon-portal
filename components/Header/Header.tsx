import Link from "next/link"
import { HACKATHON_NAME } from "../../util/constants"
import AccountStatus from "../AccountStatus/AccountStatus"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Link href="/">
          <a>{HACKATHON_NAME}</a>
        </Link>
      </div>
      <div className={styles.section}>
        <AccountStatus />
      </div>
    </div>
  )
}

export default Header
