import { ChakraProvider } from 'lib/chakra'
import type { AppProps } from 'next/app'
import React from 'react'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { cookies } = pageProps

  return (
    <ChakraProvider cookies={cookies}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
