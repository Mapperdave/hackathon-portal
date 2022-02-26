import type { GetServerSideProps, NextPage } from "next"
import { signIn, useSession } from "next-auth/react"
import Layout from "../components/Layout/Layout"

const Home: NextPage = () => {
  return (
    <Layout showNavbar={false}>
      <div />
    </Layout>
  )
}

Home.auth = true

export default Home
