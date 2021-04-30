import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../components/theme/globalStyles'
// import GlobalFonts from '../fonts/fonts'
import { themeStyles } from '../components/theme/theme'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      {/* <GlobalFonts /> */}
      <ThemeProvider theme={themeStyles}>
        <Head>
          <title>Apollo Foods 🚀</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
