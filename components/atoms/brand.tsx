import {
  Icon,
  HStack,
  Heading,
  StackProps,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

import { useDashboard } from 'lib/dashboard'
import { Pokemon } from 'lib/icons'

const Brand: React.FC<StackProps> = (props) => {
  const { color } = useDashboard()
  const primary = useColorModeValue(`${color}.600`, `${color}.200`)
  return (
    <HStack {...props}>
      <Icon w={4} h={4} color={primary} as={Pokemon} />
      <Heading color={primary} size={'md'}>
        Ditto
      </Heading>
    </HStack>
  )
}

export default Brand
