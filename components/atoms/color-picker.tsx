import {
  Box,
  Icon,
  HStack,
  Heading,
  BoxProps,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

import { useDashboard } from 'lib/dashboard'
import type { colors } from 'lib/dashboard'
import { Circle } from 'lib/icons'

interface ValueType {
  [key: string]: string
}

const ColorPicker: React.FC<BoxProps> = (props) => {
  const { color, setColor } = useDashboard()
  const primary = useColorModeValue(`${color}.600`, `${color}.200`)
  const background = useColorModeValue('gray.100', 'gray.900')
  const gray = useColorModeValue('gray.400', 'gray.500')

  const values: ValueType = {
    blue: useColorModeValue('blue.600', 'blue.200'),
    red: useColorModeValue('red.600', 'red.200'),
    orange: useColorModeValue('orange.600', 'orange.200'),
    yellow: useColorModeValue('yellow.600', 'yellow.200'),
    green: useColorModeValue('green.600', 'green.200'),
    teal: useColorModeValue('teal.600', 'teal.200'),
    cyan: useColorModeValue('cyan.600', 'cyan.200'),
    purple: useColorModeValue('purple.600', 'purple.200'),
    pink: useColorModeValue('pink.600', 'pink.200'),
  }

  const names: colors[] = [
    'blue',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'cyan',
    'purple',
    'pink',
  ]

  const onClick = (color: colors) => setColor(color)

  return (
    <Box {...props} bg={background} rounded={'md'} shadow={'lg'} p={4}>
      <Heading fontSize={'md'} color={primary}>
        Change default color theme
      </Heading>
      <HStack paddingTop={6}>
        {names.map((color, index) => (
          <Icon
            h={6}
            w={6}
            key={index}
            as={Circle}
            borderWidth={2}
            rounded={'full'}
            cursor={'pointer'}
            borderColor={gray}
            color={values[color]}
            onClick={() => onClick(color)}
          />
        ))}
      </HStack>
    </Box>
  )
}

export default ColorPicker
