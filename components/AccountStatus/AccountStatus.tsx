import { signIn, signOut, useSession } from "next-auth/react"
import { Fragment } from "react"

const AccountStatus = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  } else if (status === "authenticated") {
    return (
      <Fragment>
        <div>Welcome, {session!.user!.firstName}!</div>
        <button onClick={() => signOut()}>Sign out</button>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <button onClick={() => signIn()}>Sign in</button>
    </Fragment>
  )
}

export default AccountStatus
