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
  const blue = useColorModeValue('blue.600', 'blue.200')
  return (
    <HStack {...props}>
      <Icon w={4} h={4} color={blue} as={Pokemon} />
      <Heading color={blue} size={'md'}>
        Ditto
      </Heading>
    </HStack>
  )
}

export default Brand
