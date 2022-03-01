import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider, signIn, useSession } from "next-auth/react"
import Router from "next/router"
import Loading from "../components/Loading/Loading"

interface AuthProps {
  roles: string[]
  children: JSX.Element
}

function Auth({ roles, children }: AuthProps) {
  const { data: session, status } = useSession({ required: true })
  const isUser = !!session?.user

  if (status === "loading") {
    return <Loading />
  }

  if (!isUser) {
    signIn()
  }

  if (!roles.includes(session?.user.role ?? "")) {
    Router.push("/")
  }

  return children
}

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & {
    auth: {
      roles: string[]
    }
  }
  pageProps: AppProps["pageProps"]
}

function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth roles={Component.auth.roles}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default App
