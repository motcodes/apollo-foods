import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { globalStyles } from '../components/theme/globalStyles'
import { getCssString } from '../stitches.config'

export default class Document extends NextDocument {
  render() {
    globalStyles()
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssString() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
