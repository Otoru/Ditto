import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

import components from 'theme/components'

type color = "blue" | "red" | "orange" | "yellow" | "green" | "teal" | "cyan" | "purple" | "pink"

const themeFactory = (color: color) => (extendTheme(
  {
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },
    components,
  },
  withDefaultColorScheme({ colorScheme: color }),
))

export const themes = {
  red: themeFactory('red'),
  teal: themeFactory('teal'),
  cyan: themeFactory('cyan'),
  pink: themeFactory('pink'),
  blue: themeFactory('blue'),
  green: themeFactory('green'),
  orange: themeFactory('orange'),
  yellow: themeFactory('yellow'),
  purple: themeFactory('purple'),
}