import { ReactNode } from "react"
import Header from "../Header/Header"
import Navbar from "../Navbar/Navbar"
import styles from "./Layout.module.css"

interface LayoutProps {
  showNavbar?: boolean
  children: ReactNode
}

const Layout = ({ showNavbar = true, children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      {showNavbar && <Navbar />}
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Layout
