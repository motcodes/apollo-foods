import Head from 'next/head'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../components/theme/globalStyles'
import { themeStyles } from '../components/theme/theme'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeStyles}>
        <Head>
          <title>Apollo Foods 🚀</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
