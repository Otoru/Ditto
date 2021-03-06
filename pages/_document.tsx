import { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={'system'} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
