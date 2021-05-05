import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../components/theme/globalStyles'
import { themeStyles } from '../components/theme/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeStyles}>
        <Head>
          <title>Apollo Foods 🚀</title>
          <link href="./font.css" rel="stylesheet" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}
