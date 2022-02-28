import { GetStaticProps } from "next"
import { Fragment } from "react"
import Layout from "../components/Layout/Layout"
import { HACKATHON_DESCRIPTION, HACKATHON_NAME } from "../util/constants"
import prisma from "../util/prisma"
import styles from "../styles/Hackathon.module.css"
import Image from "next/image"

interface Company {
  id: string
  name: string
  url: string
  logoColor: string
}

interface CompanyTier {
  id: string
  name: string
  monetaryValue: number
  companies: Company[]
}

interface Prize {
  id: string
  name: string
  description: string
  company: Company
  reward: string
}

interface HackathonProps {
  companyTiers: CompanyTier[]
  prizes: Prize[]
}

export const getStaticProps: GetStaticProps = async (context) => {
  const companyTiers = await prisma.companyTier.findMany({
    orderBy: {
      monetaryValue: "desc",
    },
    include: {
      companies: true,
    },
  })

  const prizes = await prisma.prize.findMany({
    orderBy: {
      monetaryValue: "desc",
    },
    include: {
      company: true,
    },
  })

  return {
    props: {
      companyTiers,
      prizes,
    },
  }
}

const Hackathon = ({ companyTiers, prizes }: HackathonProps) => {
  return (
    <Layout>
      <h1>Hackathon Information</h1>
      <h2>{HACKATHON_NAME}</h2>
      <p>{HACKATHON_DESCRIPTION}</p>
      <h2>Sponsors</h2>
      {companyTiers.map((companyTier) => (
        <Fragment key={companyTier.id}>
          <h3>{companyTier.name}</h3>
          <div className={styles.companyTier}>
            {companyTier.companies.map((company) => (
              <a href={company.url} key={company.id}>
                <div className={styles.company}>
                  <Image
                    src={company.logoColor}
                    alt={company.name + " logo"}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </Fragment>
      ))}
      <h2>Prizes</h2>
      {prizes.map((prize) => (
        <div key={prize.id}>
          <h3>
            {prize.name}{" "}
            {prize.company && <span>Sponsored by {prize.company.name}</span>}
          </h3>
          <p>{prize.description}</p>
          <p>{prize.reward}</p>
        </div>
      ))}
    </Layout>
  )
}

Hackathon.auth = true

export default Hackathon
