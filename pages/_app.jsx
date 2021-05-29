import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'
import { Provider } from 'next-auth/client'
import { GlobalStyle } from '../components/theme/globalStyles'
import { themeStyles } from '../components/theme/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/font.css'
import router, { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>
          Apollo Foods 🚀 - A random astronaut food recipe generator
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <base href={origin} /> */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#f93406" />

        <meta
          name="description"
          content="A random astronaut food recipe generator for your interstellar space missions. Each Pouch will be uniquely created for you."
        />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />

        <meta
          property="og:url"
          content="https://apollofoods.matthiasoberholzer.com"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Apollo Foods 🚀" />
        <meta
          property="og:description"
          content="A random astronaut food recipe generator for your interstellar space missions. Each Pouch will be uniquely created for you."
        />
        <meta property="og:site_name" content="Apollo Foods" />
        <meta property="og:image" content="og-image.jpeg" />
        <meta property="og:image:width" content="1140" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:image:alt"
          content="The Apollo Foods logo with name and decscription and a sample 3d pouch"
        />
        <meta property="article:author" content="@motcodes" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@motcodes" />
        <meta name="twitter:creator" content="@motcodes" />
        <meta
          name="twitter:url"
          content="https://apollofoods.matthiasoberholzer.com"
        />
        <meta name="twitter:title" content="Apollo Foods 🚀" />
        <meta
          name="twitter:description"
          content="A random astronaut food recipe generator for your interstellar space missions. Each Pouch will be uniquely created for you."
        />
        <meta name="twitter:image" content="og-image.jpeg" />
        <meta
          name="twitter:image:alt"
          content="The Apollo Foods logo with name and decscription and a sample 3d pouch"
        />
      </Head>
      <ThemeProvider theme={themeStyles}>
        <Provider session={pageProps.session}>
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
`
