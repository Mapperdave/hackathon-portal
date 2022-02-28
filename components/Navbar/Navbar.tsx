import { useSession } from "next-auth/react"
import Link from "next/link"
import styles from "./Navbar.module.css"

const Navbar = () => {
  const { data: session } = useSession({ required: true })
  const isUser = !!session?.user

  let pages = []

  if (isUser) {
    pages.push({ id: 0, name: "Hackathon Information", url: "/hackathon" })
  }

  return (
    <div className={styles.container}>
      {pages.map((page) => (
        <Link href={page.url} key={page.id}>
          <a>
            <div>{page.name}</div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Navbar
