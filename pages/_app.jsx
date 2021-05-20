import Head from 'next/head'
import styled, { ThemeProvider, css, keyframes } from 'styled-components'
import { Provider } from 'next-auth/client'
import { GlobalStyle } from '../components/theme/globalStyles'
import { themeStyles } from '../components/theme/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeStyles}>
        <Provider session={pageProps.session}>
          <Head>
            <title>Apollo Foods 🚀</title>
            <link href="./font.css" rel="stylesheet" />
          </Head>
          <Background>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </Background>
        </Provider>
      </ThemeProvider>
    </>
  )
}

const animateBackgroundGradient = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`

const Background = styled.div`
  height: 100%;
  background-size: 400% 400%;
  background: radial-gradient(
      25.14% 54.56% at 64.76% 38.77%,
      rgba(50, 11, 1, 0.9) 0%,
      rgba(50, 11, 1, 0) 100%
    ),
    radial-gradient(
      16.91% 37.1% at 33.78% 40.87%,
      rgba(0, 0, 0, 0.76) 0.01%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      13.72% 40.35% at 85.21% 45.61%,
      #000000 0.01%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      52.02% 46.88% at 38.85% 73.14%,
      rgba(50, 11, 1, 0.91) 0%,
      rgba(50, 11, 1, 0) 100%
    ),
    radial-gradient(
      14.82% 14.31% at 44.1% 13.18%,
      rgba(50, 11, 1, 0.59) 0%,
      rgba(50, 11, 1, 0) 100%
    ),
    linear-gradient(240.31deg, #002833 18.97%, rgba(0, 40, 51, 0) 63.29%),
    radial-gradient(
      14.55% 40.14% at 26.88% 9.86%,
      rgba(75, 16, 1, 0.69) 0%,
      rgba(75, 16, 1, 0) 100%
    ),
    linear-gradient(140.96deg, #001c24 0%, rgba(49, 53, 51, 0) 39.88%);
  animation: ${animateBackgroundGradient} 10s ease infinite;
`
