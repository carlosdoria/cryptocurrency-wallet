// import App from "next/app";
import { Header } from 'components'
import { AppProps /* , AppContext */ } from 'next/app'
import Head from 'next/head'
// import { ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline'
// import theme from '../src/theme';
import React from 'react'

import { GlobalStyles } from '../styles/globals'

function MyApp ({ Component, pageProps }: AppProps) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Boilerplate</title>
        <meta name="description" content="My boilerplete" />
      </Head>
      <GlobalStyles />
      <Header/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
