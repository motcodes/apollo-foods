import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../components/theme/globalStyles'
import { themeStyles } from '../components/theme/theme'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeStyles}>
        <Head>
          <title>Apollo Foods 🚀</title>
          <link href="./font.css" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
