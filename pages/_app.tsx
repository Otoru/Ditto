import { UserProvider } from '@auth0/nextjs-auth0'
import type { AppProps } from 'next/app'
import React from 'react'

import { DashboardProvider } from 'lib/dashboard'
import { ChakraProvider } from 'lib/chakra'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { cookies } = pageProps

  return (
    <UserProvider>
      <DashboardProvider>
        <ChakraProvider cookies={cookies}>
          <Component {...pageProps} />
        </ChakraProvider>
      </DashboardProvider>
    </UserProvider>
  )
}

export default App
