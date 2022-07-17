import {
  ChakraProvider as Provider,
  cookieStorageManagerSSR,
  localStorageManager,
  ChakraProviderProps,
} from '@chakra-ui/react'
import React from 'react'

import { useDashboard } from 'lib/dashboard'
import { themes } from 'theme'

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

  const { color } = useDashboard()
  const theme = themes[color]

  return (
    <Provider {...props} theme={theme} colorModeManager={colorModeManager}>
      {children}
    </Provider>
  )
}
