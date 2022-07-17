import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

import components from 'theme/components'

const theme = extendTheme(
  {
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },
    components,
  },
  withDefaultColorScheme({ colorScheme: 'blue' })
)

export default theme
