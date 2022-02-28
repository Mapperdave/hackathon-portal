import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider, useSession } from "next-auth/react"

interface AuthProps {
  children: JSX.Element
}

function Auth({ children }: AuthProps) {
  const { data: session } = useSession({ required: true })
  const isUser = !!session?.user

  if (isUser) {
    return children
  }

  return <div>Loading...</div>
}

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & {
    auth: boolean
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
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default App
