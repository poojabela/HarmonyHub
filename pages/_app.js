import '../styles/globals.css'
import { AuthContextProvider } from '../firebase/AuthContextProvider'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>

      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title>HarmonyHub</title>
      </Head>

      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  )
}

export default MyApp
