import {
  ChakraProvider as Provider,
  cookieStorageManagerSSR,
  localStorageManager,
  ChakraProviderProps,
} from '@chakra-ui/react'
import React from 'react'

import { theme } from 'theme'

interface Props extends ChakraProviderProps {
  children: React.ReactNode
  cookies?: string
}

export const ChakraProvider: React.FC<Props> = ({
  cookies,
  children,
  ...props
}) => {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager

  return (
    <Provider {...props} theme={theme} colorModeManager={colorModeManager}>
      {children}
    </Provider>
  )
}
