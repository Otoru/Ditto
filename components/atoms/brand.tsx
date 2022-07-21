import {
  Icon,
  HStack,
  Heading,
  StackProps,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

import { Pokemon } from 'lib/icons'

const Brand: React.FC<StackProps> = (props) => {
  const primary = useColorModeValue('blue.600', 'blue.200')
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
